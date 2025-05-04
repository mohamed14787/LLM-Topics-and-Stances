import pandas as pd
import time
from openai import OpenAI

# Initialize the OpenAI client
api_key = ""#input the key
client = OpenAI(api_key=api_key)

def summarize_text(text, model="gpt-4o-mini", max_tokens=5000):
    """
    Summarize input text using OpenAI GPT model.
    """
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant tasked with summarizing a political news article. The article may include unrelated information, such as subscription prompts, advertisements, headers, footers, or calls to action. Your goal is to provide a concise and clear summary of the article's main ideas and key points in no more than 100 words. Focus exclusively on the core topic of the article, such as political events, parties, policies, or key figures mentioned. Avoid unnecessary details, opinions, or unrelated information. Your summary must contain only the essential facts and ideas that convey the overall message and purpose of the article."},
                {"role": "user", "content": f"Summarize the following text:\n\n{text}"}
            ],
            max_tokens=max_tokens,
            temperature=0.7,
        )
        # Extract and return the response text
        return response.choices[0].message.content

    except Exception as e:
        print(f"Error summarizing text: {e}")
        return "Error: Failed to summarize."

# Load the input CSV file
input_csv = ".csv" #input
output_csv = ".csv" #output

# Read the CSV file and limit to the first 10 rows
df = pd.read_csv(input_csv)
#df_subset = df.head(1000)
df_subset=df
# Summarize each article
summaries = []
for index, row in df_subset.iterrows():
    content = row['content']  # Assuming 'content' column exists
    print(f"Processing article {index + 1}...")

    # Call the summarization function
    summary = summarize_text(content)
    summaries.append(summary)

    # Print progress
    print("Summary:", summary)
    print("-" * 80)
    time.sleep(0.1)  # Avoid rate limiting

# Add the summaries to the DataFrame
df_subset['summary'] = summaries

# Save the new DataFrame to a CSV file
df_subset.to_csv(output_csv, index=False)
print(f"Summarized articles saved to {output_csv}")
