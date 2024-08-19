import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet(/\/offers\/.+/).reply(200, {
  name: 'Miniatura da Enterprise',
  description: 'Uma réplica detalhada da famosa nave espacial. Feita com materiais de alta qualidade.',
  specifications: 'Dimensões: 30x15x15 cm, Peso: 1.2kg',
  materials: 'Resina e Metal',
  price: 500.00, 
  imageUrl: require('@/assets/images/MiniaturaEnterprise.png'),
});

mock.onPost(/\/offers\/.+\/create_order/).reply(200, {
  orderId: '12345',
});

mock.onGet(/\/orders\/\d+/).reply(200, {
  orderId: '12345',
  paymentMethod: 'Credit Card',
  name: 'John Doe',
  email: 'email@email.com',
  cpf: "xxx.xxx.xxx-xx",
  address: '123 Main St, Springfield - IL',
  cep: "98998772",
});

export default mock;
