const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggermiddleware')

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Content111111111',
    date: '2019-05-11T17:30:31.298Z',
    important: false
  },
  {
    id: 2,
    content: 'Content2',
    date: '2019-05-12T17:30:31.298Z',
    important: true
  },
  {
    id: 3,
    content: 'Content3',
    date: '2019-05-13T17:30:31.298Z',
    important: false
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find((note) => note.id.toString() === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).send('<h2>No tenemos esa nota</h2>')
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter((note) => note.id.toString() !== id)
  response.status(204).end()
})

app.post('/api/notes/', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    response.status(400).json({
      error: 'note.content falta'
    })
  } else {
    const ids = notes.map((note) => note.id)
    const idMax = Math.max(...ids)
    console.log(typeof note.important !== 'undefined' ? note.important : false)

    const newNote = {
      id: idMax + 1,
      content: note.content,
      date: new Date().toISOString(),
      important: typeof note.important === 'undefined' ? false : note.important
    }
    notes = [...notes, newNote]
    response.status(201).json(newNote)
  }
})

app.use((request, response) => {
  console.log('ultima')
  response.status(404).json({
    error: 'pagina no encontrada'
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
