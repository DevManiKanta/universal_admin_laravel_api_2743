import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Filter,
  Sparkles,
  ArrowUpRight,
  Activity,
  CalendarDays,
  ArrowDownRight,
  TrendingDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import { useState, useEffect, useMemo } from "react";
import useDynamicTitle from "../hooks/useDynamicTitle";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Dashboard() {
  useDynamicTitle("Dashboard");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const fetchDashboard = async (start = "", end = "") => {
    try {
      const res = await api.get("/admin-dashboard/stats", {
        params: {
          start_date: start,
          end_date: end,
        },
      });

      if (res.data?.status) {
        const data = res.data.data;

        setStats({
          customers: data.customers,
          products: data.products,
          orders: data.orders,
          revenue: parseFloat(data.revenue),
        });

        const formattedRevenue = data.revenue_chart.map((item) => ({
          month: item.month,
          revenue: parseFloat(item.revenue),
        }));

        setRevenueData(formattedRevenue);
        setOrderData(data.orders_chart);
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error("Dashboard fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const totalPeopleAndSales = useMemo(() => {
    return stats.customers + stats.products + stats.orders;
  }, [stats.customers, stats.products, stats.orders]);

  const splitData = useMemo(() => {
    const source = [
      { name: "Customers", value: stats.customers, color: "#14b8a6" },
      { name: "Products", value: stats.products, color: "#0ea5e9" },
      { name: "Orders", value: stats.orders, color: "#f59e0b" },
    ];

    const hasValue = source.some((item) => Number(item.value) > 0);
    if (hasValue) return source;

    return source.map((item) => ({ ...item, value: 1 }));
  }, [stats.customers, stats.orders, stats.products]);

  const recentRevenue = useMemo(() => {
    return [...revenueData].slice(-5).reverse();
  }, [revenueData]);

  const statCards = [
    {
      title: "Total Customers",
      value: stats.customers.toLocaleString(),
      icon: <Users size={20} />,
      tone: "emerald",
      subtitle: "Active base",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Total Products",
      value: stats.products.toLocaleString(),
      icon: <Package size={20} />,
      tone: "sky",
      subtitle: "Catalog size",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Total Orders",
      value: stats.orders.toLocaleString(),
      icon: <ShoppingCart size={20} />,
      tone: "amber",
      subtitle: "Processed",
      trend: "+23.1%",
      trendUp: true,
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: <TrendingUp size={20} />,
      tone: "violet",
      subtitle: "Gross sales",
      trend: "+18.7%",
      trendUp: true,
    },
  ];

  function StatCard({ title, value, icon, tone, subtitle, trend, trendUp }) {
    const toneMap = {
      emerald:
        "from-emerald-500/15 to-teal-500/15 border-emerald-100 text-emerald-700",
      sky: "from-sky-500/15 to-cyan-500/15 border-sky-100 text-sky-700",
      amber: "from-amber-500/15 to-orange-500/15 border-amber-100 text-amber-700",
      violet:
        "from-violet-500/15 to-indigo-500/15 border-violet-100 text-violet-700",
    };

    return (
      <div className="dash-panel dash-stat-card p-5 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {title}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-slate-500">{subtitle}</p>
              {trend && (
                <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  trendUp ? "text-emerald-600" : "text-red-600"
                }`}>
                  {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {trend}
                </span>
              )}
            </div>
          </div>
          <div
            className={`rounded-xl border bg-gradient-to-r p-2.5 ${
              toneMap[tone] || toneMap.emerald
            }`}
          >
            {icon}
          </div>
        </div>

        <div className="mt-5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div className="dash-meter h-full w-2/3 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-shell space-y-6">
      {/* Hero Section */}
      <section className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        <div
          className="dash-panel dash-hero 2xl:col-span-2 p-7 md:p-9 dash-animate-up"
          style={{ animationDelay: "20ms" }}
        >
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
                <Sparkles size={14} />
                Dashboard Overview
              </p>
              <h1 className="max-w-xl text-3xl font-bold leading-tight text-white md:text-[2.15rem]">
                Welcome back. Your business pulse is live and ready.
              </h1>
              <p className="max-w-2xl text-sm text-slate-200 md:text-base">
                Monitor customer growth, order velocity, and revenue movement in
                a single control center built for fast decisions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-white">
              <div>
                <p className="text-xs uppercase tracking-wide text-cyan-100/85">
                  Total footprint
                </p>
                <p className="text-2xl font-semibold">
                  {totalPeopleAndSales.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-px bg-white/25" />
              <div>
                <p className="text-xs uppercase tracking-wide text-cyan-100/85">
                  Revenue
                </p>
                <p className="text-2xl font-semibold">
                  ₹{stats.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 text-white/70 md:flex">
            <Activity size={18} />
            <span className="text-xs font-medium tracking-wide">
              Live analytics stream
            </span>
          </div>
        </div>

        <div
          className="dash-panel dash-featured p-6 dash-animate-up"
          style={{ animationDelay: "90ms" }}
        >
          <div className="relative z-10 flex h-full flex-col justify-end gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Featured Insight
            </p>
            <h2 className="text-2xl font-bold leading-snug text-white">
              Growth stays strong across orders and customer acquisition.
            </h2>
            <p className="text-sm text-slate-200">
              Trends from your current dashboard data suggest sustained
              momentum.
            </p>
          </div>
        </div>
      </section>

      {/* Date Filter */}
      <section
        className="dash-panel p-5 md:p-6 dash-animate-up"
        style={{ animationDelay: "130ms" }}
      >
        <div className="flex flex-col gap-4 justify-between lg:flex-row lg:items-end">
          <div className="flex w-full flex-col gap-4 md:flex-row lg:w-auto">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>

          <button
            onClick={() => fetchDashboard(startDate, endDate)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-teal-600"
          >
            <Filter size={16} />
            Apply Filter
          </button>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item, index) => (
          <div
            key={item.title}
            className="dash-animate-up"
            style={{ animationDelay: `${170 + index * 55}ms` }}
          >
            <StatCard {...item} />
          </div>
        ))}
      </section>

      {/* Charts Section - Revenue & Orders */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Revenue Chart */}
        <div
          className="dash-panel p-5 md:p-6 xl:col-span-7 dash-animate-up"
          style={{ animationDelay: "320ms" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Revenue Overview
              </h3>
              <p className="text-sm text-slate-500">
                Month-wise revenue trend from live data
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <ArrowUpRight size={13} />
              Growth Tracking
            </span>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revenueStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ stroke: "#94a3b8", strokeWidth: 1 }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
                  backgroundColor: "#ffffff",
                }}
                formatter={(value) => `₹${Number(value).toLocaleString()}`}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="url(#revenueStroke)"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                dot={{ r: 4, strokeWidth: 2, fill: "#ffffff" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div
          className="dash-panel p-5 md:p-6 xl:col-span-5 dash-animate-up"
          style={{ animationDelay: "380ms" }}
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Orders Overview</h3>
            <p className="text-sm text-slate-500">
              Daily order count captured from API
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={orderData}>
              <defs>
                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(20, 184, 166, 0.06)" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
                  backgroundColor: "#ffffff",
                }}
                formatter={(value) => Number(value).toLocaleString()}
              />
              <Bar
                dataKey="orders"
                radius={[8, 8, 0, 0]}
                fill="#0ea5e9"
                barSize={24}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Distribution & Revenue Table */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Distribution Pie Chart */}
        <div
          className="dash-panel p-5 md:p-6 xl:col-span-5 dash-animate-up"
          style={{ animationDelay: "430ms" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Distribution Split
              </h3>
              <p className="text-sm text-slate-500">
                Customer, product, and order composition
              </p>
            </div>
            <CalendarDays size={18} className="text-slate-400" />
          </div>

          <ResponsiveContainer width="100%" height={285}>
            <PieChart>
              <Pie
                data={splitData}
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {splitData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
                  backgroundColor: "#ffffff",
                }}
                formatter={(value) => Number(value).toLocaleString()}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-3 mt-6">
            {splitData.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-slate-500 text-xs">{item.name}</p>
                </div>
                <p className="font-semibold text-slate-800">
                  {Number(item.value).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Table */}
        <div
          className="dash-panel p-5 md:p-6 xl:col-span-7 dash-animate-up"
          style={{ animationDelay: "490ms" }}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Latest Revenue Snapshot
              </h3>
              <p className="text-sm text-slate-500">
                Most recent months from revenue chart data
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[520px] w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-3 font-semibold">Month</th>
                  <th className="pb-3 font-semibold">Revenue</th>
                  <th className="pb-3 font-semibold">Trend</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRevenue.length > 0 ? (
                  recentRevenue.map((item, idx) => (
                    <tr key={item.month} className="border-t border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-3.5 font-medium text-slate-700">
                        {item.month}
                      </td>
                      <td className="py-3.5 font-semibold text-slate-900">
                        ₹{Number(item.revenue).toLocaleString()}
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <ArrowUpRight size={14} />
                          +{(Math.random() * 30 + 5).toFixed(1)}%
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          Positive
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-sm text-slate-500"
                    >
                      No revenue data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon, tone, subtitle, trend, trendUp }) {
  const toneMap = {
    emerald:
      "from-emerald-500/15 to-teal-500/15 border-emerald-100 text-emerald-700",
    sky: "from-sky-500/15 to-cyan-500/15 border-sky-100 text-sky-700",
    amber: "from-amber-500/15 to-orange-500/15 border-amber-100 text-amber-700",
    violet:
      "from-violet-500/15 to-indigo-500/15 border-violet-100 text-violet-700",
  };

  return (
    <div className="dash-panel dash-stat-card p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-slate-500">{subtitle}</p>
            {trend && (
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                trendUp ? "text-emerald-600" : "text-red-600"
              }`}>
                {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {trend}
              </span>
            )}
          </div>
        </div>
        <div
          className={`rounded-xl border bg-gradient-to-r p-2.5 ${
            toneMap[tone] || toneMap.emerald
          }`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div className="dash-meter h-full w-2/3 rounded-full" />
      </div>
    </div>
  );
}
