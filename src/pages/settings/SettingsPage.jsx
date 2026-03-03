import { Outlet } from "react-router-dom";

export default function SettingsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100/70 p-4 md:p-6">
      <Outlet />
    </div>
  );
}
