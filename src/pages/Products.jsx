import { useState, useMemo } from "react";
import AddProductDrawer from "./components/AddProductDrawer";
import EditProductDrawer from "./components/EditProductDrawer";
import { useLanguage } from "../context/LanguageContext";

export default function Products() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: "iPhone 15", category: "Electronics", brand: "Apple", price: "₹25,000" },
    { id: 2, name: "Galaxy S23", category: "Electronics", brand: "Samsung", price: "₹22,000" },
    { id: 3, name: "MacBook Air", category: "Laptop", brand: "Apple", price: "₹75,000" },
    { id: 4, name: "iPad Pro", category: "Tablet", brand: "Apple", price: "₹68,000" },
    { id: 5, name: "Pixel 8", category: "Mobile", brand: "Google", price: "₹55,000" },
    { id: 6, name: "OnePlus 12", category: "Mobile", brand: "OnePlus", price: "₹49,000" },
  ];

  /* 🔍 APPLY SEARCH ON BUTTON CLICK */
  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{t("products")}</h1>

        <div className="flex gap-2">
          <input
            placeholder={t("searchProducts")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 px-4 border rounded-lg text-sm w-64"
          />
          <button
            onClick={() => {
              setQuery(search);
              setPage(1);
            }}
            className="px-4 py-2 bg-gray-100 border rounded-lg text-sm"
          >
            {t("search")}
          </button>

          <button
            onClick={() => setOpenAdd(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + {t("addProduct")}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">{t("image")}</th>
              <th className="px-4 py-3 text-left">{t("productName")}</th>
              <th className="px-4 py-3 text-left">{t("category")}</th>
              <th className="px-4 py-3 text-left">{t("brand")}</th>
              <th className="px-4 py-3 text-left">{t("price")}</th>
              <th className="px-4 py-3 text-left">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                    {t("noImage")}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">{p.brand}</td>
                <td className="px-4 py-3">{p.price}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedProduct(p);
                      setOpenEdit(true);
                    }}
                    className="text-indigo-600 hover:underline"
                  >
                    {t("edit")}
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  {t("noProductsFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center">
        {/* PAGE SIZE */}
        <div className="flex items-center gap-2 text-sm">
          <span>{t("show")}</span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>{t("entries")}</span>
        </div>

        {/* PAGINATION */}
        <div className="flex gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {t("prev")}
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                page === i + 1
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {t("next")}
          </button>
        </div>
      </div>

      {/* DRAWERS */}
      <AddProductDrawer open={openAdd} onClose={() => setOpenAdd(false)} />
      <EditProductDrawer
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        product={selectedProduct}
      />
    </div>
  );
}
