import { useState } from "react";
import StepBasic from "./steps/StepBasic";
import StepGallery from "./steps/StepGallery";
import StepVariation from "./steps/StepVariation";
import StepMeta from "./steps/StepMeta";
import StepTax from "./steps/StepTax";

export default function AddProductDrawer({ open, onClose }) {
  const [step, setStep] = useState(1);

  if (!open) return null;

  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* RIGHT DRAWER (50%) */}
      <div
        className="
          fixed top-0 right-0 z-50 h-full
           w-full md:w-[35%]
          bg-gray-50 flex flex-col
          shadow-2xl
        "
      >
        <Header onClose={onClose} step={step} />

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="mx-auto max-w-3xl space-y-10">
            {step === 1 && <StepBasic />}
            {step === 2 && <StepGallery />}
            {step === 3 && <StepVariation />}
            {step === 4 && <StepMeta />}
            {step === 5 && <StepTax />}
          </div>
        </div>

        <Footer step={step} setStep={setStep} />
      </div>
    </>
  );
}

/* ================= HEADER ================= */

function Header({ onClose, step }) {
  return (
    <div className="h-16 px-6 border-b bg-white flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">Add Product — Wizard</h2>
        <p className="text-sm text-gray-500">Step {step} of 5</p>
      </div>

      <button
        onClick={onClose}
        className="text-xl text-gray-500 hover:text-black"
      >
        ✕
      </button>
    </div>
  );
}

/* ================= FOOTER ================= */

function Footer({ step, setStep }) {
  return (
    <div className="h-16 px-6 border-t bg-white flex items-center justify-between">
      <button
        disabled={step === 1}
        onClick={() => setStep(step - 1)}
        className="px-4 py-2 rounded border disabled:opacity-50"
      >
        Back
      </button>

      <div className="flex gap-3">
        <button className="px-4 py-2 rounded bg-gray-100">Reset</button>

        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 rounded bg-indigo-600 text-white"
          >
            Next
          </button>
        ) : (
          <button className="px-6 py-2 rounded bg-green-600 text-white">
            Save Product
          </button>
        )}
      </div>
    </div>
  );
}
