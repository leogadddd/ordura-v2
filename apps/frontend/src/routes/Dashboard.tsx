import { Link, useNavigate } from "react-router-dom";

export function DashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Dashboard</h1>
          <p className="text-gray-600">Quick snapshot of your POS activity.</p>
        </div>
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="rounded-md border border-primary-lighter bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-pale"
        >
          Logout
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-md border border-primary-pale bg-white/80 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Today's Sales</p>
          <p className="mt-2 text-2xl font-semibold text-primary">₱ 12,340</p>
          <p className="text-xs text-gray-500">+8.2% vs yesterday</p>
        </div>
        <div className="rounded-md border border-primary-pale bg-white/80 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Orders</p>
          <p className="mt-2 text-2xl font-semibold text-primary">184</p>
          <p className="text-xs text-gray-500">+12 new since 2pm</p>
        </div>
        <div className="rounded-md border border-primary-pale bg-white/80 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Inventory Alerts</p>
          <p className="mt-2 text-2xl font-semibold text-primary">6 items</p>
          <p className="text-xs text-gray-500">Low stock nearing threshold</p>
        </div>
      </section>

      <section className="rounded-md border border-primary-pale bg-white/80 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
          <Link
            to="/login"
            className="text-sm text-primary hover:text-primary-light font-medium"
          >
            Go to Login
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <button className="rounded-md border border-primary-lighter bg-primary text-white px-4 py-3 font-semibold shadow hover:bg-primary-light">
            New Sale
          </button>
          <button className="rounded-md border border-primary-lighter bg-white px-4 py-3 font-semibold text-primary hover:bg-primary-pale">
            View Inventory
          </button>
          <button className="rounded-md border border-primary-lighter bg-white px-4 py-3 font-semibold text-primary hover:bg-primary-pale">
            Run Report
          </button>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
