// import { useState, useMemo } from "react";

// export default function CartPanel({ cart }) {
//   const [customer, setCustomer] = useState("");
//   const [discount, setDiscount] = useState(0);

//   const subtotal = useMemo(
//     () => cart.reduce((s, i) => s + i.price * i.qty, 0),
//     [cart]
//   );

//   const gst = useMemo(() => (subtotal * 5) / 100, [subtotal]); // 5% GST
//   const total = subtotal + gst - discount;

//   return (
//     <div className="w-96 bg-white border-l flex flex-col h-screen">
//       {/* HEADER */}
//       <div className="p-4 border-b">
//         <h3 className="text-lg font-semibold">Billing</h3>
//       </div>

//       {/* CUSTOMER */}
//       <div className="p-4 border-b space-y-2">
//         <label className="text-sm text-gray-600">
//           Customer Name / Mobile
//         </label>
//         <input
//           value={customer}
//           onChange={(e) => setCustomer(e.target.value)}
//           placeholder="Walk-in customer"
//           className="w-full border rounded-lg px-3 py-2 text-sm"
//         />
//       </div>

//       {/* ITEMS (FIXED HEIGHT + SCROLL) */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {cart.map((item, i) => (
//           <div
//             key={i}
//             className="border rounded-xl p-3 flex justify-between"
//           >
//             <div>
//               <p className="font-medium">{item.name}</p>
//               <p className="text-xs text-gray-500">
//                 {Object.values(item.selected).join(" • ")}
//               </p>
//               <p className="text-sm mt-1">₹ {item.price}</p>
//             </div>

//             <div className="text-sm text-gray-600">
//               Qty: {item.qty}
//             </div>
//           </div>
//         ))}

//         {cart.length === 0 && (
//           <p className="text-center text-gray-400 mt-10">
//             No items added
//           </p>
//         )}
//       </div>

//       {/* SUMMARY */}
//       <div className="border-t p-4 space-y-2 text-sm">
//         <Row label="Subtotal" value={`₹ ${subtotal.toFixed(2)}`} />
//         <Row label="GST (5%)" value={`₹ ${gst.toFixed(2)}`} />

//         <div className="flex justify-between items-center">
//           <span className="text-gray-600">Discount</span>
//           <input
//             type="number"
//             value={discount}
//             onChange={(e) => setDiscount(Number(e.target.value))}
//             className="w-24 border rounded px-2 py-1 text-right"
//           />
//         </div>

//         <div className="flex justify-between font-semibold text-lg pt-2">
//           <span>Total</span>
//           <span>₹ {total.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* ACTION */}
//       <div className="p-4">
//         <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg">
//           Proceed to Pay
//         </button>
//       </div>
//     </div>
//   );
// }

// /* SMALL ROW COMPONENT */
// function Row({ label, value }) {
//   return (
//     <div className="flex justify-between">
//       <span className="text-gray-600">{label}</span>
//       <span>{value}</span>
//     </div>
//   );
// }








import { useState, useMemo } from "react";

export default function CartPanel({ cart }) {
  const [customer, setCustomer] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("pay"); // pay | link

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.qty, 0),
    [cart]
  );

  const gst = useMemo(() => (subtotal * 5) / 100, [subtotal]);
  const total = subtotal + gst - discount;

  return (
    <div className="w-96 bg-white border-l flex flex-col h-screen">
      {/* HEADER */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Billing</h3>
      </div>

      {/* CUSTOMER */}
      <div className="p-4 border-b space-y-2">
        <label className="text-sm text-gray-600">
          Customer Name / Mobile
        </label>
        <input
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          placeholder="Walk-in customer / Mobile"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* ITEMS */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.map((item, i) => (
          <div
            key={i}
            className="border rounded-xl p-3 flex justify-between"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">
                {Object.values(item.selected).join(" • ")}
              </p>
              <p className="text-sm mt-1">₹ {item.price}</p>
            </div>

            <div className="text-sm text-gray-600">
              Qty: {item.qty}
            </div>
          </div>
        ))}

        {cart.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No items added
          </p>
        )}
      </div>

      {/* SUMMARY */}
      <div className="border-t p-4 space-y-3 text-sm">
        <Row label="Subtotal" value={`₹ ${subtotal.toFixed(2)}`} />
        <Row label="GST (5%)" value={`₹ ${gst.toFixed(2)}`} />

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Discount</span>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-24 border rounded px-2 py-1 text-right"
          />
        </div>

        <div className="flex justify-between font-semibold text-lg pt-2">
          <span>Total</span>
          <span>₹ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* PAYMENT MODE */}
      <div className="px-4 pb-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setPaymentMode("pay")}
            className={`py-2 rounded-lg text-sm border ${
              paymentMode === "pay"
                ? "bg-indigo-600 text-white"
                : "bg-white"
            }`}
          >
            Pay Now
          </button>

          <button
            onClick={() => setPaymentMode("link")}
            className={`py-2 rounded-lg text-sm border ${
              paymentMode === "link"
                ? "bg-indigo-600 text-white"
                : "bg-white"
            }`}
          >
            Send Payment Link
          </button>
        </div>
      </div>

      {/* ACTION */}
      <div className="p-4">
        {paymentMode === "pay" ? (
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg">
            Proceed to Pay
          </button>
        ) : (
          <button
            disabled={!customer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg disabled:opacity-50"
          >
            Send Payment Link
          </button>
        )}
      </div>
    </div>
  );
}

/* SMALL ROW COMPONENT */
function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span>{value}</span>
    </div>
  );
}
