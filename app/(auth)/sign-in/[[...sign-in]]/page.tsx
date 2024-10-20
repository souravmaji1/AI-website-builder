'use client'

import React from 'react';
import Image from 'next/image';
import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const SignInPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center p-8">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
          {/*  <Image
              src="/homs.png"
              width={40}
              height={40}
              alt="VocalBotics Logo"
              className="rounded"
            /> */}
            <span className="text-2xl font-bold text-white">AISiteGen</span>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl " style={{display:'flex',justifyContent:'center'}}>
           
            <SignIn />
          </div>
          
          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="text-cyan-400 hover:underline">
              Sign up
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;