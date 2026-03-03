import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Edit2, Trash2, Grid3x3, List, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axios";
import AddProductDrawer from "./components/AddProductDrawer";
import EditProductDrawer from "./components/EditProductDrawer";
import StatusBadge from "./components/StatusBadge";
import useDynamicTitle from "../hooks/useDynamicTitle";
import ProductSectionAssign from "./settings/components/ProductSectionAssign";
import toast from "react-hot-toast";

export default function Products() {
  useDynamicTitle("Products");

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [viewMode, setViewMode] = useState("table");

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openSections, setOpenSections] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSectionProduct, setSelectedSectionProduct] = useState(null);

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin-dashboard/products", {
        params: { search: query, page, perPage },
      });
      setProducts(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (error) {
      toast.error("Failed to load products");
      console.error("FETCH PRODUCTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/admin-dashboard/delete-product/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("DELETE ERROR:", error);
    }
  };

  /* ================= LOAD ON CHANGE ================= */
  useEffect(() => {
    fetchProducts();
  }, [query, page, perPage]);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="sneat-btn-primary"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="sneat-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <button
            onClick={() => {
              setQuery(search);
              setPage(1);
            }}
            className="sneat-btn-secondary"
          >
            <Search size={18} />
            Search
          </button>

          <div className="flex gap-2 border-l border-gray-200 pl-3">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition ${
                viewMode === "table"
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Table View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Grid View"
            >
              <Grid3x3 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="sneat-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Sections</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                      </div>
                    </td>
                  </tr>
                )}

                {!loading && products.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}

                {!loading &&
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                              onError={(e) => {
                                e.target.src = "/logo/noimage.jfif";
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                              No Image
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {product.category_main ? (
                          <div>
                            <p className="text-gray-600">{product.category_main}</p>
                            <p className="font-medium text-gray-900">{product.category_name}</p>
                          </div>
                        ) : (
                          <p className="font-medium text-gray-900">{product.category_name || "-"}</p>
                        )}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ₹{Number(product.final_price).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={product.status} />
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.sections && product.sections.length > 0 ? (
                            product.sections.slice(0, 2).map((section) => (
                              <span
                                key={section.id}
                                className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium"
                              >
                                {section.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                          {product.sections && product.sections.length > 2 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
                              +{product.sections.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setOpenEdit(true);
                            }}
                            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedSectionProduct(product);
                              setOpenSections(true);
                            }}
                            className="p-2 hover:bg-purple-50 rounded-lg text-purple-600 transition"
                            title="Sections"
                          >
                            <Grid3x3 size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading && (
            <div className="col-span-full flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products found
            </div>
          )}

          {!loading &&
            products.map((product) => (
              <div key={product.id} className="sneat-card overflow-hidden group">
                <div className="relative overflow-hidden bg-gray-100 h-40">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      onError={(e) => {
                        e.target.src = "/logo/noimage.jfif";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpenEdit(true);
                      }}
                      className="p-2 bg-white rounded-lg text-blue-600 hover:bg-blue-50 transition"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.category_name}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-bold text-indigo-600">₹{Number(product.final_price).toLocaleString()}</p>
                    <StatusBadge status={product.status} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="sneat-card p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Sections Drawer */}
      {openSections && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpenSections(false)}
          />
          <div className="fixed right-0 top-0 h-full w-[450px] bg-white shadow-2xl z-50 p-6 overflow-y-auto animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Assign Sections</h2>
              <button
                onClick={() => setOpenSections(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <ProductSectionAssign
              product={selectedSectionProduct}
              onSaved={() => {
                fetchProducts();
                setOpenSections(false);
              }}
            />
          </div>
        </>
      )}

      {/* Drawers */}
      <AddProductDrawer
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
          fetchProducts();
        }}
      />

      <EditProductDrawer
        open={openEdit}
        product={selectedProduct}
        productId={selectedProduct?.id}
        onClose={() => {
          setOpenEdit(false);
          setSelectedProduct(null);
          fetchProducts();
        }}
      />
    </div>
  );
}
