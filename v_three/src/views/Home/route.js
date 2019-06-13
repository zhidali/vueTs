
export default [
  {
    path: '/',
    name: 'first',
    component: () => import('./first')
  },
  {
    path: '/second',
    name: 'second',
    component: () => import('./second')
  }
]