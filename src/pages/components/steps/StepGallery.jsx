import { useRef, useState } from "react";

export default function StepGallery() {
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [mainIndex, setMainIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const handleFiles = (files) => {
    const list = Array.from(files);
    setImages((prev) => [...prev, ...list]);

    if (images.length === 0 && list.length > 0) {
      setMainIndex(0);
    }
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    if (index === mainIndex) setMainIndex(0);
    else if (index < mainIndex) setMainIndex((prev) => prev - 1);
  };

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <h3 className="text-base font-semibold text-gray-800">
          Product Gallery
        </h3>
        <p className="text-sm text-gray-500">
          Upload images, choose main image and add product video
        </p>
      </div>

      {/* IMAGE UPLOAD */}
      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-6
                   flex flex-col items-center justify-center text-center
                   cursor-pointer hover:border-blue-500 transition"
      >
        <UploadIcon />
        <p className="mt-2 text-sm font-medium">Click to upload images</p>
        <p className="text-xs text-gray-400">
          Multiple images allowed (JPG, PNG)
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* IMAGE PREVIEW */}
      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">
            Click an image to set as main
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setMainIndex(i)}
                className={`relative rounded-lg overflow-hidden border cursor-pointer
                  ${
                    i === mainIndex
                      ? "ring-2 ring-blue-500"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}
              >
                {i === mainIndex && (
                  <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                    Main
                  </span>
                )}

                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="h-24 w-full object-cover"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(i);
                  }}
                  className="absolute top-1 right-1 bg-black/70 text-white
                             text-xs px-2 py-0.5 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIDEO URL */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Product Video URL (optional)
        </label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="input mt-1"
        />
        <p className="text-xs text-gray-400 mt-1">
          YouTube / Vimeo / any public video link
        </p>
      </div>
    </div>
  );
}

/* ================= ICON ================= */

function UploadIcon() {
  return (
    <svg
      className="w-10 h-10 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M12 16V4m0 0l-4 4m4-4l4 4" />
      <path d="M20 16v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" />
    </svg>
  );
}
