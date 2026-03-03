import React from "react";


import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  Box,
  Tag,
  ShoppingCart,
  DollarSign,
  FileText,
  BarChart,
  Package,
  Store,
  Settings,
} from "lucide-react";
import api from "../api/axios";
import { useAppSettings } from "../context/AppSettingsContext";
import { useLanguage } from "../context/LanguageContext";

const SIDEBAR_WIDTH = "88px";
const FALLBACK_LOGO = "/logo/pos.png";



export default function Sidebar({ open, setOpen, logout }) {
  const { settings } = useAppSettings();
  const { t } = useLanguage();
  const location = useLocation();
  const [logo, setLogo] = useState(FALLBACK_LOGO);

  /* ===============================
      LOAD LOGO FROM SETTINGS
  =============================== */


  const isActive = (path) =>
    location.pathname === path
      ? "bg-yellow-200 text-orange-600"
      : "text-gray-700 hover:bg-green-100";

  const Item = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className={`flex flex-col items-center gap-1 py-4 rounded-lg ${isActive(
        to
      )}`}
    >
      <Icon size={20} />
      <span className="text-[11px]">{label}</span>
    </Link>
  );

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40
        w-[88px] bg-green-50 border-r
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      style={{ width: SIDEBAR_WIDTH }}
    >
      <div className="h-full flex flex-col">
        {/* LOGO */}
        <div className="h-16 flex items-center justify-center border-b">
        <img
            src={settings.logo || FALLBACK_LOGO}
            alt="App Logo"
            className="h-8"
          />
        </div>

        {/* MENU */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          <Item to="/dashboard" icon={Home} label={t("dashboard")} />
          <Item to="/products" icon={Box} label={t("products")} />
          <Item to="/categories" icon={Tag} label={t("categories")} />
          <Item to="/brands" icon={Store} label="Brand" />
          <Item to="/pos" icon={ShoppingCart} label="POS" />
          <Item to="/expenses" icon={DollarSign} label="Expenses" />
          <Item to="/purchase" icon={FileText} label="Purchase" />
          <Item to="/orders" icon={Package} label={t("orders")} />
          <Item to="/inventory" icon={Package} label="Inventory" />
          <Item to="/vendors" icon={Store} label="Vendors" />
          <Item to="/reports" icon={BarChart} label="Reports" />
          <Item to="/settings/profile" icon={Settings} label={t("settings")} />
        </nav>

        {/* LOGOUT */}
        <div className="p-2 border-t">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-xs py-2 rounded-lg"
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </aside>
  );
}
