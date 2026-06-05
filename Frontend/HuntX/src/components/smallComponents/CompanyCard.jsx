import { COMPANY_API_END_POINT } from '@/constants/constant'
import axios from 'axios'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CompanyCard = ({ company }) => {
  const { adminJobs } = useSelector(store => store.job)
  const jobs = adminJobs.filter(j => j?.company?._id === company._id)
  const navigate = useNavigate()

  const deleteHandler = async (id) => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/delete/${id}`,
        {},
        { withCredentials: true }
      )

      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl p-2 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-12 h-12 overflow-hidden rounded-xl bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
          {company ? (
            <img
              className="w-full h-full object-cover"
              src={company?.companyProfile?.companyLogo}
              alt=""
            />
          ) : (
            <h6>TC</h6>
          )}
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900">
            {company?.name}
          </h2>

          <p className="text-sm text-gray-500">
            {company?.industry}
          </p>

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

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-4 border-t">
        <p className="text-blue-600 font-medium text-sm">
          {jobs?.length} active jobs
        </p>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate(`job/${company._id}`)}
            className="flex-1 sm:flex-none px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 transition"
          >
            Edit
          </button>

          <button
            onClick={() => navigate(`jobs/${company._id}`)}
            className="flex-1 sm:flex-none px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 transition"
          >
            View Jobs
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <BsThreeDotsVertical className="cursor-pointer" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-3 mt-4">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="bg-red-100 text-red-600 justify-center"
                  onClick={() => deleteHandler(company._id)}
                >
                  delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard