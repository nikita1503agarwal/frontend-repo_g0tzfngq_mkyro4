import { MagicWand, Shield, Zap, Layers, Palette, BadgeHelp } from 'lucide-react'

export default function Features(){
  const items = [
    { icon: Zap, title: 'Fast Rendering', desc: 'GPU-accelerated video generation with smart caching.' },
    { icon: Palette, title: 'On-brand Styling', desc: 'Respect brand colors, fonts and motion language.' },
    { icon: Layers, title: 'Scene Templates', desc: 'Curated ad blueprints optimized for performance.' },
    { icon: Shield, title: 'Enterprise-grade', desc: 'Secure, compliant, reliable by design.' },
  ]
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Designed for performance</h2>
        <p className="mt-3 text-gray-600 max-w-2xl">Everything you need to craft luxury-grade ad videos at speed.</p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-xl transition">
              <it.icon className="text-indigo-600"/>
              <h3 className="mt-4 font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
