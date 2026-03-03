export default function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-xl p-3 shadow hover:ring-2 ring-green-600 cursor-pointer"
    >
      <img
        src={product.image}
        className="h-28 w-full object-cover rounded"
      />

      <h4 className="mt-2 font-medium">{product.name}</h4>
      <p className="text-green-700 font-semibold">
        ₹ {product.price}
      </p>

      <div className="flex gap-1 mt-1">
        {Object.keys(product.variations).map((v) => (
          <span
            key={v}
            className="text-xs px-2 py-0.5 bg-gray-100 rounded"
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}
