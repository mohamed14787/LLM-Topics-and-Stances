import trump from "../Assets/trump.jpeg";
export default function Middle() {
  return (
    <div className="leftSideBar">
      <div>
        <img src={trump} alt="trump" />
        <a href="#">
          <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Trump Wins 2024 Presidential Election
          </h2>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Donald Trump emerged victorious in the 2024 U.S. presidential
          election, marking an unprecedented return to the White House after
          losing in 2020. His win was fueled by a deeply polarized electorate,
          discontent with the prevailing administration, and strong appeal among
          working-class voters, particularly in battleground states. Trump’s
          campaign focused on economic frustrations, immigration issues, and a
          direct challenge to the justice system, which resonated with his base,
          despite his ongoing legal battles.
        </p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          style={{ backgroundColor: "#222" }}
        >
          Read more
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
