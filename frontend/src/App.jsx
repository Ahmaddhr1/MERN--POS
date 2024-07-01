import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/users" element={<h1>Users</h1>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/orders" element={<h1>Orders</h1>} />
        <Route path="/products/new" element={<CreateProduct/>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
