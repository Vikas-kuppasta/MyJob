import { FaArrowUpRightDots } from "react-icons/fa6";
import { RiBookShelfLine } from "react-icons/ri";
import { TbHandClick } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
const random = (min, max) => {
  return Math.random() * (max - min) + min
}

const createFloat = () => ({
  x: [0, random(-25, 25), 0],
  y: [0, random(-25, -40), 0],
  transition: {
    duration: random(8, 14),
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
})

export const animatedCards = [
  { id: 1, title: "Java Developer", float: createFloat() },
  { id: 2, title: "React Developer", float: createFloat() },
  { id: 3, title: "Backend Engineer", float: createFloat() },
  { id: 4, title: "Frontend Engineer", float: createFloat() },
  { id: 5, title: "Full Stack Developer", float: createFloat() },
  { id: 6, title: "Mobile App Developer", float: createFloat() },
  { id: 7, title: "UI/UX Designer", float: createFloat() },
  { id: 8, title: "DevOps Engineer", float: createFloat() },

  // Non-tech
  { id: 9, title: "Marketing Manager", float: createFloat() },
  { id: 10, title: "Content Writer", float: createFloat() },
  { id: 11, title: "Digital Marketer", float: createFloat() },
  { id: 12, title: "HR Manager", float: createFloat() },
  { id: 13, title: "Business Analyst", float: createFloat() },
  { id: 14, title: "Sales Executive", float: createFloat() },
  { id: 15, title: "Operations Manager", float: createFloat() },
]
export const featuredCards=[
  {
    id:1,
    title:"Got talent?",
    subtitle:"Why job seekers love us",
    title1:"Connect directly with founders at top startups - no third party recruiters allowed.",
    title2:"Everything you need to know, all upfront. View salary, stock options, and more before applying.",
    title3:"Say goodbye to cover letters - your profile is all you need. One click to apply and you're done.",
    title4:"Unique jobs at startups and tech companies you can’t find anywhere else.",
    image1:FaArrowUpRightDots,
    image2:RiBookShelfLine,
    image3:TbHandClick,
    image4:BsStars,
    bgcolor:"bg-white",
  },
  {
    id:2,
    title:"Need talent?",
    subtitle:"Why recruiters love us",
    title1:"Tap into a community of 10M+ engaged, startup-ready candidates.",
    title2:"Everything you need to kickstart your recruiting — set up job posts, company branding, and HR tools within 10 minutes, all for free.",
    title3:"A free applicant tracking system, or free integration with any ATS you may already use.",
    title4:"Let us handle the heavy-lifting with RecruiterCloud. Our new AI-Recruiter scans 500M+ candidates, filters it down based on your unique calibration, and schedules your favorites on your calendar in a matter of days.",
    image1:FaArrowUpRightDots,
    image2:RiBookShelfLine,
    image3:TbHandClick,
    image4:BsStars,
    bgcolor:"bg-blue-100",
  },

]
