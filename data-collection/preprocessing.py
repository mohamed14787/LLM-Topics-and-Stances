from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import nltk

nltk.download('punkt', force=True)
nltk.download('wordnet')
nltk.download('stopwords')
import spacy
nlp = spacy.load("en_core_web_sm")


def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    # Remove special characters and numbers

    doc = re.sub(r'[^a-zA-Z\s]', ' ', text)
    # Tokenize
    doc = nlp(doc.lower())

    tokens = [token.lemma_ for token in doc if not token.is_stop and token.is_alpha]

    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    # Lemmatize
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    # Join tokens back into a single string
    return(' '.join(tokens))

def summaryPreprocessing(text):



   return text.lower()


# Apply the updated function to the DataFrame
df['Cleaned_Article'] = df['Article'].apply(preprocess_text)
df['processed']=df['Article'].apply(summaryPreprocessing)
df.head()