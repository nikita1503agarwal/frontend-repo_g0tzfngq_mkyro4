import Spline from '@splinetool/react-spline'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative min-h-[88vh] pt-24 flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-radial from-white/90 via-white/70 to-white/30 pointer-events-none" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
        <div className="backdrop-blur-sm/50">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">
            Luxury AI Video Ads in Minutes
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            GenAds turns your brand, product and vision into polished, high-converting ad videos. Modern. Fast. Magical.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link to="/signup" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-fuchsia-500/20 hover:opacity-90 transition">
              Get Started <ArrowRight size={16}/>
            </Link>
            <a href="#features" className="px-5 py-3 rounded-xl border border-gray-200 bg-white/70 hover:bg-white transition">See features</a>
          </div>
        </div>
        <div className="lg:justify-self-end">
          <div className="w-full max-w-md rounded-3xl border border-white/50 bg-white/60 backdrop-blur shadow-xl p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-400" />
              <div>
                <p className="text-sm text-gray-500">Trusted by innovative brands</p>
                <p className="font-semibold">Create, iterate, deliver</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Stat label="Avg. time" value="2 min"/>
              <Stat label="CTR uplift" value="+32%"/>
              <Stat label="ROAS" value="3.8x"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({label, value}){
  return (
    <div className="rounded-2xl border border-white/50 bg-white/60 p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  )
}
