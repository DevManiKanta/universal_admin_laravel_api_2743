import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bell,
  Blocks,
  ChevronDown,
  CreditCard,
  Image,
  Layout,
  MessageCircle,
  Palette,
  Settings,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  UserRound,
} from "lucide-react";

const menu = [
  { label: "Profile", path: "/settings/profile" },
  { label: "Logo", path: "/settings/logo" },
  { label: "Social media", path: "/settings/social-media" },
  { label: "Payment gateway", path: "/settings/payment-gateway" },
  { label: "Variation Settings", path: "/settings/variation-settings" },
  { label: "Whats App Integration", path: "/settings/whatsapp-integration" },
  { label: "Contact Page Settings", path: "/settings/contact-page" },
  { label: "Customer Care Settings", path: "/settings/customer-care-settings" },
  { label: "coupons-settings", path: "/settings/coupons-settings" },
  { label: "Banner-settings", path: "/settings/banner-settings" },
  { label: "Landing Banner Settings", path: "/settings/landing-banner-settings" },
  { label: "Shipping-settings", path: "/settings/shipping-settings" },
  { label: "Product Sections", path: "/settings/product-sections" },
  {
    label: "Footer Sections",
    children: [
      { label: "Manage Sections", path: "/settings/footer-sections" },
      { label: "Reorder Sections", path: "/settings/footer-sections/reorder" },
      { label: "Page Settings", path: "/settings/pages" },
    ],
  },
  {
    label: "Blog Sections",
    children: [
      { label: "Blog-categories", path: "/settings/blog-categories" },
      { label: "Blog", path: "/settings/blogs" },
    ],
  },
];

function getIconNode(label, size, className) {
  const props = { size, className };
  switch (label) {
    case "Profile":
      return <UserRound {...props} />;
    case "Logo":
      return <Store {...props} />;
    case "Social media":
      return <Share2 {...props} />;
    case "Payment gateway":
      return <CreditCard {...props} />;
    case "Variation Settings":
      return <Palette {...props} />;
    case "Whats App Integration":
      return <MessageCircle {...props} />;
    case "Contact Page Settings":
      return <Bell {...props} />;
    case "Customer Care Settings":
      return <ShieldCheck {...props} />;
    case "coupons-settings":
      return <ShoppingCart {...props} />;
    case "Banner-settings":
      return <Image {...props} />;
    case "Landing Banner Settings":
      return <Layout {...props} />;
    case "Shipping-settings":
      return <Truck {...props} />;
    case "Product Sections":
    case "Manage Sections":
    case "Reorder Sections":
      return <Blocks {...props} />;
    case "Footer Sections":
    case "Blog Sections":
    case "Page Settings":
    case "Blog-categories":
    case "Blog":
      return <Layout {...props} />;
    default:
      return <Settings {...props} />;
  }
}

function SidebarLink({ to, label, compact = false }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-[0_8px_18px_rgba(99,102,241,0.32)]"
            : "text-slate-700 hover:bg-white hover:text-slate-900",
          compact ? "py-2.5 text-[13px]" : "",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {getIconNode(label, compact ? 15 : 18, isActive ? "text-white" : "text-slate-500")}
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function SettingsSidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const primaryItems = menu.slice(0, 6);
  const moreItems = menu.slice(6);

  return (
    <aside className="rounded-2xl bg-slate-100 p-5">
      <div className="space-y-2">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Getting Started
        </p>
        <ul className="space-y-1.5">
          {primaryItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <CollapsibleMenu
                  item={item}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                />
              ) : (
                <SidebarLink to={item.path} label={item.label} />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          More Settings
        </p>
        <ul className="mt-2 space-y-1.5">
          {moreItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <CollapsibleMenu
                  item={item}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                />
              ) : (
                <SidebarLink to={item.path} label={item.label} compact />
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function CollapsibleMenu({ item, openMenu, setOpenMenu }) {
  const isOpen = openMenu === item.label;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpenMenu(isOpen ? null : item.label)}
        className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-white"
      >
        <span className="flex items-center gap-3">
          {getIconNode(item.label, 16, "text-slate-500")}
          {item.label}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="mt-1 space-y-1 pl-3">
          {item.children.map((child) => (
            <li key={child.label}>
              <SidebarLink to={child.path} label={child.label} compact />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
