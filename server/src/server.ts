import express from 'express';

const app = express()

app.get('/users', (req, res) => {
  return res.json({ hello: 'rocketseat, icaro' })
})

app.listen(3333, () => {
  console.log('🟢 Server is running...')
})