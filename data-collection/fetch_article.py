import requests
import pandas as pd

# NewsAPI configuration
API_KEYS = [
] # news api key
BASE_URL = "https://newsapi.org/v2/everything"

# List of sources that work best with `sources` parameter
sources = [
    "bbc-news", "reuters", "politico",
    "al-jazeera-english", "associated-press", "cnn"
]

# List of domains to test
domains = [
    "bbc.com", "dw.com", "reuters.com", "theguardian.com", "aljazeera.com",
    "apnews.com", "cnn.com", "politico.com", "foxnews.com", "thelocal.de",
    "handelsblatt.com/today", "politico.eu", "euobserver.com", "euractiv.com",
    "handelsblatt.com", "economist.com", "ft.com"
]

# Queries unchanged
queries = [
    # Query group 1
    "German politics",
    "German elections",
    "Christian Democratic Union",
    "CDU",
    "Social Democratic Party",
    "SPD",
    "The Greens",
    "Grünen",
    "Greens Party",
    "Free Democratic Party",
    "FDP",
    "Alternative for Germany",
    "AfD",
    "Die Linke",
    "The Left",
    "German far-right parties",
    "German conservative parties",
    "German liberal parties"

    # Query group 2
    "German federal election",
    "Bundestag election",
    "German chancellor",
    "Political coalition",
    "Coalition agreement",
    "German parliament",
    "Election campaign",
    "Political reform",
    "Germany state elections",
    "Germany voting trends",
    "German Chancellor election",
    # Query group 3
    "Angela Merkel",
    "Friedrich Merz",
    "Center-right politics",
    "Olaf Scholz",
    "Alice Weidel",
    "Christian Lindne",
    "Annalena Baerbock",
    "Robert Habeck"
    "Center-left politics",
    "Worker policies",
    "Climate policy",
    "Renewable energy",

    # Query group 4
    "Far-right politics",
    "Immigration",
    "Euroscepticism",
    "Socialist policies",
    "Redistribution",
    "Anti-austerity",
    "Voting system",
    "Exit polls",

    # Query group 5
    "Electoral threshold",
    "Campaign debates",
    "Political advertisements",
    "Voter turnout",
    "German refugee policy",
    "Germany immigration stance",
    "German climate change politics",
    "Germany energy policy",
    "Germany social welfare policy"
]

# Function to manage API keys and request limits
class APIKeyManager:
    def __init__(self, keys, max_requests_per_key=100):
        self.keys = keys
        self.max_requests_per_key = max_requests_per_key
        self.current_key_index = 0
        self.requests_made = 0

    def get_key(self):
        if self.requests_made >= self.max_requests_per_key:
            self.current_key_index += 1
            self.requests_made = 0
            if self.current_key_index >= len(self.keys):
                raise RuntimeError("All API keys have been exhausted.")
        self.requests_made += 1
        return self.keys[self.current_key_index]

# Instantiate APIKeyManager
api_key_manager = APIKeyManager(API_KEYS)

def fetch_articles_by_source(source, query):
    """Fetch articles from a specific source, searching for keywords in the title and description."""
    params = {
        "sources": source,
        "q": query,
        "searchIn": "title,description",
        "language": "en",
        "sortBy": "relevancy",
        "apiKey": api_key_manager.get_key()
    }
    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        results = response.json().get("articles", [])
        articles = []
        for article in results:
            articles.append({
                "source": source,
                "query": query,
                "title": article["title"],
                "description": article["description"],
                "url": article["url"],
                "publishedAt": article["publishedAt"]
            })
        return articles
    else:
        print(f"Source: {source} - Error: {response.status_code} - {response.text}")
        return []

def fetch_articles_by_domain(domain, query):
    """Fetch articles from a specific domain, searching for keywords in the title and description."""
    params = {
        "domains": domain,
        "q": query,
        "searchIn": "title,description",
        "language": "en",
        "sortBy": "relevancy",
        "apiKey": api_key_manager.get_key()
    }
    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        results = response.json().get("articles", [])
        articles = []
        for article in results:
            articles.append({
                "domain": domain,
                "query": query,
                "title": article["title"],
                "description": article["description"],
                "url": article["url"],
                "publishedAt": article["publishedAt"]
            })
        return articles
    else:
        print(f"Domain: {domain} - Error: {response.status_code} - {response.text}")
        return []

# Fetch articles for each query group
all_articles = []
total_requests = 0

for query in queries:
    for source in sources:
        print(f"Fetching articles from source: {source} for query: {query}")
        articles = fetch_articles_by_source(source, query)
        all_articles.extend(articles)
        total_requests += 1

        if total_requests % 10 == 0:
            print(f"Completed {total_requests} requests.")

    for domain in domains:
        print(f"Fetching articles from domain: {domain} for query: {query}")
        articles = fetch_articles_by_domain(domain, query)
        all_articles.extend(articles)
        total_requests += 1

        if total_requests % 10 == 0:
            print(f"Completed {total_requests} requests.")

# Save results to CSV
if all_articles:
    df = pd.DataFrame(all_articles)
    output_file = "german_politics_articles_with_query.csv"
    df.to_csv(output_file, index=False, encoding="utf-8")
    print(f"Saved {len(all_articles)} articles to {output_file}")
else:
    print("No articles found for any source/domain.")
