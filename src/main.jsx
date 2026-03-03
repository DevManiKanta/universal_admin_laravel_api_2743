import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { AppSettingsProvider } from "./context/AppSettingsContext";
import { LogoSettingsProvider } from "./context/LogoSettingsContext";
import { ProfileProvider } from "./context/ProfileContext";
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppSettingsProvider>
      <LogoSettingsProvider>
        <ProfileProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ProfileProvider>
      </LogoSettingsProvider>
    </AppSettingsProvider>
  </AuthProvider>,
);
