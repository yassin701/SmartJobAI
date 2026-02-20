import React from 'react'
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SJ</span>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartJob
              </span>
            </div>
            <p className="text-gray-600 max-w-md">
              Revolutionize your applications with our smart tools.
              Now more than ever, we're here to help you find your dream job.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link></li>
                <li><Link to="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors">Job Openings</Link></li>
                <li><Link to="/apply" className="text-gray-600 hover:text-blue-600 transition-colors">Apply Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Admin@smartjob.ai</li>
                <li>+2127 2213-8696</li>
                <li>Casablanca, Morocco</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SmartJob.ai. All rights reserved.
            <span className="mx-2">•</span>
            Revolutionize your career with AI
          </p>
        </div>
      </div>
    </footer>
  )
}
