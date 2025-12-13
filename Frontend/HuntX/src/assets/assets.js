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
