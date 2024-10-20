'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Book, Home, Info, Settings, Check, Menu } from "lucide-react"
import Link from "next/link"

import { useState } from "react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const imageUrls = [
    "/a.jpeg",
    "/b.jpeg",
    "/c.jpeg",
    "/d.jpeg",
    "/e.jpeg",
    "/f.jpeg"
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "month",
      features: [
        "Access to AI writing assistant",
        "5 story projects",
        "Basic character development tools",
        "Community support"
      ],
      buttonText: "Start Basic",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "month",
      features: [
        "Everything in Basic",
        "Unlimited story projects",
        "Advanced character development",
        "Interactive storytelling features",
        "Priority support"
      ],
      buttonText: "Go Pro",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "year",
      features: [
        "Everything in Pro",
        "Custom AI model training",
        "API access",
        "Dedicated account manager",
        "24/7 premium support"
      ],
      buttonText: "Contact Sales",
      highlighted: false
    }
  ];

  const showcaseContent = [
    {
      title: "The Enchanted Forest",
      description: "A magical tale of adventure and discovery.",
      image: "/hh.jpeg"
    },
    {
      title: "Galactic Odyssey",
      description: "An epic space journey across the universe.",
      image: "/ii.jpeg"
    },
    {
      title: "The Time Traveler's Dilemma",
      description: "A mind-bending story of temporal paradoxes.",
      image: "/jj.jpeg"
    }
  ];

  const characterContent = [
    {
      name: "Aria the Sorceress",
      description: "A powerful mage with a mysterious past.",
      image: "/aria.jpg"
    },
    {
      name: "Captain Nova",
      description: "A brave space explorer seeking new worlds.",
      image: "/nova.jpg"
    },
    {
      name: "Dr. Chronos",
      description: "An eccentric scientist obsessed with time travel.",
      image: "/chronos.jpg"
    },
    {
      name: "Luna the Shape-shifter",
      description: "A mystical being with the power to change forms.",
      image: "/luna.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
     
      <nav className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="text-white h-8 w-8" />
            <span className="text-2xl font-bold text-white">Story Wizard</span>
          </div>
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" className="text-white hover:text-purple-200 hover:bg-purple-700 transition-colors duration-300">
              <Home className="mr-2 h-5 w-5" /> Home
            </Button>
            <Link href='#features'>
              <Button variant="ghost" className="text-white hover:text-purple-200 hover:bg-purple-700 transition-colors duration-300">
                <Info className="mr-2 h-5 w-5" /> Features
              </Button>
            </Link>
            <Link href='/story'>
              <Button variant="ghost" className="text-white hover:text-purple-200 hover:bg-purple-700 transition-colors duration-300">
                <Settings className="mr-2 h-5 w-5" /> Dashboard
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <Button variant="ghost" className="w-full text-white hover:text-purple-200 hover:bg-purple-700 transition-colors duration-300 mb-2">
              <Home className="mr-2 h-5 w-5" /> Home
            </Button>
            <Link href='#features'>
              <Button variant="ghost" className="w-full text-white hover:text-purple-200 hover:bg-purple-700 transition-colors duration-300 mb-2">
                <Info className="mr-2 h-5 w-5" /> Features
              </Button>
            </Link>
            <Link href='/story'>
              <Button variant="ghost" className="w-full text-white hover:text-purple-200 hover:bg-purple-700 transition-colors duration-300 mb-2">
                <Settings className="mr-2 h-5 w-5" /> Dashboard
              </Button>
            </Link>
          </div>
        )}
      </nav>


      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-4xl md:text-5xl font-bold">What will you create today?</h1>
        <p className="mb-8 text-lg md:text-xl">Unleash your creativity with our AI-powered platform</p>
        <Link href='/story'>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get started for FREE</Button>
        </Link>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="h-40 w-28 md:h-60 md:w-40 rounded-lg overflow-hidden">
              <Image
                src={url}
                alt={`Sample image ${index + 1}`}
                width={320}
                height={480}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
<section className="bg-gray-800 py-20" id="features">
  <div className="container mx-auto px-4">
    <h2 className="mb-12 text-center text-4xl font-bold">Where Imagination Meets Innovation</h2>
    <div className="grid gap-8 md:grid-cols-3">
      <div className="rounded-lg bg-gray-700 p-6">
        <Image
          src="/aa.jpeg"
          alt="AI Writing Assistant"
          width={400}
          height={300}
          className="mb-4 rounded-lg object-cover"
        />
        <h3 className="mb-2 text-xl font-semibold">AI Writing Assistant</h3>
        <p className="text-gray-300">Boost your creativity with our advanced AI writing tool. Get suggestions, overcome writer's block, and refine your stories with ease.</p>
      </div>
      <div className="rounded-lg bg-gray-700 p-6">
        <Image
          src="/bb.jpeg"
          alt="Character Development"
          width={400}
          height={300}
          className="mb-4 rounded-lg object-cover"
        />
        <h3 className="mb-2 text-xl font-semibold">Character Development</h3>
        <p className="text-gray-300">Create rich, complex characters with our intuitive character development tools. Bring your stories to life with well-rounded personalities.</p>
      </div>
      <div className="rounded-lg bg-gray-700 p-6">
        <Image
          src="/cc.jpeg"
          alt="Interactive Storytelling"
          width={400}
          height={300}
          className="mb-4 rounded-lg object-cover"
        />
        <h3 className="mb-2 text-xl font-semibold">Interactive Storytelling</h3>
        <p className="text-gray-300">Engage your readers with interactive storytelling features. Create branching narratives and let your audience shape the story.</p>
      </div>
    </div>
  </div>
</section>

      {/* Showcase Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Explore our Featured Content</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {showcaseContent.map((content, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-gray-800">
                <Image
                  src={content.image}
                  alt={content.title}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold">{content.title}</h3>
                  <p className="text-gray-300">{content.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-gray-700 rounded-lg p-8 flex flex-col ${
                  plan.highlighted ? 'border-2 border-purple-500' : ''
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                <ul className="mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center mb-2">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2 mb-4">
                <Book className="text-white h-8 w-8" />
                <span className="text-2xl font-bold text-white">Story Wizard</span>
              </div>
              <p className="text-gray-300 text-sm text-center md:text-left">
                Empowering writers with AI-driven creativity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Quick Links</h3>
              <ul className="space-y-2 text-center md:text-left">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Resources</h3>
              <ul className="space-y-2 text-center md:text-left">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Tutorials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Support</a></li>
              </ul>
            </div>
          
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-300 text-sm">
              © 2024 Story Wizard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}