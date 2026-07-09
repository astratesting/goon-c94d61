"use client";

import { useState, useMemo } from "react";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  className?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function DatePicker({ selected, onChange, minDate, className = "" }: DatePickerProps) {
  const [viewDate, setViewDate] = useState(selected || new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const min = minDate ? new Date(minDate) : today;
  min.setHours(0, 0, 0, 0);

  const days = useMemo(() => {
    const result: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(d);
    return result;
  }, [firstDay, daysInMonth]);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDate = (day: number) => {
    const d = new Date(year, month, day);
    if (d < min) return;
    onChange(d);
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      selected.getDate() === day &&
      selected.getMonth() === month &&
      selected.getFullYear() === year
    );
  };

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    return d < min;
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-slate-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-sm font-semibold text-surface-text font-manrope">
          {MONTHS[month]} {year}
        </h3>
        <button type="button" onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-slate-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-slate-secondary py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) =>
          day === null ? (
            <div key={`empty-${i}`} />
          ) : (
            <button
              key={day}
              type="button"
              onClick={() => selectDate(day)}
              disabled={isDisabled(day)}
              className={`h-10 w-full rounded-lg text-sm font-medium transition-all duration-150 ${
                isSelected(day)
                  ? "bg-violet text-white shadow-md"
                  : isDisabled(day)
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-surface-text hover:bg-violet-50"
              }`}
            >
              {day}
            </button>
          )
        )}
      </div>
    </div>
  );
}
