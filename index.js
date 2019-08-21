const express = require('express')

const server = express()
server.use(express.json())

let projects = [
  {
    id: '1',
    title: 'Novo projeto',
    tasks: []
  },
  {
    id: '2',
    title: 'Novo projeto',
    tasks: []
  },
  {
    id: '3',
    title: 'Novo projeto',
    tasks: []
  }
]
server.post('/projects', (req, res) => {
  projects.push(req.body)
  res.json(req.body)
})

server.get('/projects', (req, res) => {
  res.json(projects)
})

server.put('/projects/:id', (req, res) => {
  const id = req.params.id
  projects.find((project, index) => {
    if (project.id == id) {
      projects[index].title = req.body.title
    }
    console.log('ok')
  })
  res.json(projects)
})
server.delete('/projects/:id', (req, res) => {
  const id = req.params.id
  projects.find((project, index) => {
    if (project.id == id) {
      projects.splice(index, 1)
    }
  })
  res.json(projects)
})

server.post('/projects/:id/tasks', (req, res) => {
  const id = req.params.id
  const newTasks = req.body.tasks
  projects.find((project, index) => {
    if (project.id == id) {
      // console.log(projects[index].tasks.push('s'))
      projects[index].tasks.concat(newTasks)
    }
  })
  res.json(projects)
})

server.listen(3333)
