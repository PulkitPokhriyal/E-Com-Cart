import { useEffect } from "react";
import { useProducts } from "./hooks/useProducts";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "./ui/Button.tsx";
export const CartProducts = () => {
  const {
    getCartProducts,
    cartProducts,
    loading,
    deleteCartItems,
    addQuantity,
  } = useProducts();
  useEffect(() => {
    getCartProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteCartItems(id);
    await getCartProducts();
  };
  const handleAdd = async (id: number) => {
    await addQuantity(id);
    await getCartProducts();
  };
  const totalItems =
    cartProducts?.reduce((acc, item) => acc + item.qty, 0) || 0;
  const totalPrice =
    cartProducts?.reduce((acc, item) => acc + item.qty * item.price, 0) || 0;
  return (
    <div className="mx-8 mt-4">
      <div className="flex justify-between">
        <p className="font-semibold text-4xl pb-2">Shopping Cart</p>
      </div>
      <p className="text-gray-600 text-right">Price</p>
      <hr className="mt-2 border-gray-300" />
      <div>
        {loading ? (
          <p className="text-center font-bold text-3xl text-gray-400">
            Loading Products....
          </p>
        ) : (
          <div>
            {cartProducts?.map(
              ({ productId, title, price, image, qty, rate, count }) => (
                <div
                  className="flex gap-6 py-6 border-b border-gray-300"
                  key={productId}
                >
                  <div className="w-32 h-32 flex items-center justify-center">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start">
                      <p className="font-semibold text-lg">{title}</p>
                      <p className="ml-auto font-semibold"> ₹{price * qty}</p>
                    </div>
                    <div className="flex items-center gap-3 mb-3 mt-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100 hover: cursor-pointer"
                        onClick={() => {
                          handleDelete(productId);
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </button>

                      <span className="text-lg font-semibold">{qty}</span>

                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100 hover: cursor-pointer"
                        onClick={() => {
                          handleAdd(productId);
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <StarIcon className="text-yellow-500" />
                        <span className="ml-1 text-sm font-medium text-gray-700">
                          {rate}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({count} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )}
            <div className="mt-6 p-4 border-t border-gray-300 flex justify-between font-semibold text-lg">
              <p>Subtotal ({totalItems} items):</p>
              <p>₹{totalPrice}</p>
            </div>
            <div className="text-right">
              <Button text="Checkout" variant="secondary" size="sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
