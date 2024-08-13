import { createRouter, createWebHistory } from 'vue-router'
import CheckoutPage from '../views/CheckoutPage.vue'
import SuccessPage from '../views/SuccessPage.vue'


const routes = [
  {
    path: '/:offer_code',
    name: 'CheckoutPage',
    component: CheckoutPage,
  },
   {
  path: '/success',
  name: 'SuccessPage',
  component: SuccessPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
