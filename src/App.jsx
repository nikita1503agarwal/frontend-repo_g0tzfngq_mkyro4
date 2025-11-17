import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import { SignIn, SignUp } from './components/Auth'
import Dashboard from './components/Dashboard'
import CreateFlow from './components/CreateFlow'
import VideoResult from './components/VideoResult'

function Landing(){
  return (
    <>
      <Hero/>
      <Features/>
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border bg-white">
            <div className="grid md:grid-cols-3">
              <Tier title="Starter" price="Free" features={["3 renders/month","Watermark","Community support"]}/>
              <Tier title="Pro" highlight price="$29" features={["30 renders/month","No watermark","Priority queue","Brand kits"]}/>
              <Tier title="Enterprise" price="Custom" features={["Unlimited","SSO","SLA","Dedicated support"]}/>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-12 text-center text-sm text-gray-500">© {new Date().getFullYear()} GenAds</footer>
    </>
  )
}

function Tier({title, price, features, highlight}){
  return (
    <div className={`p-8 ${highlight? 'bg-gray-900 text-white':''}`}>
      <div className="text-sm opacity-70">{title}</div>
      <div className="mt-2 text-3xl font-semibold">{price}</div>
      <ul className="mt-6 space-y-2 text-sm">
        {features.map(f=> <li key={f} className="opacity-80">• {f}</li>)}
      </ul>
      <button className={`mt-8 w-full rounded-xl px-4 py-2 border ${highlight? 'border-white/20 bg-white text-gray-900':'border-gray-200'}`}>Choose</button>
    </div>
  )
}

export default function App(){
  const [user, setUser] = useState(null)
  const location = useLocation()
  useEffect(()=>{
    const u = localStorage.getItem('genads_user')
    if(u) setUser(JSON.parse(u))
  },[location.pathname])

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/create" element={<CreateFlow/>} />
        <Route path="/video/:id" element={<VideoResult/>} />
      </Routes>
    </div>
  )
}
