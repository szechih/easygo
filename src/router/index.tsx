import { lazy } from 'react'
import { RouteProps } from '../types'
import Category from '../containers/Category'
// 用路由懒加载优化加载性能

const Guide = lazy(() => import('../containers/Guide'))
const Login = lazy(() => import('../containers/Login'))
const Home  = lazy(() => import('../containers/Home'))
const NotFound = lazy(() => import('../containers/NotFound')) 
const Search = lazy(() => import('../containers/Search')) 
const SearchList = lazy(() => import('../containers/SearchList'))
const Detail = lazy(() => import('../containers/Detail'))
const Cart = lazy(() => import('../containers/Cart'))

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
  {
    path: '/search/:shopId',
    title: '搜索',
    element: <Search/> 
  },
  {
    path: '/searchlist/:shopId/:keyword',
    title: '搜索列表',
    element: <SearchList/> 
  },
  {
    path: '/detail/:id',
    title: '商品详情',
    element: <Detail/> 
  },
  {
    path: '/category/',
    title: '分类',
    element: <Category/> 
  },
  {
    path: '/cart/',
    title: '购物车',
    element: <Cart/> 
  },
  { path: '*', title: '404页', element: <NotFound/>}
]
export default constantRoutes
