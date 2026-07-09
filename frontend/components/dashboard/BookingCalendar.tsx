"use client";

import { useState } from "react";

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM"];

export default function BookingCalendar({ onBook }: { onBook: (slot: { date: Date; time: string }) => void }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  if (!selectedDate) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-surface-text font-manrope mb-4">Select a Date</h3>
        <input type="date" onChange={(e) => { if (e.target.value) setSelectedDate(new Date(e.target.value)); }} className="input-warm" min={new Date().toISOString().split("T")[0]} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-surface-text font-manrope mb-4">
          Available Times for {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {timeSlots.map((slot) => (
            <button key={slot} onClick={() => setSelectedTime(slot)} className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${selectedTime === slot ? "border-violet bg-violet-50 text-violet" : "border-gray-200 text-surface-text hover:border-violet/30"}`}>{slot}</button>
          ))}
        </div>
      </div>
      {selectedTime && (
        <button onClick={() => onBook({ date: selectedDate, time: selectedTime })} className="btn-violet w-full py-3">Confirm Booking — {selectedDate.toLocaleDateString()} at {selectedTime}</button>
      )}
      <button onClick={() => { setSelectedDate(null); setSelectedTime(""); }} className="text-sm text-slate-secondary hover:text-violet">← Change date</button>
    </div>
  );
}
