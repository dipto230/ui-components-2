import React, { useState, useEffect } from "react";
import { InputField } from "./components/InputField";
import { DataTable, Column } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const data: User[] = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

function App() {
  const [value, setValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">🚀 My UI App</h1>

          <div className="flex items-center space-x-6">
            <nav className="hidden sm:flex space-x-6">
              <a href="#" className="hover:text-yellow-300 transition">
                Home
              </a>
              <a href="#" className="hover:text-yellow-300 transition">
                Features
              </a>
              <a href="#" className="hover:text-yellow-300 transition">
                Contact
              </a>
            </nav>

            {/* Toggle Button */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg shadow hover:scale-105 transition-transform"
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8 space-y-6">
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          helperText="This is a helper text"
          clearable
          passwordToggle
        />

        <DataTable<User>
          data={data}
          columns={columns}
          selectable
          onRowSelect={(rows) => console.log("Selected rows:", rows)}
        />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-400 mt-8 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} My UI App. All rights reserved.
          </p>
          <div className="space-x-4 mt-3 sm:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
