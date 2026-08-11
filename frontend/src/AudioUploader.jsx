import React, { useState } from 'react'
import axios from 'axios'

const AudioUploader = () => {
  const [file, setFile] = useState(null)
  const [transcription, setTranscription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleUpload = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:8080/api/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setTranscription(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error transcribing Audio: ", error);
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen w-full bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10 text-slate-100'>
      <div className='mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur'>
        <div className='space-y-2 text-center'>
          <p className='text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80'>Audio Transcription</p>
          <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>Audio to Text Converter</h1>
          <p className='text-sm text-slate-300'>Upload an audio file and get a transcription back from the server.</p>
        </div>

        <div className='rounded-2xl border border-dashed border-cyan-400/30 bg-slate-950/40 p-6 text-center'>
          <label className='flex cursor-pointer flex-col items-center gap-3 text-sm text-slate-300'>
            <span className='rounded-full bg-cyan-400/10 px-4 py-2 font-medium text-cyan-200'>Choose audio file</span>
            <span>{file ? file.name : 'MP3, WAV, M4A, or other audio formats'}</span>
            <input type="file" accept='audio/*' onChange={handleFileChange} className='hidden' />
          </label>
        </div>

        <button
          className='inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-300'
          onClick={handleUpload}
          disabled={!file || isLoading}
        >
          {isLoading ? 'Transcribing...' : 'Upload and Transcribe'}
        </button>

        <div className='rounded-2xl border border-white/10 bg-slate-950/50 p-5'>
          <h2 className='mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400'>Transcription Result</h2>
          <p className='min-h-24 whitespace-pre-wrap rounded-xl bg-white/5 p-4 text-sm leading-6 text-slate-200'>
            {transcription || 'Your transcription will appear here.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AudioUploader