import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/index.js'

dotenv.config() // Load environment variables

const app = express()
app.use(express.json())

// Environment variables
const { PORT } = process.env

app.use('/routes', routes)

// Start the server
app.listen(PORT || 3001, () => {
  console.log(`Server is listening on port ${PORT || 3001}`)
})
