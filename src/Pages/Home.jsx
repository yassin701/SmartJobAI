import { Link } from "react-router-dom";
import { FaSearch, FaChartLine, FaRobot, FaClock, FaRocket, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

          <div className="relative container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find your next challenge with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SmartJob
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Artificial intelligence at the service of your career.<br />
                Find opportunities that truly match you in just a few clicks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link
                  to="/jobs"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <FaSearch className="text-lg" />
                  View job offers
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why choose <span className="text-blue-600">SmartJob </span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our technology analyzes thousands of data points to propel your career to the next level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="group relative bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl"></div>
                <div className="mb-6">
                  <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <FaRobot className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Precise Matching</h3>
                  <p className="text-gray-600">
                    AI deeply analyzes your technical and behavioral skills to detect the best job offers perfectly suited to your profile.
                  </p>
                </div>
                <div className="flex items-center text-blue-600 font-medium">
                  <FaCheckCircle className="mr-2" />
                  <span>Guaranteed accuracy</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-2xl p-8 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl"></div>
                <div className="mb-6">
                  <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                    <FaRocket className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Optimized Applications</h3>
                  <p className="text-gray-600">
                    Get personalized advice to tailor your CV and cover letter. Increase your response chances by 3x.
                  </p>
                </div>
                <div className="flex items-center text-purple-600 font-medium">
                  <FaCheckCircle className="mr-2" />
                  <span>+300% success rate</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-gradient-to-br from-white to-green-50 border border-green-100 rounded-2xl p-8 hover:shadow-2xl hover:border-green-200 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-t-2xl"></div>
                <div className="mb-6">
                  <div className="h-14 w-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                    <FaClock className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Time Saving</h3>
                  <p className="text-gray-600">
                    Don't waste time on outdated positions. Only apply to offers where AI confirms your potential for success.
                  </p>
                </div>
                <div className="flex items-center text-green-600 font-medium">
                  <FaCheckCircle className="mr-2" />
                  <span>90% time saved</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to revolutionize your job search?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join thousands of professionals who have already found their ideal job with SmartJob .
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Apply now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );

}