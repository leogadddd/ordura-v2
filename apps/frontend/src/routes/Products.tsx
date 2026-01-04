import { PlusIcon } from "@heroicons/react/24/outline";

export function ProductsPage() {
  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Products</h1>
          <p className="text-sm text-gray-600">
            Manage your product catalog and inventory.
          </p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light flex items-center gap-2">
          <PlusIcon className="w-4 h-4" />
          Add Product
        </button>
      </header>

      <div className="flex-1 bg-white rounded-md border border-gray-200 overflow-hidden flex flex-col">
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
    </div>
  );
}

export default ProductsPage;
