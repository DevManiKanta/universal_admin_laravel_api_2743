import SettingsSidebar from "./components/SettingsSidebar";

export default function SettingsLayout({ children }) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px,1fr]">
      <div className="xl:sticky xl:top-20 xl:self-start">
        <SettingsSidebar />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
