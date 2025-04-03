# rag-model-recipe

## Overview

This pet project is a Recipe application that uses the RAG (Retrieval Augmented Generation) technique to enhance recipe discovery. It consists of a React frontend (`rag-recipe-frontend`) and a Node.js backend (`rag-recipe-backend`).
<img src="https://github.com/user-attachments/assets/9c80769e-e2ae-419c-8788-6007362e9843" width="300">

## Features

-   **Recipe Search**: Users can search for recipes using natural language queries.
-   **Vector Search**: The backend uses vector embeddings and MongoDB Atlas Search to find relevant recipes.
-   **LLM Integration**: The backend uses a Large Language Model (LLM) to generate recipe summaries or answer questions based on the search results.
-   **Role-Based Conversations**: The application supports role-based conversations, allowing the LLM to adopt different personas (e.g., Chef, Nutritionist).
-   **Session Management**: The application manages user sessions and conversation history.

## Technologies

**Frontend:**

-   React
-   JavaScript

**Backend:**

-   Node.js
-   Express.js
-   MongoDB
-   MongoDB Atlas Search
-   Xenova Transformers (for embedding generation)
-   Large Language Model (LLM) (e.g., Flan-T5)

**Other:**

-   Git
-   npm or yarn

![image](https://github.com/user-attachments/assets/946e3f56-557d-49f3-b2f4-fc104277bb3e)


## Setup Instructions

Follow these steps to set up and run the application:

### Backend Setup (`rag-recipe-backend`)

**Prerequisites:**

-   Node.js and npm or yarn installed.
-   MongoDB Atlas account and cluster set up.

1.  **Clone the repository:**

    ```bash
    git clone <your_repository_url>
    cd rag-recipe-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Configure environment variables:**

    -   Create a `.env` file in the `rag-recipe-backend` directory.
    -   Add the following environment variables, replacing the placeholders with your actual values:

        ```
        MONGODB_URI=your_mongodb_atlas_connection_string
        DATABASE_NAME=your_database_name
        ```

4.  **Set up MongoDB Atlas Search:**

    -   Create a Search index in your MongoDB Atlas cluster.
    -   Use the index definition provided in the `server.js` file.

5.  **Populate the database:**

    -   You'll need to populate the `recipes` collection in your MongoDB database with recipe data and their corresponding embeddings.
    -   Use the `generateEmbeddings.js` script (or similar) to generate embeddings from your recipe data and store them in MongoDB.
    -   Ensure that the script is pointing to the correct MongoDB connection string and database.

6.  **Run the backend server:**

    ```bash
    node server.js
    ```

    -   The server will start running at `http://localhost:<port_number>`.

### Frontend Setup (`rag-recipe-frontend`)

**Prerequisites:**

-   Node.js and npm or yarn installed.

1.  **Navigate to the frontend directory:**

    ```bash
    cd rag-recipe-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Configure environment variables:**

    -   If needed, create a `.env` file in the `rag-recipe-frontend` directory.
    -   Add any necessary environment variables, such as the backend API URL (if it's different from the default).

4.  **Run the frontend application:**

    ```bash
    npm start # or yarn start
    ```

    -   The application will open in your browser (usually at `http://localhost:3000`).

## Deployment

### Backend

-   Deploy the Node.js backend to a suitable hosting platform (e.g., Heroku, AWS, Google Cloud, Azure).
-   Ensure that the `MONGODB_URI` environment variable is set in the deployment environment.

### Frontend

1.  **Build the React application for production:**

    ```bash
    npm run build # or yarn build
    ```

2.  **Deploy the built application:**

    -   Deploy the built application (the contents of the `build` directory) to a static hosting platform (e.g., Netlify, Vercel, AWS S3, GitHub Pages).
