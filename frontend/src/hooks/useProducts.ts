import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../config";

interface Productsprops {
  productId: number;
  title: string;
  price: number;
  image: string;
  rate: number;
  count: number;
}

interface Receiptfunctionprops {
  totalAmount: number;
  totalItems: number;
}
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
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

  const getCartProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BACKEND_URL + "/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCartProducts(response.data ?? []);
    } catch (e) {
      console.error("Error fetching Products added to Cart", e);
    } finally {
      setLoading(false);
    }
  };

  const deleteCartItems = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("Cart item deleted successfully");
    } catch (e) {
      console.error("Error deleting cart item", e);
    }
  };

  const addQuantity = async (id: number) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/addqty/${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      console.log("Cart item quantity increased successfully");
    } catch (e) {
      console.error("Error increasing cart item quantity", e);
    }
  };

  const getReceipt = async ({
    totalAmount,
    totalItems,
  }: Receiptfunctionprops) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/checkout`,
        {
          totalAmount,
          totalItems,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      console.log("Purchased products successfully");
    } catch (e) {
      console.error("Error purchasing products", e);
    }
  };
  return {
    products,
    cartProducts,
    getProducts,
    loading,
    getProductsByCategory,
    addToCart,
    getCartProducts,
    deleteCartItems,
    addQuantity,
    getReceipt,
  };
}
