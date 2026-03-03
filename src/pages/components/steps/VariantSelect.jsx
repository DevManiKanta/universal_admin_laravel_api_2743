import { useState } from "react";

export default function VariantSelect({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);

  const toggle = (value) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="border rounded-xl p-4">
      <label className="text-sm font-medium">{label}</label>

      <button
        onClick={() => setOpen(!open)}
        className="mt-2 w-full border rounded-lg px-4 py-3 text-left flex justify-between items-center"
      >
        {selected.length ? `${selected.length} selected` : `Select ${label}`}
        <span>▾</span>
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
