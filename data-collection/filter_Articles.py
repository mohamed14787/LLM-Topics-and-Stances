import pandas as pd

# Define the final list of German-related keywords
german_keywords = [
    # Cities and States
    'Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen',
    'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Mannheim',
    'Karlsruhe',
    'Baden-Württemberg', 'Bavaria', 'Brandenburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern',
    'North Rhine-Westphalia',
    'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia',

    # Political Parties
    'SPD', 'CDU', 'CSU', 'Green Party', 'FDP', 'Die Linke', 'AfD', 'Piratenpartei', 'Republikaner', 'NPD',
    'Bündnis 90/Die Grünen', 'ÖDP', 'Partei der Arbeit', 'LKR', 'Die Partei', 'Menschliche Welt', 'Bündnis 90',
    'Saarland-Partei',

    # Political Figures
    'Olaf Scholz', 'Friedrich Merz', 'Annalena Baerbock', 'Christian Lindner', 'Sahra Wagenknecht', 'Alice Weidel',
    'Angela Merkel', 'Gerhard Schröder', 'Frank-Walter Steinmeier', 'Helmut Kohl', 'Joschka Fischer',
    'Wolfgang Schäuble',
    'Heiko Maas',

    # Election-related Terms
    'Bundestag', 'Bundesrat', 'Bundestagswahl', 'Landtag', 'Landtagwahl', 'Wahl', 'Wahlkampf', 'Wahlrecht', 'Koalition',
    'Koalitionsvertrag', 'Wahlbeteiligung', 'Briefwahl', 'Wahlsystem', 'Kandidat', 'Wahlzettel', 'Stimmenanteil',
    'Wahlergebnis',
    'Zensus', 'Wahllokal', 'Wahlbeobachtung', 'Bundestagswahl 2025', 'Europawahl', 'Chancellor',

    # Political Terms and Concepts
    'Föderalismus', 'Demokratie', 'Parlamentarismus', 'Sozialstaat', 'Rechtsstaat', 'Grundgesetz', 'Verfassung',
    'Staatsbürgerschaft', 'Ministerpräsident', 'Bundeskanzler', 'Bundesregierung', 'Koalition', 'Koalitionsvertrag',
    'Arbeitsmarkt',
    'Rentenversicherung', 'Sozialhilfe', 'Arbeitslosigkeit', 'Hartz IV', 'Wirtschaftsreform', 'Armutsbekämpfung',
    'Digitalisierung',
    'Bildungspolitik', 'Zuwanderung', 'Integration', 'Einwanderungspolitik', 'Arbeitsmigration', 'Klimawandel',
    'Nachhaltigkeit',
    'Energiepolitik', 'Erneuerbare Energien', 'Kohlenausstieg', 'Atomausstieg', 'Umweltschutz', 'CO2-Emissionen',
    'Biodiversität',
    'Ökologie', 'Gesundheitspolitik', 'Pflegeversicherung', 'Krankenversicherung', 'Corona', 'Europäische Union',
    'EU-Ratsvorsitz',
    'EU-Parlament', 'Europawahl', 'Brexit', 'Eurozone', 'Freihandel', 'NATO', 'G7', 'G20', 'UN', 'Corona-Pandemie',
    'Flüchtlingskrise',
    'Antisemitismus', 'Klimastreik', 'Fridays for Future', 'Demonstrationen', 'AfD-Politik', 'Wahlen 2025'
]


# Function to check if any keyword exists in the summary
def contains_keywords(text, keywords):
    return any(keyword.lower() in str(text).lower() for keyword in keywords)

# Function to count occurrences of "Germany" in the summary
def count_germany_occurrences(text):
    text = str(text).lower()
    return text.count('germany') + text.count('german')

# Load the CSV containing the articles
df = pd.read_csv('.csv') #input

# Filter the articles based on keywords in the summary and check if "Germany" appears more than 3 times
df_filtered = df[df['summary'].apply(lambda x: contains_keywords(x, german_keywords) or count_germany_occurrences(x) > 2)]

# Filter the removed articles (those that do not match the keywords in summary or have "Germany" less than or equal to 3 times)
df_removed = df[~df['summary'].apply(lambda x: contains_keywords(x, german_keywords) or count_germany_occurrences(x) > 2)]

# Save the filtered DataFrame to a new CSV file
df_filtered.to_csv('filtered_german_politics_articles.csv', index=False)

# Save the removed articles to another CSV file
df_removed.to_csv('removed_german_politics_articles_30_1.csv', index=False)

print("Filtered articles saved to 'filtered_german_politics_articles.csv'.")
print("Removed articles saved to 'removed_german_politics_articles.csv'.")
