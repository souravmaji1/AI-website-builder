'use client'


import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useParams } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Preview() {
  const [html, setHtml] = useState('')
  const [error, setError] = useState('')
  const params = useParams()
  const id = params.id

  useEffect(() => {
    async function fetchHtml() {
      if (id) {
        try {
          const { data, error } = await supabase
            .from('generated_websites')
            .select('html')
            .eq('id', id)
            .single()

          if (error) throw error
          setHtml(data.html)
        } catch (error) {
          console.error('Error fetching HTML:', error)
          setError('Error fetching HTML: ' + error.message)
        }
      }
    }

    fetchHtml()
  }, [id])

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <h2 className="font-bold">Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (!html) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded">
        <a href="/" className="text-blue-400 hover:underline">Back to Site Builder</a>
      </div>
    </>
  )
}