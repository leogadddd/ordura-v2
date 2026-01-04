import { useState } from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProductFormModal } from "@/components/modals/ProductFormModal";
import { Button } from "@/components/ui/Button";

export function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Products</h1>
          <p className="text-sm text-gray-600">
            Manage your product catalog and inventory.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <PlusIcon className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </header>

      <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="text-left p-3 font-semibold">Product Name</th>
                <th className="text-left p-3 font-semibold">SKU</th>
                <th className="text-left p-3 font-semibold">Category</th>
                <th className="text-right p-3 font-semibold">Price</th>
                <th className="text-right p-3 font-semibold">Stock</th>
                <th className="text-center p-3 font-semibold">Status</th>
                <th className="text-center p-3 font-semibold w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  No products found. Click "Add Product" to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default ProductsPage;
