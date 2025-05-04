function countTokens(text) {
  return text.split(/\s+/).length;
}

export default function calculateTimeSaved(a) {
  const summaryTokens = countTokens(a.summary);
  const contentTokens = countTokens(a.content);
  const summarizationPercentage = Math.round(
    (summaryTokens / contentTokens) * 100
  );
  console.log(summarizationPercentage);

  const summaryReadTime = Math.ceil(summaryTokens / 5);
  const contentReadTime = Math.ceil(contentTokens / 5);
  const savedTimeInSeconds = contentReadTime - summaryReadTime;
  const minutes = Math.floor(savedTimeInSeconds / 60);
  const seconds = savedTimeInSeconds % 60;
  const savedTimeString = `${minutes} minutes ${seconds} seconds`;

  return { savedTimeString, summarizationPercentage };
}
