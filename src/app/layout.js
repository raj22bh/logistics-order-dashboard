import "./globals.css";

export const metadata = {
  title: "ShipFlow — Logistics Order Management",
  description:
    "Create and preview logistics shipment orders in real-time. A modern, design-focused order management interface.",
  keywords: "logistics, shipment, order form, tracking, delivery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
