import React, { useState } from 'react'

function App() {
  const [dark, setDark] = useState(false)

  const toggleTheme = () => {
    setDark(!dark)
    document.body.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#13131f] text-slate-900 dark:text-slate-100 transition-colors duration-250`}>
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2 tracking-tight">
          LeadFlow CRM
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Phase 1: Project Setup & Initialization Complete
        </p>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={toggleTheme}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/30 transition duration-200"
          >
            Toggle Theme ({dark ? 'Light Mode' : 'Dark Mode'})
          </button>
          
          <div className="text-xs text-slate-400 dark:text-slate-500">
            Powered by Vite + React + Tailwind CSS
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
