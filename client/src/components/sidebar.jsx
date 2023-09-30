import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MenuItem({ title, link, children, currentPath, setCurrentPath }) {
  const active = currentPath === link;
  return (
    <Link to={link}>
      <div
        className={`flex itmes-center my-3 hover:bg-blue-400 hover:text-gray-600 py-2 space-x-2 text-white px-4 rounded-xl cursor-pointer ${
          active ? "bg-blue-400 text-gray-600" : ""
        }`}
        onClick={() => {
          setCurrentPath(link);
        }}
      >
        {children}
        <span className="ml-2">{title}</span>
      </div>
    </Link>
  );
}

export default function index() {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname.split("/")[1] || ""
  );

  return (
    <div>
      <div className="flex flex-col items-center justify-between mb-10">
        <h1 className="flex space-x-4 items-center text-2xl font-bold text-blue-200 pt-4 my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
            />
          </svg>
          GESTCOM
        </h1>
        <div>
          <input
            type="text"
            placeholder="Rechercher"
            className="px-4 py-2 border bg-gray-400/50 text-gray-100 outline-none rounded-xl"
          />
        </div>
      </div>
      <div className="mt-10">
        <MenuItem
          title="dashboard"
          link=""
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
            />
          </svg>
        </MenuItem>
        <MenuItem
          title="profile"
          link="profile"
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14c3.866 0 7-3.134 7-7 0-3.866-3.134-7-7-7s-7 3.134-7 7c0 3.866 3.134 7 7 7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.21 21.21L15 17.25M8.79 21.21L9 17.25M21.21 14.79a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </MenuItem>
      </div>
    </div>
  );
}
