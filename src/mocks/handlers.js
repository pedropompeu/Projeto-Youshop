import { rest } from 'msw';
import { handlers as myHandlers } from './handlers.js';

export const handlers = [ 
    rest.get('https://api.deepspacestore.com/offers/:offerCode', (req, res, ctx) => {
        return res(
          ctx.json({
            name: 'Miniature Starship',
            price: 500,
            items: ['Miniature of Enterprise'],
            paymentMethods: ['Boleto', 'Credit Card', 'Pix'],
            images: ['url-to-image']
          })
        );
      }),

      rest.post('https://api.deepspacestore.com/offers/:offerCode/create_order', (req, res, ctx) => {
        const { cpf } = req.body;
        if (cpf === '000.000.000-00') {
          return res(
            ctx.status(400),
            ctx.json({ error: 'Invalid CPF' })
          );
        }
        return res(
          ctx.status(200),
          ctx.json({
            orderId: '12345',
            status: 'Success',
            paymentMethod: req.body.paymentMethod
          })
        );
      }),

      ...myHandlers
]
