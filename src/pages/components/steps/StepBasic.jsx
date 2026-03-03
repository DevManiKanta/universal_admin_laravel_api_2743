export default function StepBasic() {
  return (
    <div className="space-y-6">
      {/* SECTION TITLE */}
      <div>
        <h3 className="text-base font-semibold text-gray-800">Basic Info</h3>
        <p className="text-sm text-gray-500">
          Enter the basic details of the product
        </p>
      </div>

      {/* PRODUCT NAME */}
      <FormGroup label="Product Name">
        <input type="text" placeholder="Enter product name" className="input" />
      </FormGroup>

      {/* CATEGORY */}
      <FormGroup label="Category">
        <select className="input">
          <option value="">Select category</option>
        </select>
      </FormGroup>

      {/* BRAND */}
      <FormGroup label="Brand">
        <select className="input">
          <option value="">Select brand</option>
        </select>
      </FormGroup>

      {/* DESCRIPTION */}
      <FormGroup label="Description">
        <textarea
          rows="3"
          placeholder="Short product description"
          className="input resize-none"
        />
      </FormGroup>

      {/* PRICE & DISCOUNT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormGroup label="Price (₹)">
          <input type="number" placeholder="0.00" className="input" />
        </FormGroup>

        <FormGroup label="Discount (₹)">
          <input type="number" placeholder="0.00" className="input" />
        </FormGroup>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function FormGroup({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
