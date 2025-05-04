# How to run API

- Create python venv and install dependencies

  - `cd api`
  - `python -m venv .venv`
  - `pip install -r requirements.txt`
  - Open venv in terminal: `source .venv/bin/activate`

- Run server `uvicorn main:app --reload`

# Overview

## Seeders

We are using 2 Pinecone indexes to store data using Embeddings (ada-002)

- News Index - db_seeder.py
  Using a csv created from the scraped news articles. We do the following on each article:

1. Summarize article using OpenAI API
2. Get ada-002 embedding of the summary
3. Insert all data we have into the pinecone index

- Parties Index - parties_seeder.py
  Using each German Party program. We do the following on each article:

1. Load content of each document
2. Chunk, generate embedding, and insert into a Pinecone index.

## API

The entry points is `main.py` where all the endpoints we have are defined
These are the top endpoints that showcase our full pipeline

- `/query-pinecone`:

  - Input: List[] of strings - Handwritten search prompts from the user on which topics the user is interesed in
  - What goes on:
    1. Generate Embeddings of the user input
    2. Query the Pinecone index with this embedding, and fetch the top k results
    3. Process the query results and return response to user

- `/vote`
  - Input: string - user prompt on their political view or interests
  - What goes on:
    - Get the liked articles of that user
    - Generate Embedding of the user input
    - Query the parties pinecone index to find the top party program chunks that match the user input
    - Using Langchain generate that pipeline
    - Final step is to create a prompt to send to gpt4o-mini that would generate a response on what political party the user might be interested in using a combination on liked articles, parties chunks and the original user input.
