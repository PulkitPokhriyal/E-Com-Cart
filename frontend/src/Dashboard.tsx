import { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { useProducts } from "./hooks/useProducts";
import { AuthModal } from "./Auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { getProducts, products, loading, getProductsByCategory } =
    useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dashboard mounted");
    getProducts();
  }, []);
  const username = localStorage.getItem("username");
  return (
    <div className="mx-7 my-6">
      <div className="flex items-center justify-between">
        <p
          className="text-3xl font-bold onhover: cursor-pointer"
          onClick={() => getProducts()}
        >
          E-Com Cart
        </p>
        <Input placeholder="Search products" size="lg" />
        <div className="flex gap-8">
          {username ? (
            <div className="flex gap-4 items-center">
              <p className="font-semibold text-xl">{username}</p>
              <Button text="Log out" variant="danger" size="sm" />
            </div>
          ) : (
            <Button
              text="Sign in"
              variant="primary"
              size="sm"
              onClick={() => {
                setModalOpen(true);
              }}
            />
          )}
          <button
            className="onhover: cursor-pointer"
            onClick={() => {
              navigate("/cartproducts");
            }}
          >
            <ShoppingCartIcon fontSize="large" />
          </button>
        </div>
      </div>
      <div className="flex gap-10 mt-6 font-semibold [&>*]:cursor-pointer pb-6 ">
        <button
          onClick={() => {
            getProductsByCategory("electronics");
          }}
        >
          Electronics
        </button>
        <button
          onClick={() => {
            getProductsByCategory("jewelery");
          }}
        >
          Jewelery
        </button>
        <button
          onClick={() => {
            getProductsByCategory("men's clothing");
          }}
        >
          Men's Clothing
        </button>
        <button
          onClick={() => {
            getProductsByCategory("women's clothing");
          }}
        >
          Women's Clothing
        </button>
      </div>
      <div>
        {loading ? (
          <p className="text-center font-bold text-3xl text-gray-400">
            Loading Products....
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 sm:gap-6">
            {products.map(({ id, title, price, image, rating }) => (
              <Card
                key={id}
                productId={id}
                title={title}
                price={price}
                image={image}
                rate={rating.rate}
                count={rating.count}
              />
            ))}
          </div>
        )}
      </div>
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
export default Dashboard;
