import Dashboard from "./Dashboard";
import { CartProducts } from "./CartProduct";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
