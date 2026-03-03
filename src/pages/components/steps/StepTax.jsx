import { useState } from "react";

export default function StepTax() {
  const [gst, setGst] = useState("");
  const [affinity, setAffinity] = useState("");
  const [affinityPercent, setAffinityPercent] = useState("");

  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold">Tax & Affinity</h3>
        <p className="text-sm text-gray-500">
          Configure GST and distributor affinity settings.
        </p>
      </div>

      {/* GST */}
      <div>
        <label className="text-sm font-medium">GST (%)</label>
        <input
          type="number"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
          placeholder="Enter GST percentage (eg: 5, 12, 18)"
          className="input mt-1"
        />
        <p className="text-xs text-gray-400 mt-1">
          Applicable tax percentage for this product
        </p>
      </div>

      {/* AFFINITY */}
      <div>
        <label className="text-sm font-medium">Affinity</label>
        <select
          value={affinity}
          onChange={(e) => setAffinity(e.target.value)}
          className="input mt-1"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <p className="text-xs text-gray-400 mt-1">
          Enable affinity commission for distributors
        </p>
      </div>

      {/* AFFINITY % (CONDITIONAL) */}
      {affinity === "yes" && (
        <div>
          <label className="text-sm font-medium">Affinity Percentage (%)</label>
          <input
            type="number"
            value={affinityPercent}
            onChange={(e) => setAffinityPercent(e.target.value)}
            placeholder="Enter affinity percentage"
            className="input mt-1"
          />
          <p className="text-xs text-gray-400 mt-1">
            Percentage shared with affiliate or distributor
          </p>
        </div>
      )}
    </div>
  );
}
