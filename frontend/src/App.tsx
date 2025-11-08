import Dashboard from "./components/Dashboard";
import { CartProducts } from "./components/CartProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cartproducts" element={<CartProducts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
