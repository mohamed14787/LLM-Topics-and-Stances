import pandas as pd
import uuid

# Define the paths to the input CSV files
csv_file1 = ".csv"  # Replace with the actual file name
csv_file2 = ".csv"  # Replace with the actual file name


# Load the CSV files into pandas DataFrames
df1 = pd.read_csv(csv_file1)
df2 = pd.read_csv(csv_file2)
# Concatenate the DataFrames
merged_df = pd.concat([df1, df2], ignore_index=True)

# Generate unique IDs
# Replace the existing 'id' column with unique UUIDs
merged_df['id'] = [str(uuid.uuid4()) for _ in range(len(merged_df))]

# Save the merged DataFrame to a new CSV file
output_csv = ".csv"#output file
merged_df.to_csv(output_csv, index=False)

print(f"Merged DataFrame with unique IDs saved to {output_csv}")