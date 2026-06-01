import React from 'react'
import logo from '../assets/logo1.png'
import {Link, useNavigate} from 'react-router-dom'
const Footer = () => {
  const navigate = useNavigate();
  return (
<>
      <footer className="bg-white max-sm:hidden border-t border-gray-300 border-solid text-black pt-14 pb-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ================= Top Section ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>

            <img onClick={()=>{navigate("");window.scrollTo(0,0)}} src={logo} className='w-40 cursor-pointer' alt="" />
            <p className="text-sm leading-relaxed text-black">
              Connecting job seekers with trusted employers.
              Find opportunities, apply with ease, and grow your career with confidence.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="text-lg font-semibold text-blue-500 mb-4">
              For Job Seekers
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Browse Jobs</li>
              <li className="hover:text-white cursor-pointer">Create Profile</li>
              <li className="hover:text-white cursor-pointer">Job Alerts</li>
              <li className="hover:text-white cursor-pointer">Career Tips</li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-lg font-semibold text-blue-500 mb-4">
              For Employers
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Post a Job</li>
              <li className="hover:text-white cursor-pointer">Search Candidates</li>
              <li className="hover:text-white cursor-pointer">Employer Dashboard</li>
              <li className="hover:text-white cursor-pointer">Hiring Solutions</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-blue-500 mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">FAQs</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* ================= Bottom Section ================= */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-black">
          <p>
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">LinkedIn</span>
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">Instagram</span>
          </div>
        </div>

      </div>
    </footer>
</>
  )
}

export default Footer