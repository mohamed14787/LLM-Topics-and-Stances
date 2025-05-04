import pandas as pd
from openai import OpenAI

# Set your API key securely
api_key = ""# input the key

# Initialize OpenAI client
client = OpenAI(api_key=api_key)

# Input and output file names
input_csv = ".csv"# input
output_csv = ".csv"#output

# Load the CSV file
df = pd.read_csv(input_csv)

# Ensure the 'summary' column exists
if 'summary' not in df.columns:
    raise ValueError("The input CSV must contain a 'summary' column.")

# List to store embeddings
embeddings = []

# Process each summary
for index, row in df.iterrows():
    summary = row['summary']

    # Check if the summary is valid
    if isinstance(summary, str) and summary.strip():
        try:
            # Generate embedding
            response = client.embeddings.create(
                input=summary.strip(),
                model="text-embedding-ada-002"
            )

            # Extract embedding vector
            embedding_vector = response.data[0].embedding
            embeddings.append(embedding_vector)
            print(f"Processed row {index + 1}/{len(df)}")
        except Exception as e:
            print(f"Error processing row {index + 1}: {e}")
            embeddings.append(None)
    else:
        # Handle missing or invalid summaries
        embeddings.append(None)

# Add embeddings to the DataFrame
df['embeddings'] = embeddings

# Save the updated DataFrame to a new CSV file
df.to_csv(output_csv, index=False)

print(f"Embeddings added and saved to {output_csv}")
