// import { useState, useMemo } from "react";
// import BrandDrawer from "./BrandDrawer";

// export default function Brands() {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(5);

//   const [open, setOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//   const brands = [
//     { id: 1, name: "Apple", image: "" },
//     { id: 2, name: "Samsung", image: "" },
//     { id: 3, name: "Google", image: "" },
//     { id: 4, name: "OnePlus", image: "" },
//     { id: 5, name: "Sony", image: "" },
//     { id: 6, name: "LG", image: "" },
//   ];

//   /* 🔍 SEARCH */
//   const filtered = useMemo(() => {
//     return brands.filter((b) =>
//       b.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search]);

//   /* 📄 PAGINATION */
//   const totalPages = Math.ceil(filtered.length / perPage);
//   const data = filtered.slice((page - 1) * perPage, page * perPage);

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Brands</h1>

//         <div className="flex gap-3">
//           <input
//             placeholder="Search brand..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             className="h-10 px-4 border rounded-lg text-sm w-64"
//           />

//           <button
//             onClick={() => {
//               setEditData(null);
//               setOpen(true);
//             }}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
//           >
//             + Add Brand
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="px-4 py-3 text-left">Image</th>
//               <th className="px-4 py-3 text-left">Brand Name</th>
//               <th className="px-4 py-3 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((b) => (
//               <tr key={b.id} className="border-t hover:bg-gray-50">
//                 {/* IMAGE */}
//                 <td className="px-4 py-3">
//                   <div className="w-12 h-12 rounded-lg bg-gray-100 border flex items-center justify-center text-xs text-gray-400">
//                     No Image
//                   </div>
//                 </td>

//                 {/* NAME */}
//                 <td className="px-4 py-3 font-medium">
//                   {b.name}
//                 </td>

//                 {/* ACTION */}
//                 <td className="px-4 py-3">
//                   <button
//                     onClick={() => {
//                       setEditData(b);
//                       setOpen(true);
//                     }}
//                     className="text-indigo-600 hover:underline"
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {data.length === 0 && (
//               <tr>
//                 <td
//                   colSpan="3"
//                   className="text-center py-10 text-gray-500"
//                 >
//                   No brands found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* FOOTER */}
//       <div className="flex justify-between items-center">
//         {/* PAGE SIZE */}
//         <div className="flex items-center gap-2 text-sm">
//           <span>Show</span>
//           <select
//             value={perPage}
//             onChange={(e) => {
//               setPerPage(Number(e.target.value));
//               setPage(1);
//             }}
//             className="border rounded px-2 py-1"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//           </select>
//           <span>entries</span>
//         </div>

//         {/* PAGINATION */}
//         <div className="flex gap-1">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-3 py-1 rounded border ${
//                 page === i + 1
//                   ? "bg-indigo-600 text-white border-indigo-600"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* DRAWER */}
//       <BrandDrawer
//         open={open}
//         onClose={() => setOpen(false)}
//         data={editData}
//       />
//     </div>
//   );
// }


import { useState, useEffect } from "react";


import api from "../../api/axios";
import BrandDrawer from "./BrandDrawer";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  /* 📄 FETCH BRANDS */
  const fetchBrands = async () => {
    try {
      const res = await api.get("/dashboard/get-brands", {
        params: { search, page, perPage },
      });
      setBrands(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [search, page, perPage]);

  /* 🗑 DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this brand?")) return;
    await api.delete(`/dashboard/delete-brand/${id}`);
    fetchBrands();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Brands</h1>

        <div className="flex gap-3">
          <input
            placeholder="Search brand..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-10 px-4 border rounded-lg text-sm w-64"
          />

          <button
            onClick={() => {
              setEditData(null);
              setOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Brand
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Brand Name</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-3">
                  {b.full_image_url ? (
                    <img
                      src={b.full_image_url}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 border flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 font-medium">{b.name}</td>

                <td className="px-4 py-3 space-x-4">
                  <button
                    onClick={() => {
                      setEditData(b);
                      setOpen(true);
                    }}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {brands.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-500">
                  No brands found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm">
          <span>Show</span>
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
          <span>entries</span>
        </div>

        <div className="flex gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* DRAWER */}
      <BrandDrawer
        open={open}
        onClose={() => setOpen(false)}
        data={editData}
        onSaved={fetchBrands}
      />
    </div>
  );
}
