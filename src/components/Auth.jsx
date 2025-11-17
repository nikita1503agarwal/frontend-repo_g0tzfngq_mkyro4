import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function SignIn(){
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try{
      const res = await fetch(`${API}/auth/signin`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if(!res.ok) throw new Error((await res.json()).detail || 'Failed')
      const data = await res.json()
      localStorage.setItem('genads_user', JSON.stringify(data))
      nav('/dashboard')
    }catch(err){ setError(err.message) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-indigo-50 to-cyan-50">
      <div className="pt-28 max-w-md mx-auto px-4">
        <div className="rounded-2xl border bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-gray-600 mt-1">Sign in to continue creating luxury ad videos.</p>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input className="w-full rounded-xl border px-4 py-3" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
            <input className="w-full rounded-xl border px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
            <button className="w-full rounded-xl bg-gray-900 text-white py-3 hover:bg-black">Sign in</button>
          </form>
          <p className="text-sm text-gray-600 mt-4">No account? <Link to="/signup" className="text-indigo-600">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export function SignUp(){
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try{
      const res = await fetch(`${API}/auth/signup`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if(!res.ok) throw new Error((await res.json()).detail || 'Failed')
      const data = await res.json()
      localStorage.setItem('genads_user', JSON.stringify(data))
      nav('/dashboard')
    }catch(err){ setError(err.message) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-indigo-50 to-cyan-50">
      <div className="pt-28 max-w-md mx-auto px-4">
        <div className="rounded-2xl border bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-gray-600 mt-1">Start generating ads videos with GenAds.</p>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input className="w-full rounded-xl border px-4 py-3" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
            <input className="w-full rounded-xl border px-4 py-3" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
            <input className="w-full rounded-xl border px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
            <button className="w-full rounded-xl bg-gray-900 text-white py-3 hover:bg-black">Sign up</button>
          </form>
          <p className="text-sm text-gray-600 mt-4">Have an account? <Link to="/signin" className="text-indigo-600">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
