import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config";

interface Productsprops {
  productId: number;
  title: string;
  price: number;
  image: string;
  rate: number;
  count: number;
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (e) {
      console.error("Caught Error", e);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`,
      );
      setProducts(response.data);
    } catch (e) {
      console.error("Caught Error", e);
    }
  };

  const addToCart = async ({
    productId,
    title,
    price,
    image,
    rate,
    count,
  }: Productsprops) => {
    try {
      await axios.post(
        BACKEND_URL + "/api/v1/addtocart",
        {
          productId,
          title,
          price,
          image,
          rate,
          count,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      console.log("Product successfully added to cart");
    } catch (e) {
      console.error("Error adding Product to Cart", e);
    }
  };

  return {
    products,
    getProducts,
    loading,
    getProductsByCategory,
    addToCart,
  };
}
