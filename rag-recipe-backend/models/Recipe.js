const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  text: String,
  recipeName: String,
  embedding: [Number], // Store the sentence embedding as an array of numbers
});

module.exports = mongoose.model('Recipe', recipeSchema);