export default function VariantTable({ variants, data, setData }) {
  const update = (i, field, value) => {
    const copy = [...data];
    copy[i] = { ...copy[i], [field]: value };
    setData(copy);
  };

  const addImages = (i, files) => {
    const copy = [...data];
    const newFiles = Array.from(files);
    copy[i] = {
      ...copy[i],
      images: [...(copy[i].images || []), ...newFiles],
    };
    setData(copy);
  };

  const removeImage = (rowIndex, imgIndex) => {
    const copy = [...data];
    copy[rowIndex].images.splice(imgIndex, 1);
    setData([...copy]);
  };

  return (
    <div className="border rounded-xl bg-white p-6">
      <h4 className="font-semibold mb-1">Generated Variants</h4>
      <p className="text-sm text-gray-500 mb-4">
        Configure per-variant price, SKU, stock and images.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-2 text-left">Variant</th>
              <th className="px-3 py-2">Extra Price</th>
              <th className="px-3 py-2">SKU</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Low Qty</th>
              <th className="px-3 py-2">Photos</th>
            </tr>
          </thead>

          <tbody>
            {variants.map((v, i) => (
              <tr key={i} className="border-t align-top">
                {/* VARIANT */}
                <td className="px-3 py-2 font-medium">{v.join(" / ")}</td>

                {/* PRICE */}
                <td className="px-3 py-2">
                  <input
                    className="input"
                    placeholder="0"
                    onChange={(e) => update(i, "price", e.target.value)}
                  />
                </td>

                {/* SKU */}
                <td className="px-3 py-2">
                  <input
                    className="input"
                    placeholder="SKU"
                    onChange={(e) => update(i, "sku", e.target.value)}
                  />
                </td>

                {/* QTY */}
                <td className="px-3 py-2">
                  <input
                    className="input"
                    placeholder="Qty"
                    onChange={(e) => update(i, "qty", e.target.value)}
                  />
                </td>

                {/* LOW QTY */}
                <td className="px-3 py-2">
                  <input
                    className="input"
                    placeholder="Low Qty"
                    onChange={(e) => update(i, "low_qty", e.target.value)}
                  />
                </td>

                {/* PHOTOS */}
                <td className="px-3 py-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => addImages(i, e.target.files)}
                  />

                  {/* PREVIEW */}
                  {data[i]?.images?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data[i].images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative h-14 w-14 border rounded overflow-hidden"
                        >
                          <img
                            src={URL.createObjectURL(img)}
                            className="h-full w-full object-cover"
                          />
                          <button
                            onClick={() => removeImage(i, idx)}
                            className="absolute top-0 right-0 bg-black/70 text-white text-xs px-1"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
