import pandas as pd
import requests
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

# Configure a retry-enabled session
def create_retry_session():
    session = requests.Session()
    retry = Retry(
        total=3,  # Number of retries
        backoff_factor=1,  # Time between retries: 1s, 2s, 4s, etc.
        status_forcelist=[500, 502, 503, 504],  # Retry on these HTTP errors
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session

# Function to scrape article content
def scrape_article_content(url):
    session = create_retry_session()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    try:
        # Send a GET request
        response = session.get(url, headers=headers, timeout=30)
        response.raise_for_status()  # Raise HTTP errors

        # Parse HTML
        soup = BeautifulSoup(response.text, "html.parser")

        # Extract main content
        article_content = soup.find_all(['div', 'article', 'section'], class_=['article-body', 'main-content', 'content'])

        # Fallback to extracting paragraphs if no specific container is found
        if not article_content:
            article_content = soup.find_all('p')

        # Combine text from all extracted elements
        article_text = "\n".join([para.get_text().strip() for para in article_content if para.get_text().strip()])

        # Check if content is empty or whitespace
        if not article_text.strip():
            return "Error: The article content is empty or contains only whitespace."

        return article_text
    except requests.exceptions.Timeout:
        return "Error: Timeout occurred while fetching the article."
    except requests.exceptions.RequestException as e:
        return f"Error: Unable to fetch the article. Details: {e}"

# Function to fetch image URL from the article
def fetch_article_image_url(url):
    session = create_retry_session()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    try:
        # Send a GET request
        response = session.get(url, headers=headers, timeout=30)
        response.raise_for_status()

        # Parse HTML
        soup = BeautifulSoup(response.text, "html.parser")

        # Try to find the main image
        image_tag = soup.find('meta', property="og:image") or soup.find('img')
        if image_tag and 'content' in image_tag.attrs:
            return image_tag['content']  # From meta tag
        elif image_tag and 'src' in image_tag.attrs:
            return image_tag['src']  # From img tag

        return "No image found"
    except requests.exceptions.Timeout:
        return "Error: Timeout occurred while fetching the image."
    except requests.exceptions.RequestException as e:
        return f"Error: Unable to fetch the image. Details: {e}"

# Load the CSV file
csv_file = "german_politics_articles_no_duplicates.csv"  # Replace with your file name
df = pd.read_csv(csv_file)

# List to store results
results = []

# Loop through each row
for index, row in df.iterrows():
    url = row['url']
    article_id = row['id']  # Assuming an 'id' column exists

    print(f"Processing article ID {article_id}, URL: {url}")

    # Fetch article content
    article_content = scrape_article_content(url)
    print(f"Content fetched (first 40 chars): {article_content[:40]}...")

    # Fetch article image URL
    image_url = fetch_article_image_url(url)
    print(f"Image URL fetched: {image_url}")

    # Append result
    results.append({
        'id': article_id,
        'url': url,
        'content': article_content,
        'image_url': image_url
    })

# Create a DataFrame from results
results_df = pd.DataFrame(results)

# Merge results back with the original DataFrame
merged_df = pd.merge(df, results_df, on='id', how='left')

# Save the new DataFrame to a CSV file
output_file = "german_politics_articles_with_merged_content_and_images.csv"
merged_df.to_csv(output_file, index=False)

print(f"\nProcessed articles saved to {output_file}")
