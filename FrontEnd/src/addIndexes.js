function flattenDictionaryToArray(obj) {
  let result = [];
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      result = result.concat(obj[key]);
    } else {
      result.push(obj[key]);
    }
  }
  return result;
}

export default function addIndexes(articles) {
  const articlesWithOutIndex = flattenDictionaryToArray(articles);
  return articlesWithOutIndex.map((article, index) => ({
    ...article,
    index,
  }));
}

export function groupByDay(articles) {
  const articlesByDay = articles.reduce((acc, article, index) => {
    const day = new Date(article.publishedAt).toLocaleDateString("en-US");
    if (!acc[day]) acc[day] = [];
    acc[day].push(article);
    return acc;
  }, {});
  for (const day in articlesByDay) {
    if (articlesByDay[day].length < 2) {
      delete articlesByDay[day];
    }
  }

  return articlesByDay;
}

//
