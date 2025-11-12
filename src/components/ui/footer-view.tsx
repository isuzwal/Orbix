

export const Footer = () => {
  return (
    <footer className="flex max-w-7xl mx-auto w-full text-center justify-center  p-5 items-center gap-3 ">
      <p>© {new Date().getFullYear()} Second Brain</p>
      <div className="flex gap-6">
        <a
          href="https://github.com/isuzwal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-black transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 432 416">
            <path
              fill="currentColor"
              d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"
            />
          </svg>
          GitHub
        </a>
        <a
          href="https://x.com/isuzwal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12">
            <path
              fill="currentColor"
              d="M.076 0H3.61l3.145 4.498L10.53 0h1.129L7.185 5.114L12 12H8.468L5.183 7.303L1.128 12H0l4.753-5.312z"
            />
          </svg>
          Twitter
        </a>
      </div>
    </footer>
  );
};
