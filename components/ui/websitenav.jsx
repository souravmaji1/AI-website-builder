import React from 'react'
import { Button } from "@/components/ui/button"
import { Eye, Link, Code, Smartphone, Tablet, Laptop } from "lucide-react"

const Navbar = ({ setIsFullScreen, generateLink, exportSourceCode, viewportSize, setViewportSize, isPublishing }) => {
  return (
    <div className="bg-black bg-opacity-50 text-white p-4 flex justify-between items-center">
      <div className="flex-1">
        <h1 className="text-xl font-bold">Website Preview</h1>
      </div>
      
      <div className="flex-1 flex justify-center space-x-2">
        <Button
          onClick={() => setViewportSize('mobile')}
          variant={viewportSize === 'mobile' ? 'default' : 'outline'}
          size="icon"
        >
          <Smartphone className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setViewportSize('tablet')}
          variant={viewportSize === 'tablet' ? 'default' : 'outline'}
          size="icon"
        >
          <Tablet className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setViewportSize('desktop')}
          variant={viewportSize === 'desktop' ? 'default' : 'outline'}
          size="icon"
        >
          <Laptop className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 flex justify-end space-x-4">
        <Button onClick={() => setIsFullScreen(false)} variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          Exit Full Screen
        </Button>
        <Button 
          onClick={generateLink} 
          variant="outline"
          disabled={isPublishing}
        >
          <Link className="mr-2 h-4 w-4" />
          {isPublishing ? 'Publishing...' : 'Publish Website'}
        </Button>
        <Button onClick={exportSourceCode} variant="outline">
          <Code className="mr-2 h-4 w-4" />
          Export Source Code
        </Button>
      </div>
    </div>
  )
}

export default Navbar