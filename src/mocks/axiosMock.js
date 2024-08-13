import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });


mock.onPost(/\/offers\/.+\/create_order/).reply(200, {
  orderId: '12345',
});


mock.onGet(/\/orders\/\d+/).reply(200, {
  orderId: '12345',
  paymentMethod: 'Credit Card',
  name: 'John Doe',
  address: '123 Main St, Springfield - IL',
});

export default mock;
