'use client'



import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertCircle, 
  Loader2, 
  Eye, 
  Trash2, 
  Link as LinkIcon, 
  Download, 
  Search,
  Calendar,
  ArrowUpDown
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Sparkles, Code, Zap, Rocket, Check, Terminal, Menu, X } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function UserDashboard() {
  const [websites, setWebsites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      fetchUserWebsites()
    }
  }, [user, sortBy])

  const fetchUserWebsites = async () => {
    try {
      let query = supabase
        .from('generated_websites')
        .select('*')
        .eq('user_id', user.id)

      // Apply sorting
      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false })
      } else if (sortBy === 'oldest') {
        query = query.order('created_at', { ascending: true })
      } else if (sortBy === 'title') {
        query = query.order('title', { ascending: true })
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError
      setWebsites(data)
      setError('')
    } catch (error) {
      console.error('Error fetching websites:', error)
      setError('Failed to fetch your websites')
    } finally {
      setLoading(false)
    }
  }

  const deleteWebsite = async (websiteId) => {
    setIsDeleting(true)
    try {
      const { error: deleteError } = await supabase
        .from('generated_websites')
        .delete()
        .eq('id', websiteId)
        .eq('user_id', user.id)

      if (deleteError) throw deleteError

      setWebsites(websites.filter(site => site.id !== websiteId))
      setError('')
    } catch (error) {
      console.error('Error deleting website:', error)
      setError('Failed to delete website')
    } finally {
      setIsDeleting(false)
    }
  }

  const exportSourceCode = (html, title) => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // You could add a toast notification here
        alert('Link copied to clipboard!')
      })
      .catch(err => {
        console.error('Failed to copy:', err)
        alert('Failed to copy link')
      })
  }

  const filteredWebsites = websites.filter(website =>
    website.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    website.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  const [generatedPreview, setGeneratedPreview] = useState("Your AI-generated website preview will appear here...");

  const handleGenerate = () => {
    setGeneratedPreview("AI is generating your website... This is a placeholder for the actual AI-generated content.");
  };

  const NavItems = ({ className = "", onClick = () => {} }) => (
    <>
      <li><a href="#features" className="hover:text-green-400 transition-colors" onClick={onClick}>Features</a></li>
      <li><a href="#demo" className="hover:text-green-400 transition-colors" onClick={onClick}>Demo</a></li>
      <li><a href="#how-it-works" className="hover:text-green-400 transition-colors" onClick={onClick}>How It Works</a></li>
      <li><a href="#testimonials" className="hover:text-green-400 transition-colors" onClick={onClick}>Testimonials</a></li>
      <li><a href="#pricing" className="hover:text-green-400 transition-colors" onClick={onClick}>Pricing</a></li>
      <li><a href="#cta" className="hover:text-green-400 transition-colors" onClick={onClick}>Get Started</a></li>
    </>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-500" />
          <p className="mt-2 text-white">Loading your websites...</p>
        </div>
      </div>
    )
  }



  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-white "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
         <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="h-8 w-8 text-green-400" />
          <span className="text-2xl font-bold">BuilderHall</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <motion.ul 
            className="flex space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NavItems />
          </motion.ul>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-900 border-gray-800">
            <nav className="flex flex-col mt-8">
              <ul className="flex flex-col space-y-4">
                <NavItems onClick={() => document.querySelector('[data-radix-dialog-close]').click()} />
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <div className="max-w-7xl mx-auto p-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Generated Websites</h1>
            <p className="text-gray-400">
              Manage and organize all your AI-generated websites
            </p>
          </div>
          
          <Button 
            onClick={() => window.location.href = '/generate'}
            className="bg-green-500 hover:bg-green-600"
          >
            Generate New Website
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search websites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredWebsites.map((website) => (
              <motion.div
                key={website.id}
                variants={itemVariants}
                layout
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-green-500 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{website.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      {new Date(website.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-300 line-clamp-2 mb-4">
                      {website.description}
                    </p>
                  </CardContent>

                  <CardFooter className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/preview/${website.id}`, '_blank')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(`${window.location.origin}/preview/${website.id}`)}
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportSourceCode(website.html, website.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 text-white">
                        <DialogHeader>
                          <DialogTitle>Delete Website</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Are you sure you want to delete this website? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="ghost"
                            onClick={() => setSelectedWebsite(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              deleteWebsite(website.id)
                              setSelectedWebsite(null)
                            }}
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              'Delete'
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredWebsites.length === 0 && !loading && (
            <motion.div 
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400 text-lg">
                {searchQuery 
                  ? "No websites match your search criteria"
                  : "You haven't generated any websites yet"}
              </p>
              <Button 
                className="mt-4 bg-green-500 hover:bg-green-600"
                onClick={() => window.location.href = '/generate'}
              >
                Generate Your First Website
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}