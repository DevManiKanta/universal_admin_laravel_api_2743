import { useState } from "react";
import CategoryPills from "./components/CategoryPills";
import BrandFilter from "./components/BrandFilter";
import CartPanel from "./CartPanel";
import ProductCard from "./components/ProductCard";
import { PRODUCTS } from "./data/products";
const categories = [
  { id: "all", name: "All", icon: "🌿" },
  { id: "hair", name: "Hair", icon: "💇" },
  { id: "skin", name: "Skin", icon: "🧴" },
  { id: "powder", name: "Powder", icon: "🌾" },
];

const brands = [
  { id: "all", name: "All" },
  { id: "sridevi", name: "Sridevi" },
  { id: "ayur", name: "Ayur" },
  { id: "vedic", name: "Vedic" },
];



export default function POS() {
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [cart, setCart] = useState([]);

  const filteredProducts = PRODUCTS.filter((p) =>
    (category === "all" || p.category === category) &&
    (brand === "all" || p.brand === brand)
  );

  return (
    <div className="h-screen flex bg-gray-100">
      {/* LEFT + CENTER */}
      <div className="flex-1 flex flex-col p-4 gap-4">
        {/* TOP CATEGORY */}
        <CategoryPills
          items={categories}
          active={category}
          onChange={setCategory}
        />

        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* BRAND FILTER */}
          <div className="bg-white rounded-xl p-3 overflow-y-auto">
            <BrandFilter
              items={brands}
              active={brand}
              onChange={setBrand}
            />
          </div>

          {/* PRODUCTS GRID */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto">
        {filteredProducts.map((p) => (
            <ProductCard
            key={p.id}
            product={p}
            onAdd={(item) =>
                setCart([...cart, { ...item, qty: 1, selected: {} }])
            }
            />
        ))}
        </div>
        </div>
      </div>

      {/* BILLING */}
      <CartPanel cart={cart} />
    </div>
  );
}
