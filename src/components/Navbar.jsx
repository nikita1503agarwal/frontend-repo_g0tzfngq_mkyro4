import { Link, useLocation } from 'react-router-dom'
import { Sparkles, LogIn, LayoutGrid, Video } from 'lucide-react'

export default function Navbar({ user }) {
  const location = useLocation()
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/70 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-400" />
          <span>GenAds</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className={location.pathname==='/'? 'text-gray-900':'text-gray-600 hover:text-gray-900'}>Home</Link>
          <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition">
                <LayoutGrid size={16}/> Dashboard
              </Link>
              <Link to="/create" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-500 text-white shadow hover:opacity-90 transition">
                <Video size={16}/> Create
              </Link>
            </>
          ) : (
            <Link to="/signin" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition">
              <LogIn size={16}/> Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
