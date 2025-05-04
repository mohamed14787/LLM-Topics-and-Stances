import ArticleItem from "./ArticleItem"; // Ensure that ArticleItem is correctly defined in the same directory

export default function DetailsArticleList({ articles }) {
  return (
    <div>
      <div
        class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
        style={{ padding: "20px" }}
      >
        {articles.slice(0, 5).map((article) => (
          <ArticleItem article={article} />
        ))}
      </div>
    </div>
  );
}
