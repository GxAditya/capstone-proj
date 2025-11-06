"use client";

import { useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiBook,
  FiGlobe,
  FiFolder,
  FiMic,
  FiArrowRight,
} from "react-icons/fi";

export default function ChatPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 bg-gray-900 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">ChatGPT</h1>
          <nav className="space-y-4 text-sm">
            <div className="flex items-center gap-2"><FiPlus /> New chat</div>
            <div className="flex items-center gap-2"><FiSearch /> Search chats</div>
            <div className="flex items-center gap-2"><FiBook /> Library</div>
            <div className="flex items-center gap-2"><FiGlobe /> Atlas</div>
            <div className="flex items-center gap-2"><FiFolder /> Projects</div>
          </nav>

          <div className="mt-6 text-xs text-gray-400">
            <p className="mb-2">Chats</p>
            <ul className="space-y-1">
              <li>Upscale image to 4K</li>
              <li>Nyan island & decals</li>
              <li>Sakurasou semi query</li>
              <li>Explain semantic personal</li>
              <li>Image description</li>
              <li>Thunderbolt dock</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm">lakshya agarwal</span>
          </div>
          <button className="text-xs bg-purple-600 px-2 py-1 rounded hover:bg-purple-700 transition">Upgrade</button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <h2 className="text-2xl font-semibold mb-6">What can I help with?</h2>

        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 w-full max-w-xl">
          <FiPlus className="text-white mr-3" />
          <input
            type="text"
            placeholder="Ask anything"
            className="bg-transparent flex-1 text-white placeholder-gray-400 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FiMic className="text-white mx-2" />
          <FiArrowRight className="text-white" />
        </div>
      </main>

      {/* Right Toolbar */}
      <aside className="w-12 bg-gray-900 flex flex-col items-center justify-center gap-6 text-white text-xl">
        <FiSearch />
        <FiGlobe />
        <FiBook />
        <FiFolder />
        <FiPlus />
      </aside>
    </div>
  );
}