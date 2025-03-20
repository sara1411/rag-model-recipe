require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const Recipe = require('./models/Recipe');
const { pipeline } = require('@xenova/transformers');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
 // 2. Chunking Function (from previous response)
 function chunk_generated_recipes(recipe_text) {
    const recipes = [];
    let current_recipe = {};
    const lines = recipe_text.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('### ')) {
            if (current_recipe.text) {
                recipes.push(current_recipe);
            }
            current_recipe = { recipeName: trimmedLine.substring(4), text: trimmedLine + '\n' };
        } else if (trimmedLine.startsWith('**')) {
            if (current_recipe.text) {
                current_recipe.text += trimmedLine + '\n';
            }
        } else if (trimmedLine && current_recipe.text) {
            current_recipe.text += trimmedLine + '\n';
        }
    }
    if (current_recipe.text) {
        recipes.push(current_recipe);
    }
    return recipes;
}
async function generateEmbeddings(text) {
  const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  const output = await embedder(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

app.post('/upload-pdf', async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync('./files/Breakfast_Recipes.pdf'); // Replace with your pdf file path
    const data = await pdfParse(pdfBuffer);
    const text = data.text;
    const recipeChunks = chunk_generated_recipes(text);

    for (const chunk of recipeChunks) {
      const embedding = await generateEmbeddings(chunk.text);
      const recipe = new Recipe({recipeName:chunk.recipeName, text: chunk.text.trim(), embedding });
      await recipe.save();
    }

    res.status(200).send('PDF processed and embeddings saved.');
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).send('Error processing PDF.');
  }
});

app.post('/query', async (req, res) => {
    try {
        const queryText = req.body.query;
        const queryEmbedding = await generateEmbeddings(queryText);

        let results = await Recipe.aggregate([
            {
                $vectorSearch: {
                    index: "default", // Or your index name
                    path: "embedding", // The path to your embeddings field
                    queryVector: queryEmbedding,
                    numCandidates: 10,
                    limit: 5,
                },
            },
            {
                $project: {
                    _id: 0,
                    text: 1, // Or other fields you want to return
                    score: { $meta: "vectorSearchScore" } // Include the score
                }
            }
        ]);
       console.log(results);
        if (results.length > 0 && results[0].score > 0.7) {
            results = results.filter(result => result.score > 0.7);
            const generator = await pipeline('text2text-generation', 'Xenova/flan-t5-base', { quantized: false });
            let context = results.map(result => result.text).join(' ');
            context = context.trim();
            console.log(`Answer the question based on the context.\n\nContext:\n${context}\n\nQuestion: ${queryText}\n\nAnswer:`)
            const prompt = `Answer in detail to the question based on the context.\n\nContext:\n${context}\n\nQuestion: ${queryText}\n\nAnswer:`;
                const generatedOutput = await generator(prompt, { max_length: 100 }); // Adjust max_length as needed
                const generatedText = generatedOutput[0].generated_text;

            res.status(200).json({  summary: generatedText });
        } else {
            res.status(200).json({ summary: "I could not find any relevant information from the recipe book." });
        }
    } catch (error) {
        console.error('Error querying:', error);
        res.status(500).send('Error querying.');
    }
});

app.get('/', async (req, res) => {
    try{
        res.status(200).send('Welcome to food recipes World');
    }
    catch (error) {
        console.error('Error querying:', error);
        res.status(500).send('Error querying.');
    }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});