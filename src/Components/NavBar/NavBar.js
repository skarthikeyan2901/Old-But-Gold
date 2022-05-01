import React, { useState } from "react";

function NavBar() {

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
      <div>
        <header className="bg-purple-900 text-gray-100 sm:flex sm:justify-between">
            <div className="flex justify-between px-2 py-3">
                <div className="ml-2">Old But Gold</div>
                <div className="sm:hidden">
                    <button className="block text-gray-300 hover:text-white focus:outline-none focus:text-white" onClick={() => setMenuIsOpen(!menuIsOpen)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        class="bi bi-list"
                        viewBox="0 0 16 16"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                    </svg>
                    </button>
                </div>
            </div>
            <div className={`px-4 pb-3 ${menuIsOpen ? "block" : "hidden"} sm:flex sm:items-center sm:pb-0`}>
                <span className="block hover:bg-purple-600 px-2 py-1"><a href="/login">Login</a></span>
                <span className="block hover:bg-purple-600 px-2 py-1 mt-1 sm:mt-0"><a href="/signup">SignUp</a></span>
                <span className="block hover:bg-purple-600 px-2 py-1 mt-1 sm:mt-0"><a href="/">Home</a></span>
                <span className="block hover:bg-purple-600 px-2 py-1 mt-1 sm:mt-0">Point 4</span>
            </div>
        </header>
      </div>
    );
}

export default NavBar;