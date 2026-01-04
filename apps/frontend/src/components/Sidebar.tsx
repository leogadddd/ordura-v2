import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  Squares2X2Icon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: HomeIcon },
  { label: "POS", to: "/pos", icon: ShoppingCartIcon },
  { label: "Products", to: "/products", icon: CubeIcon },
  { label: "Inventory", to: "/inventory", icon: Squares2X2Icon },
  { label: "Reports", to: "/reports", icon: DocumentChartBarIcon },
  { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`hidden border-r border-primary-pale bg-white/90 shadow-sm md:flex md:flex-col md:py-2 ${
        isExpanded ? "w-48 md:px-1.5" : "w-14 md:items-center md:px-1.5"
      }`}
    >
      <div className="flex items-center justify-end mb-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-md text-gray-600 hover:bg-primary-pale"
          title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeftIcon className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md h-12 ${
                  isExpanded ? "px-3" : "w-11 px-3"
                } ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-primary-pale"
                }`
              }
              title={!isExpanded ? item.label : undefined}
            >
              <Icon className="w-5 h-5" />
              {isExpanded && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
