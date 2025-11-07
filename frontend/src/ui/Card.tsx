import StarIcon from "@mui/icons-material/Star";
import { useProducts } from "../hooks/useProducts";
interface Cardprops {
  productId: number;
  title: string;
  price: number;
  image: string;
  rate: number;
  count: number;
}

export const Card = (props: Cardprops) => {
  const { productId, title, price, image, rate, count } = props;
  const { addToCart } = useProducts();
  return (
    <div className="w-80 bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 overflow-hidden">
      <div className="relative h-64 bg-gray-100 flex items-center justify-center p-4">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <StarIcon className="text-yellow-500" />
            <span className="ml-1 text-sm font-medium text-gray-700">
              {rate}
            </span>
          </div>
          <span className="text-sm text-gray-500">({count} reviews)</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-gray-900">
            ₹{Math.round(price * 80.7)}
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 active:scale-95"
            onClick={() => {
              addToCart({ productId, title, price, image, rate, count });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
