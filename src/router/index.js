import { createRouter, createWebHistory } from 'vue-router'
import CheckoutPage from '../views/CheckoutPage.vue'
import SuccessPage from '../views/SuccessPage.vue'
import ProductPage from '@/views/ProductPage.vue'


const routes = [
  {
    path: '/',
    name: 'ProductPage',
    component: ProductPage,
  },

  {
    path: '/checkout',
    name: 'CheckoutPage',
    component: CheckoutPage,
  },

  {
    path: '/success',
    name: 'SuccessPage',
    component: SuccessPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
