import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  DollarSign,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";
import { format, addDays } from "date-fns";
import { staggerContainer, fadeInUp } from "../../animations";
import KPICard from "../../components/ui/KPICard";
import LowStockAlerts from "./LowStockAlerts";
import RecentMovements from "./RecentMovements";
import MovementBarChart from "../../components/charts/MovementBarChart";
import ValuationPieChart from "../../components/charts/ValuationPieChart";
import api from "../../api/axiosInstance";

export default function StockDashboard() {
  const [kpis, setKpis] = useState({
    items: null,
    stockValue: null,
    lowStock: null,
    pendingMRs: null,
  });

  const [warehouseValues, setWarehouseValues] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [expiringBatches, setExpiringBatches] = useState([]);
  const [loadingKpis, setLoadingKpis] = useState(true);

  const fetchKPIs = async () => {
    setLoadingKpis(true);

    try {
      const [itemsRes, binsRes, mrRes] = await Promise.allSettled([
        api.get("/api/resource/Item", {
          params: {
            fields: JSON.stringify(["name"]),
          },
        }),

        api.get("/api/resource/Bin", {
          params: {
            fields: JSON.stringify([
              "stock_value",
              "actual_qty",
              "item_code",
              "warehouse",
            ]),
            limit: 500,
          },
        }),

        api.get("/api/resource/Material Request", {
          params: {
            filters: JSON.stringify([["status", "=", "Submitted"]]),
            limit: 1,
            fields: JSON.stringify(["name"]),
          },
        }),
      ]);

      console.log("KPI API results:", { itemsRes });

      const totalItems =
        itemsRes.status === "fulfilled"
          ? itemsRes.value.data?.data?.length || 0
          : 0;

      const bins =
        binsRes.status === "fulfilled" ? binsRes.value.data?.data || [] : [];

      const totalValue = bins.reduce(
        (sum, bin) => sum + (parseFloat(bin.stock_value) || 0),
        0,
      );

      const lowStock = bins.filter(
        (bin) => (parseFloat(bin.actual_qty) || 0) <= 0,
      ).length;

      const pendingMRs =
        mrRes.status === "fulfilled" ? mrRes.value.data?.total_count || 0 : 0;

      setKpis({
        items: totalItems,
        stockValue: totalValue,
        lowStock,
        pendingMRs,
      });
    } catch (error) {
      console.error("Error fetching KPIs:", error);
    } finally {
      setLoadingKpis(false);
    }
  };

  const fetchWarehouseValues = async () => {
    try {
      const res = await api.get("/api/resource/Bin", {
        params: {
          fields: JSON.stringify(["warehouse", "stock_value"]),
          limit: 500,
        },
      });

      const bins = res.data?.data || [];

      const agg = bins.reduce((acc, bin) => {
        const warehouse =
          bin.warehouse?.split(" - ")?.[0] || bin.warehouse || "Unknown";

        acc[warehouse] =
          (acc[warehouse] || 0) + (parseFloat(bin.stock_value) || 0);

        return acc;
      }, {});

      setWarehouseValues(
        Object.entries(agg)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 8),
      );
    } catch (error) {
      console.error("Error fetching warehouse values:", error);
    }
  };

  const fetchTopItems = async () => {
    try {
      const res = await api.get("/api/resource/Bin", {
        params: {
          fields: JSON.stringify(["item_code", "stock_value"]),
          limit: 500,
          order_by: "stock_value desc",
        },
      });

      const bins = res.data?.data || [];

      const agg = bins.reduce((acc, bin) => {
        acc[bin.item_code] =
          (acc[bin.item_code] || 0) + (parseFloat(bin.stock_value) || 0);

        return acc;
      }, {});

      setTopItems(
        Object.entries(agg)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 8),
      );
    } catch (error) {
      console.error("Error fetching top items:", error);
    }
  };

  const fetchExpiringBatches = async () => {
    try {
      const thirtyDays = format(addDays(new Date(), 30), "yyyy-MM-dd");

      const res = await api.get("/api/resource/Batch", {
        params: {
          fields: JSON.stringify(["name", "item", "expiry_date", "batch_qty"]),
          filters: JSON.stringify([
            ["expiry_date", "<=", thirtyDays],
            ["expiry_date", "!=", ""],
          ]),
          order_by: "expiry_date asc",
          limit: 10,
        },
      });

      setExpiringBatches(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching expiring batches:", error);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      await Promise.all([
        fetchKPIs(),
        fetchWarehouseValues(),
        fetchTopItems(),
        fetchExpiringBatches(),
      ]);
    };

    loadDashboard();
  }, []);
  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* KPI Row */}
      <div
        className="grid grid-cols-2 gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        <KPICard
          label="Total Items"
          value={kpis.items}
          icon={Package}
          loading={loadingKpis}
        />

        <KPICard
          label="Total Stock Value"
          value={kpis.stockValue}
          icon={DollarSign}
          prefix="$"
          loading={loadingKpis}
        />

        <KPICard
          label="Low / Zero Stock"
          value={kpis.lowStock}
          icon={AlertTriangle}
          loading={loadingKpis}
        />

        <KPICard
          label="Pending Material Requests"
          value={kpis.pendingMRs}
          icon={ClipboardList}
          loading={loadingKpis}
        />
      </div>

      {/* Charts */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <motion.div className="glass-card p-6" variants={fadeInUp}>
          <h3 className="section-heading mb-4">Stock Value by Warehouse</h3>

          <MovementBarChart
            data={warehouseValues}
            dataKey="value"
            nameKey="name"
          />
        </motion.div>

        <motion.div className="glass-card p-6" variants={fadeInUp}>
          <h3 className="section-heading mb-4">Top Items by Stock Value</h3>

          <ValuationPieChart data={topItems} nameKey="name" valueKey="value" />
        </motion.div>
      </div>

      {/* Alerts & Recent Activity */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
        }}
      >
        <LowStockAlerts />
        <RecentMovements />
      </div>

      {/* Expiring Batches */}
      {expiringBatches.length > 0 && (
        <motion.div className="glass-card p-6" variants={fadeInUp}>
          <h3 className="section-heading mb-4">Expiring Batches</h3>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Item</th>
                  <th>Expiry Date</th>
                  <th>Qty</th>
                  <th>Urgency</th>
                </tr>
              </thead>

              <tbody>
                {expiringBatches.map((batch) => {
                  const daysLeft = Math.ceil(
                    (new Date(batch.expiry_date) - new Date()) / 86400000,
                  );

                  return (
                    <tr key={batch.name}>
                      <td className="mono-data" style={{ fontSize: "12px" }}>
                        {batch.name}
                      </td>

                      <td
                        style={{
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {batch.item}
                      </td>

                      <td className="mono-data" style={{ fontSize: "12px" }}>
                        {batch.expiry_date}
                      </td>

                      <td className="mono-data">{batch.batch_qty}</td>

                      <td>
                        <span
                          className={`badge ${daysLeft <= 7 ? "badge-error" : "badge-warning"
                            }`}
                        >
                          {daysLeft} days
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
