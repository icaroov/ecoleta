import express from 'express'
import knex from './database/connection'

const routes = express.Router()

routes.get('/items', async (req, res) => {
  const items = await knex('items').select('*')

  // serialização da tabela "items"
  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }
  })

  return res.json(serializedItems)
})

routes.post('/points', async (req, res) => {
  const { 
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
   } = req.body

   // transaction
   const trx = await knex.transaction()

   const insertedIds = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf
   })

   const point_id = insertedIds[0]

   // relacionar com a tabela "items"
   const pointItems = items.map((item_id: number) => {
     return {
       item_id,
       point_id,
     }
   })

   await trx('point_items').insert(pointItems)


   return res.json({ succes: true })

})

export default routes