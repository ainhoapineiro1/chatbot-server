import express from 'express'

import {
  verification,
  hello,
  root
} from '../controllers/configuration/index.js'
import { receiveMessage } from '../controllers/messaging/index.js'

const router = express()
router.use(express.json())

// Webhook verification endpoint
router.get('/webhook', verification)

// Default route
router.get('/', root)

// Hello route
router.get('/hello', hello)

router.post('/webhook', receiveMessage)
export default router
