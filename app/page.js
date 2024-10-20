'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Code, Zap, Rocket, Check, Terminal, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Inter, Roboto_Mono } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function AIWebsiteGenerator() {
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

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${inter.className}`}>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="h-8 w-8 text-green-400" />
          <span className="text-2xl font-bold">AI Site Gen</span>
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
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create Stunning Websites with AI
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Generate professional, eye-catching websites in seconds using the power of artificial intelligence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href='/story'>
            <Button onClick={handleGenerate} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Generate Your Website
            </Button>
            </Link>
           
          </motion.div>
        </section>

        <section id="demo" className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">See It in Action</h2>
            <motion.div 
              className="bg-gray-900 p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-800 h-88 rounded-lg flex items-center justify-center mb-4">
               
                 
             
                  <img 
                    src="https://storage.googleapis.com/website-production/uploads/2023/07/sweetkick-landing-page-example-1.png" 
                    alt="Website Preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
               
              </div>
              <div className="flex space-x-4">
                <Input placeholder="Enter your website idea..." className="flex-grow" />
                <Button onClick={handleGenerate} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
                  Generate
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowItWorksStep
              number={1}
              title="Input Your Idea"
              description="Describe your website concept or business in simple terms."
            />
            <HowItWorksStep
              number={2}
              title="AI Magic"
              description="Our advanced AI analyzes your input and generates a custom website design."
            />
            <HowItWorksStep
              number={3}
              title="Customize & Launch"
              description="Fine-tune the generated design and publish your new website instantly."
            />
          </div>
        </section>

        <section id="features" className="bg-gray-800 container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Powerful AI Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Code className="h-12 w-12 text-green-400" />}
            title="Smart Code Generation"
            description="Our AI generates clean, optimized code for your website, ensuring fast load times and great performance."
          />
          <FeatureCard
            icon={<Zap className="h-12 w-12 text-green-400" />}
            title="Instant Designs"
            description="Create beautiful, responsive designs in seconds. No design skills required."
          />
          <FeatureCard
            icon={<Rocket className="h-12 w-12 text-green-400" />}
            title="SEO Optimization"
            description="Built-in SEO best practices to help your website rank higher in search results."
          />
        </div>
      </section>

      <section id="pricing" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Unbeatable Value</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  <TableHead className="text-center">Traditional Web Design</TableHead>
                  <TableHead className="text-center">AI Site Gen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Design Time</TableCell>
                  <TableCell className="text-center">2-4 weeks</TableCell>
                  <TableCell className="text-center text-green-400">Seconds</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cost</TableCell>
                  <TableCell className="text-center">$5,000 - $10,000+</TableCell>
                  <TableCell className="text-center text-green-400">Starting at $49/month</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Revisions</TableCell>
                  <TableCell className="text-center">Limited</TableCell>
                  <TableCell className="text-center text-green-400">Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">SEO Optimization</TableCell>
                  <TableCell className="text-center">Additional Cost</TableCell>
                  <TableCell className="text-center text-green-400">Included</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">24/7 Support</TableCell>
                  <TableCell className="text-center">
                    <span className="sr-only">Not included</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="h-6 w-6 text-green-400 mx-auto" />
                    <span className="sr-only">Included</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        <section id="testimonials" className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="AI Site Gen transformed our business. We launched our website in hours, not weeks!"
                author="Sarah J., Startup Founder"
              />
              <TestimonialCard
                quote="The AI-generated designs are incredible. It's like having a professional designer on demand."
                author="Mike T., Freelance Developer"
              />
              <TestimonialCard
                quote="I was skeptical at first, but the results blew me away. This is the future of web design."
                author="Emily R., Marketing Manager"
              />
            </div>
          </div>
        </section>

        <section id="pricing" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl">Starter</CardTitle>
              <CardDescription className="text-gray-400">Perfect for small businesses</CardDescription>
              <div className="text-3xl font-bold text-green-400">$19/mo</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />5 Pages</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />Basic SEO</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />Mobile Responsive</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-500 hover:bg-green-600">Get Started</Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-green-500 border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Professional</CardTitle>
              <CardDescription className="text-gray-400">For growing businesses</CardDescription>
              <div className="text-3xl font-bold text-green-400">$49/mo</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />30 Pages</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />Advanced SEO</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />Custom Domains</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />Priority Support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-500 hover:bg-green-600">Get Started</Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription className="text-gray-400">For large organizations</CardDescription>
              <div className="text-3xl font-bold text-green-400">Contact Us</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />Custom Solutions</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />Dedicated Support</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />SLA Agreement</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-green-400 mr-2" />API Access</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-500 hover:bg-green-600">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

        <section id="cta" className="bg-green-500 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Web Presence?</h2>
            <p className="text-xl mb-8">Join thousands of satisfied users and create your AI-powered website today.</p>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 AI Site Gen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <motion.div 
      className="bg-gray-900 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg mb-4">"{quote}"</p>
      <p className="text-green-400 font-semibold">{author}</p>
    </motion.div>
  );
}

function HowItWorksStep({ number, title, description }) {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold mb-4 ${robotoMono.className}`}>
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}