import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock products for demo
  const products = [
    { id: "1", name: "Coca Cola 1.5L", price: 65 },
    { id: "2", name: "Marlboro Red", price: 150 },
    { id: "3", name: "Lucky Me Pancit Canton", price: 15 },
    { id: "4", name: "Alaska Milk 1L", price: 95 },
    { id: "5", name: "Century Tuna Flakes", price: 42 },
    { id: "6", name: "Nestle Milo 1kg", price: 385 },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: { id: string; name: string; price: number }) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.12; // 12% VAT
  const total = subtotal + tax;

  return (
    <div className="h-full flex flex-col">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold text-primary">Point of Sale</h1>
        <p className="text-sm text-gray-600">
          Process customer transactions and manage orders.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-hidden h-full">
        {/* Products Section */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <div className="mb-3 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="border border-gray-200 rounded-xl hover:border-primary hover:bg-primary-pale text-left flex overflow-hidden h-full"
                >
                  <div className="w-20 h-20 bg-primary-lighter flex items-center justify-center">
                    <div className="text-2xl"></div>
                  </div>
                  <div className="p-3 flex flex-col justify-between flex-1">
                    <div className="font-semibold text-gray-900 text-xs line-clamp-2">
                      {product.name}
                    </div>
                    <div className="text-xl font-black text-primary">
                      ₱{product.price.toFixed(2)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Section */}
        <div className="flex flex-col bg-gray-50 rounded-xl border border-gray-200 min-h-0 h-full">
          <h2 className="text-lg font-bold p-4 pb-3">Cart</h2>

          <div className="flex-1 overflow-y-auto min-h-0">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Cart is empty
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="text-left p-3 font-semibold">Item</th>
                    <th className="text-right p-3 font-semibold">Unit Price</th>
                    <th className="text-center p-3 font-semibold">Qty</th>
                    <th className="text-right p-3 font-semibold">Subtotal</th>
                    <th className="text-center p-3 font-semibold w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="p-3">
                        <div className="font-medium text-gray-900">
                          {item.name}
                        </div>
                      </td>
                      <td className="p-3 text-right text-gray-600">
                        ₱{item.price.toFixed(2)}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3 text-right font-bold text-gray-900">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Totals */}
          <div className="border-t border-gray-300 pt-3 pb-3 px-4 mt-auto space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">VAT (12%)</span>
              <span className="font-medium">₱{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
              <span>Total</span>
              <span className="text-primary">₱{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-4 pt-0 flex gap-2">
            <Button
              onClick={clearCart}
              disabled={cart.length === 0}
              variant="destructive"
              size="lg"
              className="w-[30%]"
            >
              Clear
            </Button>
            <Button
              disabled={cart.length === 0}
              variant="primary"
              size="lg"
              className="w-[70%]"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POSPage;
