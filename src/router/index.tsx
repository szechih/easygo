import { lazy } from 'react'
import { RouteProps } from '../types'
// 用路由懒加载优化加载性能

const Guide = lazy(() => import('../containers/Guide'))
const Login = lazy(() => import('../containers/Login'))
const Home  = lazy(() => import('../containers/Home'))
const NotFound = lazy(() => import('../containers/NotFound')) 

const constantRoutes:RouteProps[] = [ 
  {
    path: '/',
    title: '欢迎页',
    element: <Guide/>,
  },
  {
    path: '/login',
    title: '登录页',
    element: <Login/> 
  },
  {
    path: '/home',
    title: '首页',
    element: <Home/> 
  },
  { path: '*', title: '404页', element: <NotFound/>}
]
export default constantRoutes
