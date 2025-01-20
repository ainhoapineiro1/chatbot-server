import axios from 'axios'
import { getUrl } from '../../utils/index.js'

const { GRAPH_API_TOKEN } = process.env

export const receiveMessage = async (req, res) => {
  console.log('Incoming webhook message:', JSON.stringify(req.body, null, 2))

  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

  if (message?.type === 'image') {
    const businessPhoneNumberId =
      req.body.entry[0].changes[0].value.metadata.phone_number_id

    try {
      // Send a reply message
      await axios({
        method: 'POST',
        url: getUrl(businessPhoneNumberId),
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`
        },
        data: {
          messaging_product: 'whatsapp',
          to: message.from,
          text: { body: 'We will process your image shortly' }
        }
      })

      // Mark the message as read
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v18.0/${businessPhoneNumberId}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`
        },
        data: {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: message.id
        }
      })
    } catch (error) {
      console.error(
        'Error handling message:',
        error.response?.data || error.message
      )
    }
  }
  if (message?.type === 'text') {
    const businessPhoneNumberId =
      req.body.entry[0].changes[0].value.metadata.phone_number_id

    try {
      // Send a reply message
      await axios({
        method: 'POST',
        url: getUrl(businessPhoneNumberId),
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`
        },
        data: {
          messaging_product: 'whatsapp',
          to: message.from,
          text: { body: 'Send an image for Valid to verify its authenticity.' }
        }
      })

      // Mark the message as read
      await axios({
        method: 'POST',
        url: getUrl(businessPhoneNumberId),
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`
        },
        data: {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: message.id
        }
      })
    } catch (error) {
      console.error(
        'Error handling message:',
        error.response?.data || error.message
      )
    }
  }

  res.sendStatus(200)
}
