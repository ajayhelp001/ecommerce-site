import { Route, Routes } from "react-router-dom";
import IndexPage from './pages/IndexPage';
import { Provider } from 'react-redux';
import { store } from './ProductStore/store';
import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';
import RootLayout from './pages/RootLayout';
import Signup from './pages/Signup';
import ForgotPassword from './Components/ForgotPassword';
import AllUser from './pages/AllUser';
import Blog from "./pages/Blog";
import Singleblog from "./pages/Singleblog";
import ContactUs from "./pages/ContactUs";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path='/' element={<IndexPage />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:name' element={<SingleProduct />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:name' element={<Singleblog />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/product/:name/checkout' element={<Checkout />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>

        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/all-user' element={<AllUser />} />
      </Routes>
    </Provider>
  );
}

export default App;