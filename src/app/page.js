"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import ShipmentDetails from "./components/ShipmentDetails";
import PartyCard from "./components/PartyCard";
import PackageList from "./components/PackageList";
import AdditionalOptions from "./components/AdditionalOptions";
import ShipmentPreview from "./components/ShipmentPreview";
import styles from "./page.module.css";

/**
 * Generate a random order ID in format: ORD-XXXXXX
 */
function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ORD-${id}`;
}

/**
 * Get today's date formatted as YYYY-MM-DD
 */
function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Create a new empty package object with unique ID
 */
let packageCounter = 1;
function createEmptyPackage() {
  return {
    id: `pkg-${Date.now()}-${packageCounter++}`,
    name: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    declaredValue: "",
  };
}

export default function HomePage() {
  // ── Shipment Details State ──
  const [shipmentDetails, setShipmentDetails] = useState({
    orderId: "",
    shipmentDate: "",
    deliveryType: "standard",
  });

  // ── Consignor (Sender) State ──
  const [consignor, setConsignor] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ── Consignee (Receiver) State ──
  const [consignee, setConsignee] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ── Packages State ──
  const [packages, setPackages] = useState([]);

  // ── Additional Options State ──
  const [options, setOptions] = useState({
    fragile: false,
    insurance: false,
  });

  // ── Initialization ──
  useEffect(() => {
    setShipmentDetails(prev => ({
      ...prev,
      orderId: generateOrderId(),
      shipmentDate: getTodayDate(),
    }));
    setPackages([createEmptyPackage()]);
  }, []);

  // ── Handlers ──
  const handleShipmentChange = useCallback((field, value) => {
    setShipmentDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleConsignorChange = useCallback((field, value) => {
    setConsignor((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleConsigneeChange = useCallback((field, value) => {
    setConsignee((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handlePackageChange = useCallback((index, field, value) => {
    setPackages((prev) =>
      prev.map((pkg, i) => (i === index ? { ...pkg, [field]: value } : pkg))
    );
  }, []);

  const handleAddPackage = useCallback(() => {
    setPackages((prev) => [...prev, createEmptyPackage()]);
  }, []);

  const handleRemovePackage = useCallback((index) => {
    setPackages((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const handleOptionsChange = useCallback((field, value) => {
    setOptions((prev) => ({ ...prev, [field]: value }));
  }, []);

  // ── Combined Form Data for Preview ──
  const formData = useMemo(
    () => ({
      ...shipmentDetails,
      consignor,
      consignee,
      packages,
      ...options,
    }),
    [shipmentDetails, consignor, consignee, packages, options]
  );

  return (
    <div className={styles.page}>
      {/* ── Top Bar ── */}
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <span className={styles.logo}>📦</span>
          <div>
            <span className={styles.brandName}>ShipFlow</span>
            <span className={styles.brandTag}> — Order Management</span>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        {/* Left Panel — Form */}
        <div className={styles.formPanel}>
          <div className={styles.formSection}>
            <ShipmentDetails
              data={shipmentDetails}
              onChange={handleShipmentChange}
            />
          </div>

          <div className={styles.formSection}>
            <PartyCard
              type="sender"
              data={consignor}
              onChange={handleConsignorChange}
            />
          </div>

          <div className={styles.formSection}>
            <PartyCard
              type="receiver"
              data={consignee}
              onChange={handleConsigneeChange}
            />
          </div>

          <div className={styles.formSection}>
            <PackageList
              packages={packages}
              onPackageChange={handlePackageChange}
              onAddPackage={handleAddPackage}
              onRemovePackage={handleRemovePackage}
            />
          </div>

          <div className={styles.formSection}>
            <AdditionalOptions
              data={options}
              onChange={handleOptionsChange}
            />
          </div>
        </div>

        {/* Right Panel — Live Preview */}
        <aside className={styles.previewPanel}>
          <ShipmentPreview formData={formData} />
        </aside>
      </main>
    </div>
  );
}
