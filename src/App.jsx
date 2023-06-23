import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import MyPage from './pages/MyPage'
import Payment from './pages/Payment'
import Sign from './pages/Sign'
import Admin from './pages/Admin'
import AdminHeader from './components/AdminHeader'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductDetail from './pages/productDetail'
import UserManagement from './pages/Admin/UserManagement'
import ProductManagement from './pages/Admin/ProductManagement'
import ProductAdd from './pages/Admin/ProductAdd'
import Product from './pages/Admin/Product'
import GetOrderList from './pages/MyPage/GetOrderList'
import GetOrderCancelList from './pages/MyPage/GetOrderCancelList'
import ChangeMyInfo from './pages/MyPage/ChangeMyInfo'
import MyInfo from './components/myPage/MyInfo'
import MyMenu from './components/myPage/MyMenu'
import OrderDetailItem from './components/myPage/getOrderList/OrderDetailItem'

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  )
}

const MyPageLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <MyMenu />
      <div>
        <MyInfo />
        <Outlet />
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Layout />}>
          <Route
            index
            element={<Home />}
          />
          <Route
            path="/product/:category/:productId"
            element={<ProductDetail />}
          />
          <Route
            path="cart"
            element={<Cart />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="mypage"
            element={<MyPageLayout />}>
            <Route
              index
              element={<MyPage />}
            />
            <Route
              path="getOrderList"
              element={<GetOrderList />}
            />
            <Route
              path="getOrderList/:detailId"
              element={<OrderDetailItem />}
            />
            <Route
              path="getOrderCancelList"
              element={<GetOrderCancelList />}
            />
            <Route
              path="changeMyInfo"
              element={<ChangeMyInfo />}
            />
          </Route>
          <Route
            path="payment/:category/:productId"
            element={<Payment />}
          />
          <Route
            path="sign"
            element={<Sign />}
          />
        </Route>

        <Route
          path="/admin"
          element={<AdminLayout />}>
          <Route
            index
            element={<Admin />}
          />
          <Route
            path="user"
            element={<UserManagement />}
          />
          <Route
            path="productAdd"
            element={<ProductAdd />}
          />
          <Route
            path="products"
            element={<ProductManagement />}
          />
          <Route
            path="product/:productId"
            element={<Product />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
