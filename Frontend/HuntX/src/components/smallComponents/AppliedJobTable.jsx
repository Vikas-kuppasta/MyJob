import React from 'react'
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table"
import {Button} from '../ui/button'
const AppliedJobTable = ({appliedJobs}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };
  return (
    <div>
  <Table >
  
  <TableHeader  >
    <TableRow >
      <TableHead className="text-center">Date</TableHead>
      <TableHead className="text-center">Job Role</TableHead>
      <TableHead className="text-center">Company</TableHead>
      <TableHead className="text-center">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    
        {
            appliedJobs.map((data,index)=>(
                <>
              <TableRow className={`text-center`} key={index}>
                <TableCell className="font-medium">{new Date(data?.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{data?.job?.title}</TableCell>
                <TableCell>
                  <div className='flex justify-center items-center gap-1'>
                    <img src={data?.job?.company?.companyProfile?.companyLogo} className='w-10 h-10 rounded-full overflow-hidden' alt="" />
                    <h3 className='w-18'>{data?.job?.company?.name}</h3>
                  </div>
                  </TableCell>
                <TableCell className=""><Button  className={getStatusColor(data?.status)} >{data?.status}</Button></TableCell>
              </TableRow> 
                </>
            ))
        }
    
  </TableBody>
</Table>
    </div>
  )
}

export default AppliedJobTable