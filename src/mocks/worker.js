import { setupWorker, rest } from 'msw'

export const worker = setupWorker(
  rest.post('https://api.deepspacestore.com/offers/:offerCode/create_order', (req, res, ctx) => {
    const { cpf } = req.body

    if (cpf === '000.000.000-00') {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Invalid CPF' })
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        orderId: '12345',
        status: 'Success'
      })
    )
  })
)
