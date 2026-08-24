"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [predictedProfit, setPredictedProfit] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a CSV file.");
      return;
    }

    setLoading(true);
    setMessage("");
    setMetrics(null);
    setPredictedProfit(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Step 1: Upload CSV
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.detail?.message ||
            data.detail ||
            "Upload failed."
        );
        return;
      }

      // Step 2: Show business metrics
      setMetrics(data.metrics);
      setMessage("CSV processed successfully.");

      // Step 3: Send metrics to ML prediction API
      const predictionResponse = await fetch(
        "http://127.0.0.1:8000/ml/predict-profit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Quantity: Number(data.metrics.total_sales),
            Revenue: Number(data.metrics.total_revenue),
            Expense: Number(data.metrics.total_expense),
          }),
        }
      );

      const predictionData = await predictionResponse.json();

      if (!predictionResponse.ok) {
        console.error("Prediction error:", predictionData);
        setMessage(
          "CSV processed successfully, but profit prediction failed."
        );
        return;
      }

      // Step 4: Save predicted profit
      setPredictedProfit(
        Number(predictionData.predicted_profit)
      );

      setMessage(
        "CSV processed and profit prediction completed successfully."
      );
    } catch (error) {
      console.error("EVORA error:", error);

      setMessage(
        "Unable to connect to EVORA backend."
      );

      setMetrics(null);
      setPredictedProfit(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight">
            EVORA
          </h1>

          <p className="mt-3 text-xl text-slate-300">
            AI Business Intelligence & Decision Optimization System
          </p>

          <p className="mt-4 text-slate-400">
            Transform business data into meaningful insights.
          </p>
        </section>

        {/* Upload */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-2">
            Upload Business Data
          </h2>

          <p className="text-slate-400 mb-6">
            Upload a CSV file containing your business data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="file"
              accept=".csv"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
              className="block w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm"
            />

            <button
              onClick={uploadFile}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Upload CSV"}
            </button>
          </div>

          {message && (
            <p className="mt-4 text-sm text-slate-300">
              {message}
            </p>
          )}
        </section>

        {/* Metrics */}
        {metrics && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-6">
              Business Metrics
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <MetricCard
                title="Revenue"
                value={`₹${Number(
                  metrics.total_revenue
                ).toLocaleString("en-IN")}`}
              />

              <MetricCard
                title="Expense"
                value={`₹${Number(
                  metrics.total_expense
                ).toLocaleString("en-IN")}`}
              />

              <MetricCard
                title="Profit"
                value={`₹${Number(
                  metrics.total_profit
                ).toLocaleString("en-IN")}`}
              />

              <MetricCard
                title="Sales"
                value={Number(
                  metrics.total_sales
                ).toLocaleString("en-IN")}
              />

              {/* ML Prediction */}
              <MetricCard
                title="Predicted Profit"
                value={
                  predictedProfit !== null
                    ? `₹${predictedProfit.toLocaleString("en-IN")}`
                    : "Calculating..."
                }
              />

            </div>
          </section>
        )}

        {/* ML Status */}
        {predictedProfit !== null && (
          <section className="mt-8 rounded-2xl border border-blue-800 bg-blue-950/30 p-6">
            <h2 className="text-xl font-semibold">
              🤖 AI Profit Prediction
            </h2>

            <p className="mt-2 text-slate-300">
              EVORA ML model predicts the future profit based
              on the uploaded business data.
            </p>

            <p className="mt-4 text-3xl font-bold text-blue-400">
              ₹{predictedProfit.toLocaleString("en-IN")}
            </p>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500">
          EVORA — AI Business Intelligence & Decision Optimization System
        </footer>

      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}