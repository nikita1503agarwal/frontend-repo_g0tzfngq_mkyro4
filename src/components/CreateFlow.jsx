import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function CreateFlow(){
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    owner_email: JSON.parse(localStorage.getItem('genads_user')||'{}').email || '',
    project_name:'', brand_name:'', brand_detail:'',
    creative_prompt:'', target_audience:'', video_style:'Cinematic', aspect_ratio:'16:9', duration_seconds: 15,
    product_image_url:'', brand_logo_url:'', brand_guideline_url:'', reference_image_url:''
  })
  const [createdId, setCreatedId] = useState('')
  const [error, setError] = useState('')

  const start = async () => {
    setError('')
    try{
      const res = await fetch(`${API}/video/create`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if(!res.ok) throw new Error('Failed to create')
      const data = await res.json()
      setCreatedId(data.id)
      setStep(4)
    }catch(e){ setError(e.message) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-indigo-50 to-cyan-50 pb-24">
      <div className="pt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Progress step={step}/>
        <div className="mt-6 rounded-2xl border bg-white p-6">
          {step===1 && <Step1 form={form} setForm={setForm} onNext={()=>setStep(2)}/>} 
          {step===2 && <Step2 form={form} setForm={setForm} onPrev={()=>setStep(1)} onNext={()=>setStep(3)}/>} 
          {step===3 && <Step3 form={form} setForm={setForm} onPrev={()=>setStep(2)} onStart={start} error={error}/>} 
          {step===4 && <Result id={createdId}/>} 
        </div>
      </div>
    </div>
  )
}

function Progress({step}){
  const steps = ['Brand', 'Creative', 'Assets', 'Result']
  return (
    <div className="flex items-center justify-between">
      {steps.map((s,i)=> (
        <div key={s} className="flex-1 flex items-center">
          <div className={`h-10 px-4 rounded-full text-sm flex items-center justify-center border ${i+1<=step? 'bg-gray-900 text-white border-gray-900':'bg-white text-gray-600'}`}>{i+1}. {s}</div>
          {i<steps.length-1 && <div className={`flex-1 h-[2px] mx-3 ${i+1<step? 'bg-gray-900':'bg-gray-200'}`}/>} 
        </div>
      ))}
    </div>
  )
}

function Field({label, children}){
  return (
    <label className="block">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      {children}
    </label>
  )
}

function Step1({form, setForm, onNext}){
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Field label="Project name">
        <input className="w-full rounded-xl border px-4 py-3" value={form.project_name} onChange={e=>setForm({...form, project_name:e.target.value})}/>
      </Field>
      <Field label="Brand name">
        <input className="w-full rounded-xl border px-4 py-3" value={form.brand_name} onChange={e=>setForm({...form, brand_name:e.target.value})}/>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Brand details">
          <textarea rows={4} className="w-full rounded-xl border px-4 py-3" value={form.brand_detail} onChange={e=>setForm({...form, brand_detail:e.target.value})}/>
        </Field>
      </div>
      <div className="sm:col-span-2 flex justify-end">
        <button onClick={onNext} className="px-4 py-2 rounded-xl bg-gray-900 text-white">Continue</button>
      </div>
    </div>
  )
}

function Step2({form, setForm, onPrev, onNext}){
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div className="sm:col-span-2 grid sm:grid-cols-2 gap-6">
        <Field label="Creative vision prompt">
          <textarea rows={4} className="w-full rounded-xl border px-4 py-3" value={form.creative_prompt} onChange={e=>setForm({...form, creative_prompt:e.target.value})}/>
        </Field>
        <div>
          <Field label="Target audience">
            <input className="w-full rounded-xl border px-4 py-3" value={form.target_audience} onChange={e=>setForm({...form, target_audience:e.target.value})}/>
          </Field>
          <Field label="Video style">
            <select className="w-full rounded-xl border px-4 py-3 mt-2" value={form.video_style} onChange={e=>setForm({...form, video_style:e.target.value})}>
              <option>Cinematic</option>
              <option>Product Focus</option>
              <option>UGC</option>
              <option>Minimal Luxe</option>
              <option>Motion Graphic</option>
            </select>
          </Field>
        </div>
      </div>
      <Field label="Aspect ratio">
        <select className="w-full rounded-xl border px-4 py-3" value={form.aspect_ratio} onChange={e=>setForm({...form, aspect_ratio:e.target.value})}>
          <option>16:9</option>
          <option>9:16</option>
          <option>1:1</option>
          <option>4:5</option>
        </select>
      </Field>
      <Field label={`Duration (${form.duration_seconds}s)`}>
        <input type="range" min="5" max="120" value={form.duration_seconds} onChange={e=>setForm({...form, duration_seconds: parseInt(e.target.value)})} className="w-full"/>
      </Field>
      <div className="sm:col-span-2 flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 rounded-xl border">Back</button>
        <button onClick={onNext} className="px-4 py-2 rounded-xl bg-gray-900 text-white">Continue</button>
      </div>
    </div>
  )
}

function Step3({form, setForm, onPrev, onStart, error}){
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Uploader label="Product image URL" value={form.product_image_url} onChange={v=>setForm({...form, product_image_url: v})}/>
      <Uploader label="Brand logo URL" value={form.brand_logo_url} onChange={v=>setForm({...form, brand_logo_url: v})}/>
      <Uploader label="Brand guideline URL" value={form.brand_guideline_url} onChange={v=>setForm({...form, brand_guideline_url: v})}/>
      <Uploader label="Reference image URL" value={form.reference_image_url} onChange={v=>setForm({...form, reference_image_url: v})}/>
      {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}
      <div className="sm:col-span-2 flex justify-between">
        <button onClick={onPrev} className="px-4 py-2 rounded-xl border">Back</button>
        <button onClick={onStart} className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-500 text-white">Start creating</button>
      </div>
    </div>
  )
}

function Uploader({label, value, onChange}){
  return (
    <div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <input className="w-full rounded-xl border px-4 py-3" placeholder="https://..." value={value} onChange={e=>onChange(e.target.value)}/>
      <p className="text-xs text-gray-500 mt-1">Paste a URL for now.</p>
    </div>
  )
}

function Result({id}){
  return (
    <div className="text-center py-16">
      <div className="text-3xl font-semibold">Your video is being processed</div>
      <p className="text-gray-600 mt-2">Job ID: {id}</p>
      <a href={`/video/${id}`} className="inline-block mt-6 px-5 py-3 rounded-xl bg-gray-900 text-white">Open result</a>
    </div>
  )
}
