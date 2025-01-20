const { WEBHOOK_VERIFY_TOKEN } = process.env

export const verification = (req, res) => {
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
    console.log('Webhook verified successfully!')
    res.status(200).send(challenge)
  } else {
    res.sendStatus(403)
  }
}

export const root = (req, res) => {
  res.send(
    `<pre>Nothing to see here. Refer to README.md for setup instructions.</pre>`
  )
}
export const hello = (req, res) => {
  res.send(`<pre>Hello! Server is running.</pre>`)
}
