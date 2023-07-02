import CreateProduct from '@/Components/CreateProduct/CreateProduct';
import ProductList from '@/Components/ProductList/ProductList';
import EditProduct from '@/Components/EditProduct/EditProduct';
import Users from '@/Components/Users/Users';
import Payments from '@/Components/Payments/Payments';

import {
  Routes,
  BrowserRouter,
  Route,
  Outlet,
  NavLink,
} from 'react-router-dom';

function HomeLayout() {
  return (
    <>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">상품 리스트</NavLink>
        <NavLink to="/users">회원 리스트</NavLink>
        <NavLink to="/payments">물건 구매내역</NavLink>
      </header>
      <Outlet />
    </>
  );
}

export default function RoutePage() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<ProductList />} />
            <Route path="/add" element={<CreateProduct />} />
            <Route path="/edit/:productNo" element={<EditProduct />} />
            <Route path="/users" element={<Users />} />
            <Route path="/payments" element={<Payments />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
