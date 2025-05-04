import pandas as pd
import time
from openai import OpenAI

# Initialize OpenAI API client
api_key = "" # input the key
client = OpenAI(api_key=api_key)


def evaluate_relevance(summary, model="gpt-4o-mini", max_tokens=5000):
    """
    Evaluate the relevance of an article summary to German politics and elections.

    Parameters:
        summary (str): The summary of the article.
        model (str): OpenAI model to use.
        max_tokens (int): Maximum tokens for the API response.

    Returns:
        tuple: (relevance, justification) - Relevance decision and a brief justification.
    """
    system_prompt = (
        "You are a political news analyst tasked with evaluating the relevance of news articles "
        "to German politics and elections. Your role is to determine if an article is specifically "
        "and strongly related to German political events, parties, policies, elections, or key political figures. "
        "Articles should only be considered relevant if they:\n\n"
        "1. Focus on German political parties, their policies, or their campaigns.\n"
        "2. Discuss the German government, elections, or political landscape.\n"
        "3. Mention significant political figures in Germany or their actions.\n"
        "4. Address major political issues in Germany, such as the economy, immigration policies, "
        "climate change, or social reforms.\n\n"
        "Exclude articles that:\n"
        "1. Primarily discuss politics in other countries with minimal reference to Germany.\n"
        "2. Are generic or unrelated to German political topics.\n"
        "3. Contain vague or broad political discussions not specific to Germany.\n\n"
        "Your task is to evaluate the content and provide a decision: 'Relevant to German Politics' or "
        "'Not Relevant to German Politics,' along with a brief justification."
    )

    user_prompt = f"Evaluate the following article summary for its relevance to German politics:\n\n{summary}"

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=max_tokens,
            temperature=0.4,
        )
        output = response.choices[0].message.content.strip()
        # Ensure "Not Relevant" is checked first to prevent misclassification
        if "Not Relevant to German Politics" in output:
            relevance = "Not Relevant"
        elif "Relevant to German Politics" in output:
            relevance = "Relevant"
        else:
            relevance = "Undetermined"
        justification = output
        return relevance, justification
    except Exception as e:
        print(f"Error evaluating relevance: {e}")
        return "Error", "Error: Failed to evaluate relevance."


# Load the CSV file
input_csv = ".csv"  # Replace with your file name
output_csv = ".csv"  # Replace with your desired output file name

# Read the CSV file
df = pd.read_csv(input_csv)
#df=df.head(40)
# Initialize new columns
df['relevance'] = ""
df['justification'] = ""

# Process each article
for index, row in df.iterrows():
    summary = row['summary']
    print(f"Processing article {index + 1}...")
    relevance, justification = evaluate_relevance(summary)
    df.at[index, 'relevance'] = relevance
    df.at[index, 'justification'] = justification

    # Print progress
    print(f"Relevance: {relevance}")
    print(f"Justification: {justification}")
    print("-" * 80)

    # Pause to respect rate limits
    time.sleep(0.05)

# Save the updated DataFrame to a new CSV
df.to_csv(output_csv, index=False)
print(f"Filtered articles saved to {output_csv}")


