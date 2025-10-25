const express = require('express')
const path = require('path')
const Stripe = require('stripe')

const stripeSecret = process.env.STRIPE_SECRET || 'your Secret key on stripe'
const stripe = Stripe(stripeSecret)

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount = 1000, currency = 'usd' } = req.body
    const pi = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card']
    })
    res.json({ clientSecret: pi.client_secret })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
