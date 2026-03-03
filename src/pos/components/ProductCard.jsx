export default function ProductCard({ product, onAdd }) {
  return (
    <button
      onClick={() => onAdd(product)}
      className="
        bg-white rounded-xl border
        p-3 flex flex-col
        hover:shadow-sm transition
      "
    >
      {/* IMAGE */}
      <div className="h-24 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        ) : (
          <span className="text-xs text-gray-400">No Image</span>
        )}
      </div>

      {/* NAME */}
      <p className="font-medium text-sm leading-tight line-clamp-1">
        {product.name}
      </p>

      {/* PRICE */}
      <span className="text-sm font-semibold text-green-700 mt-1">
        ₹ {product.price}
      </span>
    </button>
  );
}
