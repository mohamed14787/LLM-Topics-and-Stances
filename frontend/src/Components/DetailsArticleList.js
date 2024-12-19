import ArticleItem from "./ArticleItem"; // Ensure that ArticleItem is correctly defined in the same directory

export default function DetailsArticleList() {
  return (
    <div>
      <h1>Details Article List</h1>

      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul
          class="flex flex-wrap -mb-px"
          style={{ gap: "70px", fontSize: "23px" }}
        >
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
              aria-current="page"
            >
              ALL
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Positive
            </a>
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Neutral
            </a>
          </li>
          <li>
            <a class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
              Negative
            </a>
          </li>
        </ul>

        <ArticleItem title="CNN" />
      </div>
    </div>
  );
}
