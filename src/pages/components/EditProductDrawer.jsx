"use client";

import { useState, useEffect } from "react";

import StepBasic from "./steps/StepBasic";
import StepGallery from "./steps/StepGallery";
import StepVariation from "./steps/StepVariation";
import StepMeta from "./steps/StepMeta";
import StepTax from "./steps/StepTax";

export default function EditProductDrawer({ open, onClose, product }) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    basic: {},
    gallery: [],
    variations: [],
    meta: {},
    tax: {},
  });

  // Prefill form when product changes
  useEffect(() => {
    if (product) {
      setForm({
        basic: product.basic || {},
        gallery: product.gallery || [],
        variations: product.variations || [],
        meta: product.meta || {},
        tax: product.tax || {},
      });
    }
  }, [product]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-50 h-full w-full md:w-[35%] bg-gray-50 flex flex-col shadow-2xl">
        <Header step={step} onClose={onClose} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="mx-auto max-w-3xl space-y-10">
            {step === 1 && (
              <StepBasic
                data={form.basic}
                onChange={(data) =>
                  setForm({ ...form, basic: data })
                }
              />
            )}

            {step === 2 && (
              <StepGallery
                data={form.gallery}
                onChange={(data) =>
                  setForm({ ...form, gallery: data })
                }
              />
            )}

            {step === 3 && (
              <StepVariation
                data={form.variations}
                onChange={(data) =>
                  setForm({ ...form, variations: data })
                }
              />
            )}

            {step === 4 && (
              <StepMeta
                data={form.meta}
                onChange={(data) =>
                  setForm({ ...form, meta: data })
                }
              />
            )}

            {step === 5 && (
              <StepTax
                data={form.tax}
                onChange={(data) =>
                  setForm({ ...form, tax: data })
                }
              />
            )}
          </div>
        </div>

        <Footer
          step={step}
          setStep={setStep}
          onSubmit={() => handleUpdate(product?.id, form)}
        />
      </div>
    </>
  );
}

/* ================= HEADER ================= */

function Header({ step, onClose }) {
  return (
    <div className="h-16 px-6 border-b bg-white flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          Edit Product — Wizard
        </h2>
        <p className="text-sm text-gray-500">
          Step {step} of 5
        </p>
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

function Footer({ step, setStep, onSubmit }) {
  return (
    <div className="h-16 px-6 border-t bg-white flex items-center justify-between">
      <button
        disabled={step === 1}
        onClick={() => setStep(step - 1)}
        className="px-4 py-2 rounded border disabled:opacity-50"
      >
        Back
      </button>

      {step < 5 ? (
        <button
          onClick={() => setStep(step + 1)}
          className="px-6 py-2 rounded bg-indigo-600 text-white"
        >
          Next
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="px-6 py-2 rounded bg-green-600 text-white"
        >
          Update Product
        </button>
      )}
    </div>
  );
}

/* ================= UPDATE HANDLER ================= */

function handleUpdate(id, form) {
  console.log("Updating product:", id, form);
  alert("Product updated successfully");
}
