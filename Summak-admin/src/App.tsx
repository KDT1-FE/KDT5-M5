import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'
const Layout = loadable(() => import('./components/layout'))
const Home = loadable(() => import('./pages/Home'))
const Users = loadable(() => import('./pages/Users'))
const Products = loadable(() => import('./pages/Products'))

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/products' element={<Products />}></Route>
      </Route>
    </Routes>
  )
}

export default App
