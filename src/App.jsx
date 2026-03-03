// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
// import Employees from "./pages/Employees";
// import AddClient from "./pages/AddClient";
// import ViewClient from "./pages/ViewClient";
// import EditClient from "./pages/EditClient";
// import Confirmation from "./pages/Confirmation";
// import ConfirmationList from "./pages/ConfirmationList";
// import JobConfirmation from "./pages/JobConfirmation";
// import ConfirmationPrint from "./pages/ConfirmationPrint";
// import InvoiceCashMemoList from "./pages/InvoiceCashMemoList";
// import InvoicePrint from "./pages/InvoicePrint";
// import InvoiceWithLogoPrint from "./pages/InvoiceWithLogoPrint";
// import ExtraCharges from "./pages/ExtraCharges";
// import CashMemoPrint from "./pages/CashMemoPrint";
// import RateCard from "./pages/RateCard";
// import Category from "./pages/Category";
// import Clarity from "./pages/Clarity";
// import Item from "./pages/Item";
// import Color from "./pages/Color";
// import Cut from "./pages/Cut";
// import Metal from "./pages/Metal";
// import JewelleryJobCard from "./pages/JewelleryJobCard";
// import GemStoneJobCard from "./pages/GemStoneJobCard";
// import DimondJobCard from "./pages/DimondJobCard";

// import ProtectedRoute from "./auth/ProtectedRoute";
// import PublicRoute from "./auth/PublicRoute";
// import DashboardLayout from "./layouts/DashboardLayout";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public route */}
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />

//         {/* Protected routes with layout */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/add-client" element={<AddClient />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/employees" element={<Employees />} />
//           <Route path="/view-client" element={<ViewClient />} />
//           <Route path="/edit-client/:id" element={<EditClient />} />
//           <Route path="/confirmation" element={<Confirmation />} />
//           <Route path="/confirmation-list" element={<ConfirmationList />} />
//           <Route
//             path="/invoice-cash-memo-list"
//             element={<InvoiceCashMemoList />}
//           />

//           <Route path="/edit-confirmation/:id" element={<JobConfirmation />} />
//           <Route path="/invoice/:id" element={<InvoicePrint />} />
//           <Route path="/invoice-logo/:id" element={<InvoiceWithLogoPrint />} />
//           <Route path="/extra-charge/:id" element={<ExtraCharges />} />
//           <Route path="/cash-memo/:id" element={<CashMemoPrint />} />
//           <Route path="/categories" element={<Category />} />
//           <Route path="/clarity" element={<Clarity />} />
//           <Route path="/items" element={<Item />} />
//           <Route path="/colors" element={<Color />} />
//           <Route path="/cuts" element={<Cut />} />
//           <Route path="/metal" element={<Metal />} />
//           <Route path="/jewellery-job-card" element={<JewelleryJobCard />} />
//           <Route path="/gem-stone-job-card" element={<GemStoneJobCard />} />
//           <Route path="/diamond-job-card" element={<DimondJobCard />} />
//           <Route
//             path="/confirmation-print/:id"
//             element={<ConfirmationPrint />}
//           />

//           <Route path="/rate-card" element={<RateCard />} />
//           {/* <Route path="/clarity" element={<Clarity />} />
//           <Route path="/items" element={<Items />} /> */}


//         </Route>

//         {/* Default */}
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

/* LAYOUT */
import DashboardLayout from "./layouts/DashboardLayout";

/* PAGES */
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Employees from "./pages/Employees";
import AddClient from "./pages/AddClient";
import ViewClient from "./pages/ViewClient";
import EditClient from "./pages/EditClient";
import Confirmation from "./pages/Confirmation";
import ConfirmationList from "./pages/ConfirmationList";
import JobConfirmation from "./pages/JobConfirmation";
import ConfirmationPrint from "./pages/ConfirmationPrint";
import InvoiceCashMemoList from "./pages/InvoiceCashMemoList";
import InvoicePrint from "./pages/InvoicePrint";
import InvoiceWithLogoPrint from "./pages/InvoiceWithLogoPrint";
import ExtraCharges from "./pages/ExtraCharges";
import CashMemoPrint from "./pages/CashMemoPrint";
import RateCard from "./pages/RateCard";
import POS from "./pos/POS";


/* MASTER DATA */
import Category from "./pages/Category";
import Brands from "./pages/brands/Brands";
import Clarity from "./pages/Clarity";
import Item from "./pages/Item";
import Color from "./pages/Color";
import Cut from "./pages/Cut";
import Metal from "./pages/Metal";

/* JOB CARDS */
import JewelleryJobCard from "./pages/JewelleryJobCard";
import GemStoneJobCard from "./pages/GemStoneJobCard";
import DimondJobCard from "./pages/DimondJobCard";
import Orders from "./pages/orders/Orders";

import SettingsPage from "./pages/settings/SettingsPage";
import SocialMediaSettings from "./pages/settings/components/SocialMediaSettings";
import PaymentGatewaySettings from "./pages/settings/components/PaymentGatewaySettings";
import ProfileSettings from "./pages/settings/components/ProfileSettings";
import LogoSettings from "./pages/settings/components/LogoSettings";
import VariationSettings from "./pages/settings/components/VariationSettings";
import WhatsAppIntegrationSettings from "./pages/settings/components/WhatsAppIntegrationSettings";
import AccountSettings from "./pages/settings/components/AccountSettings";


// import SettingsPage from "./pages/settings/SettingsPage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------------- PUBLIC ---------------- */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* ---------------- PROTECTED ---------------- */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* DEFAULT AFTER LOGIN */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* CLIENTS */}
          {/* <Route path="/add-client" element={<AddClient />} />
          <Route path="/view-client" element={<ViewClient />} />
          <Route path="/edit-client/:id" element={<EditClient />} /> */}

          {/* PRODUCTS & MASTER */}
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/employees" element={<Employees />} />
         <Route path="/" element={<Navigate to="/settings/social-media" />} />  

        {/* SETTINGS */}
            <Route path="/settings" element={<SettingsPage />}>
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="logo" element={<LogoSettings />} />
              <Route path="social-media" element={<SocialMediaSettings />} />
              <Route path="payment-gateway" element={<PaymentGatewaySettings />} />
              <Route path="variation-settings" element={<VariationSettings />} />

              <Route path="account-settings" element={<AccountSettings />} />
              <Route path="whatsapp-integration" element={<WhatsAppIntegrationSettings />} />
            </Route>  



          {/* MASTER ATTRIBUTES */}
          <Route path="/clarity" element={<Clarity />} />
          <Route path="/items" element={<Item />} />
          <Route path="/colors" element={<Color />} />
          <Route path="/cuts" element={<Cut />} />
          <Route path="/metal" element={<Metal />} />

          {/* CONFIRMATION */}
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/confirmation-list" element={<ConfirmationList />} />
          <Route path="/edit-confirmation/:id" element={<JobConfirmation />} />
          <Route path="/confirmation-print/:id" element={<ConfirmationPrint />} />

          {/* INVOICE */}
          <Route
            path="/invoice-cash-memo-list"
            element={<InvoiceCashMemoList />}
          />
          <Route path="/invoice/:id" element={<InvoicePrint />} />
          <Route path="/invoice-logo/:id" element={<InvoiceWithLogoPrint />} />
          <Route path="/extra-charge/:id" element={<ExtraCharges />} />
          <Route path="/cash-memo/:id" element={<CashMemoPrint />} />

          {/* JOB CARDS */}
          <Route path="/jewellery-job-card" element={<JewelleryJobCard />} />
          <Route path="/gem-stone-job-card" element={<GemStoneJobCard />} />
          <Route path="/diamond-job-card" element={<DimondJobCard />} />

          {/* RATE CARD */}
          <Route path="/rate-card" element={<RateCard />} />
             <Route path="/orders" element={<Orders />} />

            <Route
          path="/pos"
          element={
            <ProtectedRoute>
              <POS />
            </ProtectedRoute>
          }
        />


        </Route>

        {/* ---------------- FALLBACK ---------------- */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
