const express = require('express')

const server = express()

server.use(express.json())

let projects = [
  { id: '1', title: 'Novo projeto', tasks: [] },
  { id: '2', title: 'Novo projeto', tasks: [] },
  { id: '3', title: 'Novo projeto', tasks: [] }
]

function checkProjectExist(req, res, next) {
  projects.find((project, index) => {
    if (project.id == req.params.id) {
      req.indexProject = index
    }
  })
  console.log(req.indexProject)
  if (!!req.indexProject) {
    return next()
  }
  res.json({ error: 'project not found' })
}

server.post('/projects', (req, res) => {
  projects.push(req.body)
  res.json(projects)
})

server.get('/projects', (req, res) => {
  res.json(projects)
})

server.put('/projects/:id', checkProjectExist, (req, res) => {
  const { title } = req.body
  // console.log(title)
  // console.log(req.indexProject)
  projects[req.indexProject].title = title
  res.json(projects)
})
server.get('/projects/:id', (req, res) => {
  res.json(projects)
})

server.listen(3000)
