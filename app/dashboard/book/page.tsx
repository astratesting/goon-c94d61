"use client";

import { useState } from "react";
import BookingCalendar from "@/components/dashboard/BookingCalendar";
import { api, trackAnalytics } from "@/hooks/api";

const packages = [
  { id: "seo", name: "SEO Optimization" },
  { id: "ppc", name: "PPC Advertising" },
  { id: "social", name: "Social Media" },
  { id: "email", name: "Email Marketing" },
  { id: "content", name: "Content Creation" },
];

export default function BookPage() {
  const [selectedPackage, setSelectedPackage] = useState("ppc");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = async (slot: { date: Date; time: string }) => {
    try {
      await api.post("/api/bookings", {
        slotStart: slot.date.toISOString(),
        packageId: selectedPackage,
        notes: `Demo call for ${packages.find((p) => p.id === selectedPackage)?.name}`,
      });
      trackAnalytics("booking_created", { packageId: selectedPackage });
      setBookingSuccess(true);
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-text font-manrope">Book a Demo</h1>
        <p className="text-slate-secondary mt-1">Schedule a walkthrough of our marketing platform</p>
      </div>

      {/* Package Selection */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-surface-text font-manrope mb-4">What would you like to discuss?</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                selectedPackage === pkg.id
                  ? "border-violet bg-violet-50 text-violet"
                  : "border-gray-200 text-slate-secondary hover:border-violet/30"
              }`}
            >
              {pkg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <BookingCalendar onBook={handleBook} />

      {/* Info */}
      <div className="bg-violet-50 rounded-2xl border border-violet-100 p-6">
        <h3 className="text-lg font-semibold text-surface-text font-manrope mb-2">What to expect</h3>
        <ul className="space-y-2 text-sm text-slate-secondary">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-violet mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            30-minute personalized walkthrough
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-violet mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Custom strategy recommendations for your market
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-violet mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ROI projections and pricing breakdown
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-violet mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            No commitment required
          </li>
        </ul>
      </div>
    </div>
  );
}
