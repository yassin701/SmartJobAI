
import React from 'react'

export default function Tips() {
  return (
              <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tips for Success</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Complete All Fields</h4>
                    <p className="text-gray-600 text-sm">Fill in every required field for better chances.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Tailor Your CV</h4>
                    <p className="text-gray-600 text-sm">Highlight skills relevant to this position.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Custom Motivation</h4>
                    <p className="text-gray-600 text-sm">Explain specifically why you want this job.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Review Before Sending</h4>
                    <p className="text-gray-600 text-sm">Check for typos and accuracy.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">What Happens Next?</h4>
                <p className="text-gray-600 text-sm">
                  After submission, our HR team will review your application. If your profile matches our requirements, we'll contact you within 5-7 business days.
                </p>
              </div>
            </div>
          </div>
  )
}
