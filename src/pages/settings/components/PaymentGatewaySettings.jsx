import { useEffect, useMemo, useState } from "react";
import SettingsLayout from "../SettingsLayout";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { CreditCard, Eye, EyeOff, Settings2 } from "lucide-react";

const gatewayMeta = [
  { id: "razorpay", label: "Razorpay", fee: "2.00%" },
  { id: "cashfree", label: "Cashfree", fee: "1.90%" },
  { id: "phonepe", label: "PhonePe", fee: "2.25%" },
  { id: "payu", label: "PayU", fee: "2.35%" },
];

export default function PaymentGatewaySettings() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);

  const [gateways, setGateways] = useState({
    razorpay: { key: "", enabled: false },
    cashfree: { key: "", enabled: false },
    phonepe: {
      merchant_id: "",
      client_id: "",
      client_version: "",
      base_url: "",
      enabled: false,
    },
    payu: { key: "", enabled: false },
    cod: { enabled: true },
  });

  const [secrets, setSecrets] = useState({
    razorpay: "",
    cashfree: "",
    phonepe: "",
    payu: "",
  });

  const [showSecret, setShowSecret] = useState({
    razorpay: false,
    cashfree: false,
    phonepe: false,
    payu: false,
  });

  const fetchGateways = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin-dashboard/payment-gateways");
      const d = res.data.data;

      setGateways({
        razorpay: {
          key: d?.razorpay_key || "",
          enabled: !!d?.razorpay_enabled,
        },
        cashfree: {
          key: d?.cashfree_app_id || "",
          enabled: !!d?.cashfree_enabled,
        },
        phonepe: {
          merchant_id: d?.phonepe_merchant_id || "",
          client_id: d?.phonepe_client_id || "",
          client_version: d?.phonepe_client_version || "",
          base_url: d?.phonepe_base_url || "",
          enabled: !!d?.phonepe_enabled,
        },
        payu: {
          key: d?.payu_key || "",
          enabled: !!d?.payu_enabled,
        },
        cod: { enabled: !!d?.cod_enabled },
      });

      setSecrets({
        razorpay: d?.razorpay_secret || "",
        cashfree: d?.cashfree_secret || "",
        phonepe: d?.phonepe_client_secret || "",
        payu: d?.payu_salt || "",
      });

      setDirty(false);
    } catch {
      toast.error("Failed to load payment gateways");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGateways();
  }, []);

  const handleSave = async () => {
    try {
      const payload = {
        razorpay_key: gateways.razorpay.key,
        razorpay_enabled: gateways.razorpay.enabled,

        cashfree_app_id: gateways.cashfree.key,
        cashfree_enabled: gateways.cashfree.enabled,

        phonepe_merchant_id: gateways.phonepe.merchant_id,
        phonepe_client_id: gateways.phonepe.client_id,
        phonepe_client_version: gateways.phonepe.client_version,
        phonepe_base_url: gateways.phonepe.base_url,
        phonepe_enabled: gateways.phonepe.enabled,

        payu_key: gateways.payu.key,
        payu_enabled: gateways.payu.enabled,

        cod_enabled: gateways.cod.enabled,
      };

      if (secrets.razorpay) payload.razorpay_secret = secrets.razorpay;
      if (secrets.cashfree) payload.cashfree_secret = secrets.cashfree;
      if (secrets.phonepe) payload.phonepe_client_secret = secrets.phonepe;
      if (secrets.payu) payload.payu_salt = secrets.payu;

      await api.post("/admin-dashboard/payment-gateways", payload);
      toast.success("Payment gateway settings updated");

      setEditMode(false);
      fetchGateways();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    fetchGateways();
  };

  const defaultGateway = useMemo(() => {
    const preferredId =
      gatewayMeta.find((item) => gateways[item.id]?.enabled)?.id || "razorpay";

    return gatewayMeta.find((item) => item.id === preferredId);
  }, [gateways]);

  if (loading) {
    return (
      <SettingsLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading payment settings...
        </div>
      </SettingsLayout>
    );
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <section className="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-700">
                Payment providers
              </h2>
              <p className="text-xl leading-relaxed text-slate-500">
                Providers that enable you to accept payment methods at a rate set
                by the third-party.
              </p>
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="mt-2 rounded-xl bg-indigo-100 px-6 py-3 text-2xl font-medium text-indigo-500 transition hover:bg-indigo-200/80"
              >
                Choose a provider
              </button>
            </div>

            {!editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!dirty}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-l-xl bg-indigo-500 p-2.5 text-white shadow-lg md:block">
            <Settings2 size={18} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-semibold text-slate-700">
              Supported payment methods
            </h3>
            <p className="text-xl text-slate-500">
              Payment methods that are available with one of approved payment
              providers.
            </p>
          </div>

          <div className="mt-7 space-y-4">
            <p className="text-2xl font-semibold text-slate-700">Default</p>

            <div className="rounded-2xl bg-slate-100 p-5 md:p-7">
              <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex h-11 w-16 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                  <CreditCard size={24} />
                </div>
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="text-2xl font-medium text-indigo-500 hover:text-indigo-600"
                >
                  Activate {defaultGateway.label}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-6 text-slate-700 md:grid-cols-3">
                <SummaryCell title="Provider" value={defaultGateway.label} />
                <SummaryStatus
                  title="Status"
                  enabled={gateways[defaultGateway.id]?.enabled}
                />
                <SummaryCell title="Transaction Fee" value={defaultGateway.fee} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="rounded-xl bg-indigo-100 px-6 py-3 text-2xl font-medium text-indigo-500 transition hover:bg-indigo-200/80"
            >
              Add payment methods
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-800">
              Gateway Credentials
            </h3>
            <span className="text-sm text-slate-500">
              {editMode ? "Edit Mode Enabled" : "Read Only"}
            </span>
          </div>

          <div className="space-y-5">
            <GatewaySimple
              title="Razorpay"
              editMode={editMode}
              data={gateways.razorpay}
              onChange={(val) => {
                setDirty(true);
                setGateways((p) => ({ ...p, razorpay: val }));
              }}
              secret={secrets.razorpay}
              setSecret={(val) => {
                setDirty(true);
                setSecrets((s) => ({ ...s, razorpay: val }));
              }}
              showSecret={showSecret.razorpay}
              toggleSecret={() =>
                setShowSecret((s) => ({ ...s, razorpay: !s.razorpay }))
              }
            />

            <GatewaySimple
              title="Cashfree"
              editMode={editMode}
              data={gateways.cashfree}
              onChange={(val) => {
                setDirty(true);
                setGateways((p) => ({ ...p, cashfree: val }));
              }}
              secret={secrets.cashfree}
              setSecret={(val) => {
                setDirty(true);
                setSecrets((s) => ({ ...s, cashfree: val }));
              }}
              showSecret={showSecret.cashfree}
              toggleSecret={() =>
                setShowSecret((s) => ({ ...s, cashfree: !s.cashfree }))
              }
            />

            <GatewayPhonePe
              editMode={editMode}
              data={gateways.phonepe}
              onChange={(val) => {
                setDirty(true);
                setGateways((p) => ({ ...p, phonepe: val }));
              }}
              secret={secrets.phonepe}
              setSecret={(val) => {
                setDirty(true);
                setSecrets((s) => ({ ...s, phonepe: val }));
              }}
              showSecret={showSecret.phonepe}
              toggleSecret={() =>
                setShowSecret((s) => ({ ...s, phonepe: !s.phonepe }))
              }
            />

            <GatewaySimple
              title="PayU"
              editMode={editMode}
              data={gateways.payu}
              onChange={(val) => {
                setDirty(true);
                setGateways((p) => ({ ...p, payu: val }));
              }}
              secret={secrets.payu}
              setSecret={(val) => {
                setDirty(true);
                setSecrets((s) => ({ ...s, payu: val }));
              }}
              showSecret={showSecret.payu}
              toggleSecret={() =>
                setShowSecret((s) => ({ ...s, payu: !s.payu }))
              }
            />

            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <p className="font-medium text-slate-800">Cash On Delivery</p>
                <p className="text-sm text-slate-500">Enable COD checkout flow</p>
              </div>
              <ToggleSwitch
                checked={gateways.cod.enabled}
                disabled={!editMode}
                onChange={(val) => {
                  setDirty(true);
                  setGateways((p) => ({ ...p, cod: { enabled: val } }));
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </SettingsLayout>
  );
}

function SummaryCell({ title, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function SummaryStatus({ title, enabled }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <span
        className={`mt-2 inline-flex rounded-md px-3 py-1 text-sm font-medium ${
          enabled
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {enabled ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

function GatewaySimple({
  title,
  editMode,
  data,
  onChange,
  secret,
  setSecret,
  showSecret,
  toggleSecret,
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-medium text-slate-800">{title}</div>
        <ToggleSwitch
          checked={data.enabled}
          disabled={!editMode}
          onChange={(val) => onChange({ ...data, enabled: val })}
        />
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={data.key}
          disabled={!editMode}
          onChange={(e) => onChange({ ...data, key: e.target.value })}
          placeholder={`${title} Key`}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:bg-slate-50"
        />

        {editMode && (
          <div className="relative">
            <input
              type={showSecret ? "text" : "password"}
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder={`${title} Secret`}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm text-slate-700"
            />
            <button
              type="button"
              onClick={toggleSecret}
              className="absolute right-3 top-2.5 text-slate-500"
            >
              {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function GatewayPhonePe({
  editMode,
  data,
  onChange,
  secret,
  setSecret,
  showSecret,
  toggleSecret,
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-medium text-slate-800">PhonePe</div>
        <ToggleSwitch
          checked={data.enabled}
          disabled={!editMode}
          onChange={(val) => onChange({ ...data, enabled: val })}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <input
          type="text"
          value={data.merchant_id}
          disabled={!editMode}
          onChange={(e) => onChange({ ...data, merchant_id: e.target.value })}
          placeholder="Merchant ID"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:bg-slate-50"
        />

        <input
          type="text"
          value={data.client_id}
          disabled={!editMode}
          onChange={(e) => onChange({ ...data, client_id: e.target.value })}
          placeholder="Client ID"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:bg-slate-50"
        />

        <input
          type="text"
          value={data.client_version}
          disabled={!editMode}
          onChange={(e) => onChange({ ...data, client_version: e.target.value })}
          placeholder="Client Version"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:bg-slate-50"
        />

        <input
          type="text"
          value={data.base_url}
          disabled={!editMode}
          onChange={(e) => onChange({ ...data, base_url: e.target.value })}
          placeholder="Base URL"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:bg-slate-50"
        />
      </div>

      {editMode && (
        <div className="relative mt-3">
          <input
            type={showSecret ? "text" : "password"}
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Client Secret"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm text-slate-700"
          />
          <button
            type="button"
            onClick={toggleSecret}
            className="absolute right-3 top-2.5 text-slate-500"
          >
            {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}

function ToggleSwitch({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        checked ? "bg-indigo-500" : "bg-slate-300"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
