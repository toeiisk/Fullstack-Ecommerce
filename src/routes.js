import React from 'react';
import { Navigate } from 'react-router-dom';

//Components
import Navbar from './Components/Navbar/index';
import CustomerBar from './Components/Sidebar/index';

//Pages
import Home from './Pages/Home';
import Product from './Pages/Product/index';
import ProductDetail from './Pages/Product/Productdetail';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './Pages/Cart/index';
import Checkout from './Pages/Checkout/index';
import Payment from './Pages/Payment/index';
import Promotion from './Pages/Promotion/index';

//Customer
import Customer from './Pages/Customer/index';
import CustomerOrders from './Pages/Customer/CustomerOrders';
import OrderDetail from './Pages/Customer/Orderdetail';
import EditProfile from './Pages/Customer/EditProfile';

//Admin
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import Products from './Pages/Admin/Products/Product';
import CreateProduct from './Pages/Admin/Products/Create';
import Promotions from './Pages/Admin/Promotion/Promotion';
import CreatePromotion from './Pages/Admin/Promotion/Create';
import Orders from './Pages/Admin/Orders/Order';
import DetailProduct from './Pages/Admin/Products/Detail';
import DetailPromotion from './Pages/Admin/Promotion/Detail';
import DetailOrder from './Pages/Admin/Orders/Detail' 

const routes = (user) => [
	{
		path: '/',
		element: !user?.isStaff ? <Navbar /> : <Navigate to="/login" />,
		children: [
			{ path: 'product', element: <Product /> },
			{ path: 'product/:slug', element: <ProductDetail /> },
			{ path: 'home', element: <Home /> },
			{ path: 'cart', element: <Cart /> },
			{ path: 'checkout', element: <Checkout /> },
			{ path: 'payment', element: <Payment /> },
			{ path: 'promotion', element: <Promotion /> },
			{ path: '/', element: <Navigate to="home" /> },
		],
	},
	{
		path: '/',
		element: !user?.isStaff ? <CustomerBar /> : <Navigate to="/login" />,
		children: [
			{ path: '/customer', element: <Customer /> },
			{ path: '/customer/editprofile', element: <EditProfile /> },
			{ path: '/customer/order', element: <CustomerOrders /> },
			{ path: '/customer/order/:id', element: <OrderDetail /> },
		],
	},
	{
		path: '/',
		element: user?.isStaff && user !== null ? <Navbar /> : <Navigate to="/login" />,
		children: [
			{ path: '/', element: <Navigate to="/admin" /> },
			{ path: '/admin', element: <Dashboard /> },
			{ path: '/admin/products', element: <Products /> },
			{ path: '/admin/product/:id', element: <DetailProduct /> },
			{ path: '/admin/product/create', element: <CreateProduct /> },
			{ path: '/admin/promotions', element: <Promotions /> },
			{ path: '/admin/promotion/create', element: <CreatePromotion /> },
			{ path: '/admin/promotion/:id', element: <DetailPromotion /> },
			{ path: '/admin/orders', element: <Orders /> },
			{ path: '/admin/orders/detail/:id', element: <DetailOrder />}
		],
	},
	{
		path: '/',
		element: user === null ? <Navbar /> : user?.isStaff ? <Navigate to="/admin" /> : <Navigate to="/home" />,
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
			{ path: '/', element: <Navigate to="/home" /> },
		],
	},
];

export default routes;
