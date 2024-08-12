// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.deepspacestore.com/orders/:orderId', (req, res, ctx) => {
    const { orderId } = req.params;

    return res(
      ctx.json({
        orderId,
        paymentMethod: 'Credit Card',
        userName: 'John Doe', 
        userAddress: '123 Main St, Springfield' //
      })
    );
  }),
];
