import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Download, Share2, Home } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function VideoResult(){
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(()=>{
    fetch(`${API}/video/${id}`).then(r=>r.json()).then(setData).catch(()=>{})
  },[id])

  if(!data) return <div className="min-h-screen pt-24 flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-indigo-50 to-cyan-50 pb-24">
      <div className="pt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-white p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="aspect-video rounded-xl bg-gray-100 overflow-hidden">
                {data.video_url ? (
                  <video controls src={data.video_url} className="w-full h-full object-cover"/>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-500">Processing...</div>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl bg-gray-900 text-white inline-flex items-center gap-2"><CheckCircle2 size={16}/> Finalize</button>
                <button className="px-4 py-2 rounded-xl border inline-flex items-center gap-2"><Download size={16}/> Download</button>
                <button className="px-4 py-2 rounded-xl border inline-flex items-center gap-2"><Share2 size={16}/> Share</button>
                <Link to="/" className="ml-auto px-4 py-2 rounded-xl border inline-flex items-center gap-2"><Home size={16}/> Home</Link>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{data.project_name}</h2>
              <div className="text-sm text-gray-600">{data.brand_name} • {data.aspect_ratio} • {data.duration_seconds}s</div>
              <div className="mt-4 p-4 rounded-xl bg-gray-50 text-sm whitespace-pre-wrap">{data.creative_prompt}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
