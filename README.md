# rag-model-recipe
Overview
This pet project is a Recipe application that uses the RAG (Retrieval Augmented Generation) technique to enhance recipe discovery. It consists of a React frontend (rag-recipe-frontend) and a Node.js backend (rag-recipe-backend).

Features
Recipe Search: Users can search for recipes using natural language queries.

Vector Search: The backend uses vector embeddings and MongoDB Atlas Search to find relevant recipes.

LLM Integration: The backend uses a Large Language Model (LLM) to generate recipe summaries or answer questions based on the search results.

Role-Based Conversations: The application supports role-based conversations, allowing the LLM to adopt different personas (e.g., Chef, Nutritionist).

Session Management: The application manages user sessions and conversation history.

Technologies
Frontend:

React

JavaScript

Backend:

Node.js

Express.js

MongoDB

MongoDB Atlas Search

Xenova Transformers (for embedding generation)

Large Language Model (LLM) (e.g., Flan-T5)

Other:

Git

npm or yarn

Project Structure
├── rag-recipe-frontend/  # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── README.md
├── rag-recipe-backend/   # Node.js backend
│   ├── app.js
│   ├── package.json
├── README.md             # Project README (this file)

Setup Instructions
Follow these steps to set up and run the application:

Backend Setup (rag-recipe-backend)
Prerequisites:

Node.js and npm or yarn installed.

MongoDB Atlas account and cluster set up.

Clone the repository:

git clone <your_repository_url>
cd rag-recipe-backend

Install dependencies:

npm install  # or yarn install

Configure environment variables:

Create a .env file in the rag-recipe-backend directory.

Add the following environment variable, replacing the placeholder with your actual MongoDB Atlas connection string:

MONGODB_URI=your_mongodb_atlas_connection_string
DATABASE_NAME=your_database_name #Add your database name

Set up MongoDB Atlas Search:

Create a Search index in your MongoDB Atlas cluster.

Use the index definition provided in the server.js file.

Populate the database:

You'll need to populate the recipes collection in your MongoDB database with recipe data and their corresponding embeddings.

Use the generateEmbeddings.js script (or similar) to generate embeddings from your recipe data and store them in MongoDB.

Ensure that the script is pointing to the correct MongoDB connection string and database.

Run the backend server:

node server.js

The server will start running at http://localhost:<port_number>>.

Frontend Setup (rag-recipe-frontend)
Prerequisites:

Node.js and npm or yarn installed.

Navigate to the frontend directory:

cd rag-recipe-frontend

Install dependencies:

npm install  # or yarn install

Configure environment variables:
*If needed, create a .env file in the rag-recipe-frontend directory.

Add any necessary environment variables, such as the backend API URL (if it's different from the default).

Run the frontend application:

npm start  # or yarn start

The application will open in your browser (usually at http://localhost:3000).

Deployment
Backend:

Deploy the Node.js backend to a suitable hosting platform (e.g., Heroku, AWS, Google Cloud, Azure).

Ensure that the MONGODB_URI environment variable is set in the deployment environment.

Frontend:

Build the React application for production:

npm run build  # or yarn build

Deploy the built application (the contents of the build directory) to a static hosting platform (e.g., Netlify, Vercel, AWS S3, GitHub Pages).
