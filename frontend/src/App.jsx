import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";
import ProductDetails from "./pages/ProductDetails";
import EditProducts from "./pages/EditProducts";
import User from "./pages/clients/User";
import CreateUser from "./pages/clients/CreateUser";
import UserDetails from "./pages/clients/UserDetails";
import EditUser from "./pages/clients/EditUser";
import CreateOrder from "./pages/order/CreateOrder";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/users" element={<User />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<h1>Orders</h1>} />
        <Route path="/products/new" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<EditProducts />} />
        <Route path="/users/new" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="/users/:id/makeorder" element={<CreateOrder />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
