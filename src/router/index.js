import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import Assistant from '../views/Assistant.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/assistant',
    name: 'Assistant',
    component: Assistant
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router