"use client"



import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2, Eye, Link, Sparkles } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { Input } from "@/components/ui/input"
import { createClient } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function ProfessionalSiteBuilder() {
  const [prompt, setPrompt] = useState('')
  const [generatedHtml, setGeneratedHtml] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [editPrompt, setEditPrompt] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    if (generatedHtml && editPrompt) {
      updateWebsite()
    }
  }, [editPrompt])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const generateLink = async () => {
    try {
      const { data, error } = await supabase
        .from('generated_websites')
        .insert({ html: generatedHtml })
        .select()

      if (error) throw error

      const id = data[0].id
      const link = `${window.location.origin}/preview/${id}`
      setGeneratedLink(link)
      setError('')
    } catch (error) {
      console.error('Error generating link:', error)
      setError('Error generating link: ' + error.message)
    }  finally {
      setIsPublishing(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => {
        console.error('Failed to copy: ', err)
        alert('Failed to copy link. Please try again.')
      })
  }

  const generateWebsite = async () => {
    setIsLoading(true)
    setError('')
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('Gemini API key is not set in the environment variables.')
      }

      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      }

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        }
      ]

      const chat = model.startChat({ generationConfig, safetySettings })

      const aiPrompt = `You are an expert frontend engineer and UI/UX designer. Create a professional , attractive and responsive landing page using HTML and Tailwind CSS for: ${prompt}. 
      Follow these instructions carefully:
      1. Include the Tailwind CSS CDN link in the <head> section:
         <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      2. Use Tailwind CSS classes for ALL styling. Do not use any custom CSS.
      3. Include the following sections, all styled with Tailwind CSS:
         - Header with a logo and navigation
         - Hero section with a headline and call-to-action
         - Features or benefits section
         - About or description section
         - Footer with links and copyright
      4. Ensure the design is responsive using Tailwind's responsive classes.
      5. Use a color scheme that fits the theme of the website.
      6. Add appropriate padding, margins, and layout classes to create an attractive design.
      7. Include some basic animations or hover effects using Tailwind's transition classes.

      Provide a complete HTML document that can be directly rendered in a browser. Do not include any explanations or additional text outside of the HTML.`

      const result = await chat.sendMessage(aiPrompt)
      const response = result.response
      const html = response.text().replace(/```html|```/g, '').trim()
      
      setGeneratedHtml(html)
      setIsFullScreen(true)
    } catch (error) {
      console.error('Error generating website:', error)
      setError('An error occurred while generating the website. Please check your API key and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateWebsite = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('Gemini API key is not set in the environment variables.')
      }

      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      }

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        }
      ]

      const chat = model.startChat({ generationConfig, safetySettings })

      const aiPrompt = `You are an expert frontend engineer and UI/UX designer. Given the following HTML code for a website:

      ${generatedHtml}

      Please update this website based on the following request: ${editPrompt}

      Provide the complete updated HTML document. The response should be valid HTML that can be directly rendered in a browser. Do not include any explanations or additional text.`

      const result = await chat.sendMessage(aiPrompt)
      const response = result.response
      const updatedHtml = response.text().replace(/```html|```/g, '').trim()
      
      setGeneratedHtml(updatedHtml)
    } catch (error) {
      console.error('Error updating website:', error)
      setError('An error occurred while updating the website. Please try again.')
    }
  }

  const LoadingAnimation = ({ text }) => (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-white text-lg">{text}</p>
    </div>
  )

  const VibrationLoadingAnimation = () => (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-16 bg-blue-500 rounded-full"
            animate={{
              scaleY: [1, 2, 1],
              translateY: ['0%', '-50%', '0%'],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'loop',
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  )

  if (isFullScreen && generatedHtml) {
    return (
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 z-50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-black bg-opacity-50 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Website Preview</h1>
          <div className="flex space-x-2">
            <Button onClick={() => setIsFullScreen(false)} variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Exit Full Screen
            </Button>
            <Button 
              onClick={generateLink} 
              variant="outline"
              disabled={isPublishing}
            >
              {isPublishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Link className="mr-2 h-4 w-4" />}
              {isPublishing ? 'Publishing...' : 'Publish Website'}
            </Button>
          </div>
        </div>
        <div className="flex-grow flex h-[calc(100vh-4rem)]">
          <AnimatePresence mode="wait">
            {isUpdating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-3/4 bg-gray-800 flex items-center justify-center"
              >
                <LoadingAnimation text="Updating your website..." />
              </motion.div>
            ) : (
              <motion.iframe
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                srcDoc={generatedHtml}
                title="Generated Website"
                className="w-3/4 border-none"
              />
            )}
          </AnimatePresence>
          <div className="w-1/4 p-4 bg-gray-800 overflow-y-auto">
            <Label htmlFor="editPrompt" className="text-lg font-semibold mb-2 block text-white">Update Website</Label>
            <Textarea
              id="editPrompt"
              placeholder="Add sections or change styling..."
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              className="w-full p-2 border rounded mb-4 bg-gray-700 text-white"
              rows={4}
            />
            <Button 
              onClick={updateWebsite} 
              className="w-full mb-4 bg-green-500 hover:bg-indigo-700" 
              disabled={isUpdating}
            >
              {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Apply Changes'}
            </Button>
            {generatedLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="generatedLink" className="text-lg font-semibold mb-2 block text-white">Shareable Link</Label>
                <div className="flex">
                  <Input
                    id="generatedLink"
                    value={generatedLink}
                    readOnly
                    className="flex-grow mr-2 bg-gray-700 text-white"
                  />
                  <Button onClick={copyToClipboard} variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Copy
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }


  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-white transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto p-8">
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-800 overflow-hidden shadow-2xl transition-colors duration-300">
            <CardHeader className="bg-green-500 text-white p-8">
              <div className="flex justify-between items-center">
                <div>
                  <motion.h2 
                    className="text-4xl font-bold mb-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Professional Site Builder
                  </motion.h2>
                  <motion.p 
                    className="text-xl opacity-90"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Create stunning websites with AI-powered generation
                  </motion.p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <motion.div className="mb-6" variants={itemVariants}>
                <Label htmlFor="prompt" className="text-lg font-semibold mb-2 block">Website Description</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe your dream website..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 border rounded-lg text-lg bg-gray-700 text-white"
                  rows={6}
                />
              </motion.div>
              <motion.div 
                className="flex justify-center mb-6"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={generateWebsite} 
                  disabled={isLoading} 
                  size="lg" 
                  className="text-lg px-8 py-6 rounded-full bg-green-500 hover:from-green-500 hover:to-green-300 transition-all duration-300"
                >
                  {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
                  {isLoading ? 'Generating...' : 'Generate Website'}
                </Button>
              </motion.div>
              
              {error && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Alert variant="destructive" className="mb-6 bg-red-900 border-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}