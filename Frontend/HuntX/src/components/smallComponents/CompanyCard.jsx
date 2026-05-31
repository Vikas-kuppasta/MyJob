import { h6 } from 'framer-motion/client'
import React from 'react'

const CompanyCard = ({company}) => {
  return (
    <div className="w-full max-w-3xl bg-white  rounded-xl p-2 shadow-sm">
       
      {/* Top Section */}
      <div className="flex items-start gap-4">
        
        {/* Logo */}
        <div className="w-12 h-12 overflow-hidden rounded-xl bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
          {company ? <img className='' src={company?.companyProfile?.companyLogo} alt="" /> :<h6>TC</h6>}
        </div>

        {/* Company Info */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900">
            {company?.name}
          </h2>

          <p className="text-sm text-gray-500">
            {company?.industry}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md">
              {company?.location}
            </span>

            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md">
              {company?.companySize} employees
            </span>

            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md">
              Founded {company?.foundedYear}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t">
        
        <p className="text-blue-600 font-medium text-sm">
          4 active jobs
        </p>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 transition">
            Edit
          </button>

          <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 transition">
            View Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard