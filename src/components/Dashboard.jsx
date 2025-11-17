import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Play, Loader2 } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard(){
  const nav = useNavigate()
  const [user, setUser] = useState(null)
  const [data, setData] = useState({ total:0, processing:0, videos:[] })

  useEffect(()=>{
    const u = localStorage.getItem('genads_user')
    if(!u){ nav('/signin'); return }
    const parsed = JSON.parse(u)
    setUser(parsed)
    fetch(`${API}/dashboard/summary?email=${encodeURIComponent(parsed.email)}`)
      .then(r=>r.json()).then(setData).catch(()=>{})
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-indigo-50 to-cyan-50 pb-20">
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome{user?`, ${user.name||user.email}`:''}</h1>
            <p className="text-gray-600">Your creative control room</p>
          </div>
          <Link to="/create" className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black">New video</Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <KPI label="Total videos" value={data.total}/>
          <KPI label="In processing" value={data.processing}/>
          <KPI label="Completed" value={Math.max(0, data.total - data.processing)}/>
          <KPI label="Success rate" value={`${data.total? Math.round(((data.total - data.processing)/data.total)*100):0}%`}/>
        </div>

        <h2 className="mt-10 font-semibold">Recent videos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {data.videos.map(v => (
            <div key={v.id} className="group rounded-2xl overflow-hidden border bg-white hover:shadow-xl transition">
              <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                {v.thumbnail_url ? (
                  <img src={v.thumbnail_url} alt="thumb" className="w-full h-full object-cover"/>
                ) : (
                  <Loader2 className="animate-spin text-gray-400"/>
                )}
                <Link to={`/video/${v.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/90 text-white"><Play size={16}/> View</span>
                </Link>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500">{v.status}</div>
                <div className="font-semibold">{v.project_name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function KPI({label, value}){
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
