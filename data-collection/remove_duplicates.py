import pandas as pd

# Load the CSV file
csv_file = "german_politics_articles_with_query_with_id.csv"  # Replace with your file name
df = pd.read_csv(csv_file)

# Check for duplicates based on the 'url' column
duplicates_count = df['url'].value_counts()  # Count occurrences of each URL
duplicate_urls = duplicates_count[duplicates_count > 1]  # Filter URLs with more than 1 occurrence

# Create a dictionary to store combined queries for duplicates
combined_queries = {}

# Output details about each duplicate and combine queries
if not duplicate_urls.empty:
    print("Duplicate URLs found:")
    for url, count in duplicate_urls.items():
        duplicate_articles = df[df['url'] == url]  # Get all articles with this URL
        combined_query = " | ".join(duplicate_articles['query'].unique())  # Combine queries
        combined_queries[url] = combined_query
        print(f"URL: {url} appears {count} times, combined query: {combined_query}")
else:
    print("No duplicate URLs found.")

# Step 1: For each duplicate, update the first occurrence with the combined query
for url, combined_query in combined_queries.items():
    # Find the first occurrence of this URL
    first_occurrence_index = df[df['url'] == url].index[0]
    # Update the query of the first occurrence
    df.at[first_occurrence_index, 'query'] = combined_query

# Step 2: Remove duplicates and keep the first occurrence (with updated query)
df_no_duplicates = df.drop_duplicates(subset='url', keep='first')

# Step 3: Save the new CSV without duplicates if duplicates exist
if len(duplicate_urls) > 0:
    output_file = "german_politics_articles_no_duplicates.csv"
    df_no_duplicates.to_csv(output_file, index=False)
    print(f"\nTotal duplicate entries: {len(duplicate_urls)}")
    print(f"New CSV without duplicates saved as: {output_file}")
else:
    print("No duplicates found. Original CSV remains unchanged.")

import pandas as pd
from fuzzywuzzy import fuzz
from itertools import combinations

# Load the CSV file
df = pd.read_csv('merged_final_04_02.csv')

# Check for duplicates in each column individually
title_duplicates = df['title'].duplicated(keep='first')
url_duplicates = df['url'].duplicated(keep='first')
content_duplicates = df['content'].duplicated(keep='first')
description_duplicates = df['description'].duplicated(keep='first')

# List to collect all duplicate ids
duplicate_ids = []

# Print and collect duplicates for the 'title' column
title_duplicates_rows = df[title_duplicates]
if not title_duplicates_rows.empty:
    print("⚠️ **Title Duplicates Found:**")
    print(title_duplicates_rows[['title', 'url', 'content', 'summary', 'image_url', 'description']])
    duplicate_ids.extend(title_duplicates_rows['id'].tolist())  # Collect the duplicate ids

# Print and collect duplicates for the 'url' column
url_duplicates_rows = df[url_duplicates]
if not url_duplicates_rows.empty:
    print("\n⚠️ **URL Duplicates Found:**")
    print(url_duplicates_rows[['title', 'url', 'content', 'summary', 'image_url', 'description']])
    duplicate_ids.extend(url_duplicates_rows['id'].tolist())  # Collect the duplicate ids

# Print and collect duplicates for the 'content' column
content_duplicates_rows = df[content_duplicates]
if not content_duplicates_rows.empty:
    print("\n⚠️ **Content Duplicates Found:**")
    print(content_duplicates_rows[['title', 'url', 'content', 'summary', 'image_url', 'description']])
    duplicate_ids.extend(content_duplicates_rows['id'].tolist())  # Collect the duplicate ids

# Print and collect duplicates for the 'description' column
description_duplicates_rows = df[description_duplicates]
if not description_duplicates_rows.empty:
    print("\n⚠️ **Description Duplicates Found:**")
    print(description_duplicates_rows[['title', 'url', 'content', 'summary', 'image_url', 'description']])
    duplicate_ids.extend(description_duplicates_rows['id'].tolist())  # Collect the duplicate ids

# Remove duplicates from duplicate_ids (in case the same id is collected multiple times)
duplicate_ids = list(set(duplicate_ids))

# Drop the rows with duplicate ids
df_cleaned = df[~df['id'].isin(duplicate_ids)]

# Save the cleaned data to a new CSV
df_cleaned.to_csv('filtered_file_04_02.csv', index=False)

# Print the results
print(f"\nOriginal records: {len(df)}")
print(f"Records after removing duplicates: {len(df_cleaned)}")


# Load the CSV file
df = df_cleaned

# Define similarity thresholds
TITLE_SIMILARITY_THRESHOLD = 85  # Titles with 85%+ similarity are considered duplicates
URL_SIMILARITY_THRESHOLD = 95    # URLs with 90%+ similarity are considered duplicates

# Track deleted records
to_drop = set()

print("\n🔍 **Deleted Titles & Their Similar Matches:**\n")

for i, j in combinations(df.index, 2):
    if i not in to_drop and j not in to_drop:  # Only compare if not already marked for removal
        title_similarity = fuzz.token_sort_ratio(str(df.at[i, 'title']), str(df.at[j, 'title']))
        url_similarity = fuzz.ratio(str(df.at[i, 'url']), str(df.at[j, 'url']))  # Direct character comparison

        if title_similarity >= TITLE_SIMILARITY_THRESHOLD or url_similarity >= URL_SIMILARITY_THRESHOLD:
            print(f"🗑️ Deleted: {df.at[j, 'title']}\n✅ Kept: {df.at[i, 'title']}\n{'-'*80}")
            to_drop.add(j)  # Mark duplicate for deletion

# Remove duplicate records
df_cleaned = df.drop(index=to_drop)

# Save the cleaned data
df_cleaned.to_csv('merged_04_02_final.csv', index=False)

# Summary
print(f"\n✅ **Summary:**")
print(f"Original records: {len(df)}")
print(f"Records after removing similar titles and URLs: {len(df_cleaned)}")
print(f"Total duplicates removed: {len(to_drop)}")
