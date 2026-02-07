import React from 'react'
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table"
import {Button} from '../ui/button'
const AppliedJobTable = () => {
  return (
    <div>
        <Table>
  
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Date</TableHead>
      <TableHead>Job Role</TableHead>
      <TableHead>Company</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    
        {
            [1,2,3,4].map((_,index)=>(
                <>
              <TableRow key={index}>
                <TableCell className="font-medium">17-04-26</TableCell>
                <TableCell>Devops Engineer</TableCell>
                <TableCell>Google</TableCell>
                <TableCell className="text-right"><Button  className=" bg-blue-500 hover:bg-blue-600 text-white" >Selected</Button></TableCell>
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