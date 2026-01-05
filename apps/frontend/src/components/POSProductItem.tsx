interface POSProductItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string | null;
  };
  onAddToCart: (product: { id: string; name: string; price: number }) => void;
}

export function POSProductItem({ product, onAddToCart }: POSProductItemProps) {
  return (
    <button
      onClick={() => onAddToCart(product)}
      className="border border-gray-200 rounded-xl hover:border-primary hover:bg-primary-pale text-left flex overflow-hidden h-full"
    >
      {product.image && (
        <div className="w-20 h-20 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div className="font-semibold text-gray-900 text-base line-clamp-2">
          {product.name}
        </div>
        <div className="text-xl font-black text-primary">
          ₱{product.price.toFixed(2)}
        </div>
      </div>
    </button>
  );
}

export default POSProductItem;
