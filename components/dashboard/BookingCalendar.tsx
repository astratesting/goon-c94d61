"use client";

import { useState } from "react";
import DatePicker from "@/components/ui/date-picker";

interface BookingCalendarProps {
  onBook: (slot: { date: Date; time: string }) => void;
  existingBookings?: string[];
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM",
];

const bookedSlots = [
  "10:00 AM", "2:00 PM",
];

export default function BookingCalendar({ onBook, existingBookings = [] }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);

  const allBooked = [...bookedSlots, ...existingBookings];

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    onBook({ date: selectedDate, time: selectedTime });
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-surface-text font-manrope mb-2">Demo Booked! 🎉</h3>
        <p className="text-slate-secondary mb-6">
          Your demo call is confirmed for{" "}
          <strong>{selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</strong>{" "}
          at <strong>{selectedTime}</strong>.
        </p>
        <p className="text-sm text-slate-secondary">A calendar invite and confirmation email have been sent.</p>
        <button
          onClick={() => { setConfirmed(false); setSelectedDate(null); setSelectedTime(""); }}
          className="btn-violet mt-6"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-surface-text font-manrope mb-3">Select a Date</h3>
          <DatePicker selected={selectedDate} onChange={setSelectedDate} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-surface-text font-manrope mb-3">Available Times</h3>
          {selectedDate ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <p className="text-sm text-slate-secondary mb-4">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const isBooked = allBooked.includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => !isBooked && setSelectedTime(slot)}
                      disabled={isBooked}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                        selectedTime === slot
                          ? "border-violet bg-violet-50 text-violet"
                          : isBooked
                            ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                            : "border-gray-200 text-surface-text hover:border-violet/30"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-slate-secondary">Select a date to see available times</p>
            </div>
          )}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className="bg-violet-50 rounded-2xl border border-violet-100 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-violet font-medium">Selected Slot</p>
            <p className="text-lg font-semibold text-surface-text font-manrope">
              {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
            </p>
          </div>
          <button onClick={handleConfirm} className="btn-violet">
            Confirm Booking →
          </button>
        </div>
      )}
    </div>
  );
}
