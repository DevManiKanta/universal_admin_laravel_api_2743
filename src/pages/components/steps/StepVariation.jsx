import { useEffect, useState } from "react";
import VariantSelect from "./VariantSelect";
import VariantTable from "./VariantTable";
import { generateVariants } from "./generateVariants";

export default function StepVariation() {
  const attributes = {
    Size: ["S", "M", "L"],
    Weight: ["250g", "500g", "1kg"],
    Color: ["Red", "Blue", "Black"],
  };

  const [selected, setSelected] = useState({
    Size: [],
    Weight: [],
    Color: [],
  });

  const [variants, setVariants] = useState([]);
  const [variantData, setVariantData] = useState([]);

  useEffect(() => {
    const v = generateVariants(selected);
    setVariants(v);
    setVariantData(v.map(() => ({})));
  }, [selected]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Variations (multi-select dropdowns)</h3>
        <p className="text-sm text-gray-400">
          Pick options in each group — combinations appear below.
        </p>
      </div>

      {Object.entries(attributes).map(([key, options]) => (
        <VariantSelect
          key={key}
          label={key}
          options={options}
          selected={selected[key]}
          onChange={(vals) => setSelected({ ...selected, [key]: vals })}
        />
      ))}

      {variants.length > 0 && (
        <VariantTable
          variants={variants}
          data={variantData}
          setData={setVariantData}
        />
      )}
    </div>
  );
}
