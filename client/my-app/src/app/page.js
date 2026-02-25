"use client";

import { AppFooter } from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 1. Navbar tetap di paling atas */}
      {/* 2. Berikan padding-top (pt-24) agar konten tidak tertutup Navbar */}
      <div className="pt-24 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        <div className="container mx-auto px-4 py-16">
          
          {/* Logo di Body sekarang akan terlihat jelas di bawah Navbar */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img
                src="https://i.ibb.co.com/1tJPNJP7/Sub-Track8-cropped-removebg.png"
                alt="SubTrack8 Logo"
                className="w-48 md:w-64 lg:w-72 h-auto"
              />
            </div>

            <p className="text-2xl text-gray-700 mb-4">
              Manage all your subscriptions in one place
            </p>
            <p className="text-lg text-gray-500">
              No more forgotten subscriptions or missed payments! 💳
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Complete Dashboard</h3>
                <p className="text-gray-600">
                  View all subscriptions, spending charts, and statistics in one place
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-4">🔔</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Automatic Reminders</h3>
                <p className="text-gray-600">
                  Get notified before your payment due dates
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Save More Money</h3>
                <p className="text-gray-600">
                  Track your monthly expenses and identify unused subscriptions
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
              How It Works
            </h2>
            <p className="text-center text-gray-600 mb-16">
              Just 4 simple steps to manage all your subscriptions
            </p>

            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                    1
                  </div>
                  <div className="text-4xl text-center mb-3">🔐</div>
                  <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Sign Up / Login</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Create a free account or log in with your existing account
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                    2
                  </div>
                  <div className="text-4xl text-center mb-3">➕</div>
                  <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Add Subscription</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Enter the name, price, and due date of your subscription
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                    3
                  </div>
                  <div className="text-4xl text-center mb-3">✏️</div>
                  <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Manage Subscriptions</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Edit, delete, or update your subscription payment status
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                    4
                  </div>
                  <div className="text-4xl text-center mb-3">📈</div>
                  <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Monitor Spending</h3>
                  <p className="text-gray-600 text-center text-sm">
                    View spending charts and gain financial insights
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-20">
              <div className="inline-block">
                <a
                  href="/login"
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
                >
                  <span className="relative z-10">Get Started - Free!</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  ✨ No credit card required • 100% Free
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-24">
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">5000+</div>
                  <div className="text-gray-600">Subscriptions Managed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-600 mb-2">30%</div>
                  <div className="text-gray-600">Savings on Expenses</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer diletakkan di dalam div pembungkus atau setelah konten */}
        <AppFooter />
      </div>
    </>
  );
}