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
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="mypage"
            element={<MyPage />}
          />
          <Route
            path="payment"
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
            // path="/admin/Home"
            index
            element={<Admin />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App