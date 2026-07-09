import BookingCalendar from "@/components/dashboard/BookingCalendar";

export default function BookingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-surface-text font-manrope">Book a Demo</h1>
      <BookingCalendar onBook={(slot) => console.log("Book:", slot)} />
    </div>
  );
}
