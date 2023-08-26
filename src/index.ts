import cors from 'cors'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import router from './routes'

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router())

const server = http.createServer(app)
const port = process.env.PORT || 3030

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
