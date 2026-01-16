import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Mon Application React
          </h1>
          <p className="mt-2 text-gray-600">
            Vite + React + TypeScript + Redux + Tailwind CSS
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Stack Technologique</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span>Vite - Build tool ultra-rapide</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span>React 18 - Bibliothèque UI</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span>TypeScript - Typage statique</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span>Redux Toolkit - State management</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
                <span>Tailwind CSS - Framework CSS</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="mt-12 py-6 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>© 2024 Mon Application. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;