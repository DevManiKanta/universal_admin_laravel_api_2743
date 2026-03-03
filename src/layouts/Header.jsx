import { useState } from "react";
import { Menu, Bell, Settings, LogOut, User } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useLogoSettings } from "../context/LogoSettingsContext";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../components/LanguageSelector";

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { settings: logoSettings } = useLogoSettings();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* LEFT: Menu Button + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-gray-700" />
          </button>

          <div className="flex items-center gap-2">
            {logoSettings?.app_logo_url && (
              <img
                src={logoSettings.app_logo_url}
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
            )}
            <span className="hidden sm:inline text-sm font-semibold text-gray-900">
              {logoSettings?.app_name || "Admin"}
            </span>
          </div>
        </div>

        {/* RIGHT: Language + Notifications + User Menu */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Notification Bell */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative group">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">{t("notifications")}</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-700">{t("noNewNotifications")}</p>
                </div>
              </div>
            </div>
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                {user?.name || "User"}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-slide-up">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{user?.email || "admin@example.com"}</p>
                </div>

                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate("/settings/profile");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <User size={16} />
                    {t("profileSettings")}
                  </button>

                  <button
                    onClick={() => {
                      navigate("/settings");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <Settings size={16} />
                    {t("settings")}
                  </button>

                  <div className="border-t border-gray-100 my-2" />

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} />
                    {t("logout")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
