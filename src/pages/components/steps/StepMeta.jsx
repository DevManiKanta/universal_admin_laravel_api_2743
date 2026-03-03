import { useState } from "react";

export default function StepMeta() {
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold">SEO Meta Information</h3>
        <p className="text-sm text-gray-500">
          Optimize how this product appears on search engines.
        </p>
      </div>

      {/* META TITLE */}
      <div>
        <label className="text-sm font-medium">Meta Title</label>
        <input
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          placeholder="Product title for search engines"
          className="input mt-1"
          maxLength={60}
        />
        <p className="text-xs text-gray-400 mt-1">
          {metaTitle.length}/60 characters
        </p>
      </div>

      {/* META DESCRIPTION */}
      <div>
        <label className="text-sm font-medium">Meta Description</label>
        <textarea
          value={metaDesc}
          onChange={(e) => setMetaDesc(e.target.value)}
          placeholder="Short description shown in search results"
          className="input mt-1 min-h-[90px]"
          maxLength={160}
        />
        <p className="text-xs text-gray-400 mt-1">
          {metaDesc.length}/160 characters
        </p>
      </div>

      {/* TAGS */}
      <div>
        <label className="text-sm font-medium">Meta Tags</label>

        <div className="mt-1 flex flex-wrap items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-red-600"
              >
                ✕
              </button>
            </span>
          ))}

          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Type & press Enter"
            className="flex-1 outline-none text-sm"
          />
        </div>

        <p className="text-xs text-gray-400 mt-1">Press Enter to add tags</p>
      </div>
    </div>
  );
}
