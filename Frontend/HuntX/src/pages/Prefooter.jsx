import React from 'react'

const Prefooter = () => {
  return (
    <>
       <main className="bg-gray-50 py-16 px-6">
      <div className="md:max-w-7xl mx-auto space-y-20">

        {/* ================= Section 1: Why Choose Us ================= */}
        <div className="text-center md:max-w-3xl mx-auto">
          <h2 className="text-4xl max-sm:text-3xl font-bold text-gray-900 mb-4">
            Why Choose us ?
          </h2>
          <p className="text-gray-600 mb-10">
            Everything you need to find the right job or the right candidate — in one place.
          </p>

          <ul className="grid gap-4 text-left">
            {[
              "Verified and regularly updated job listings",
              "Simple and fast application process",
              "Direct connection between employers and job seekers",
              "Opportunities across multiple industries and experience levels",
              "Secure platform for profiles and applications",
            ].map((point, index) => (
              <li
                key={index}
                className="flex  items-center gap-3 bg-white p-4 rounded-xl shadow-sm"
              >
                <span className=" h-2 w-2 rounded-full bg-indigo-600"></span>
                <span className="max-sm:w-55 text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= Section 2: Stats ================= */}
        <div className="bg-white rounded-2xl shadow-md py-12 px-6">
          <h3 className="text-2xl font-semibold text-center text-gray-900 mb-10">
            Trusted by Job Seekers and Employers
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">10,000+</p>
              <p className="text-gray-600 mt-1">Active Job Seekers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">500+</p>
              <p className="text-gray-600 mt-1">Companies Hiring</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">1,200+</p>
              <p className="text-gray-600 mt-1">Verified Job Listings</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">98%</p>
              <p className="text-gray-600 mt-1">User Satisfaction</p>
            </div>
          </div>
        </div>

        {/* ================= Section 3: CTA ================= */}
        <div className="bg-blue-500 rounded-2xl py-14 px-6 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Start Your Career Journey Today
          </h3>
          <p className="max-w-2xl mx-auto text-indigo-100 mb-8">
            Whether you are looking for your first job or searching for the right talent,
            our platform makes the process simple, fast, and reliable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition">
              Find Jobs Now
            </button>
            <button className="bg-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-900 transition">
              Post a Job
            </button>
          </div>
        </div>

      </div>
    </main>
    </>
  )
}

export default Prefooter