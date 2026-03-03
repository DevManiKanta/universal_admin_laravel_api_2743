import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage, SUPPORTED_LANGUAGES } from "../context/LanguageContext";

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES[currentLanguage];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title={t("changeLanguage")}
      >
        <Globe size={20} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {currentLang.flag} {currentLang.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-slide-up z-50">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-gray-900">{t("selectLanguage")}</p>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => {
                  changeLanguage(code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  currentLanguage === code ? "bg-indigo-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className={`text-sm font-medium ${
                    currentLanguage === code ? "text-indigo-600" : "text-gray-700"
                  }`}>
                    {lang.name}
                  </span>
                </div>
                {currentLanguage === code && (
                  <Check size={18} className="text-indigo-600" />
                )}
              </button>
            ))}
          </div>

          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
            {t("poweredByGoogleTranslate")}
          </div>
        </div>
      )}
    </div>
  );
}
