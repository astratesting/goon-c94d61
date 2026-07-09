import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-warm flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-50 mb-6">
          <svg className="w-8 h-8 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-surface-text font-manrope mb-2">Check your email</h1>
        <p className="text-slate-secondary mb-8">
          We&apos;ve sent a verification link to your email address. Click the link to verify your account and access your dashboard.
        </p>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <p className="text-sm text-slate-secondary mb-4">
            Didn&apos;t receive the email? Check your spam folder or click below to resend.
          </p>
          <button className="btn-violet w-full">Resend Verification Email</button>
        </div>
        <Link href="/auth/signin" className="text-violet font-medium hover:underline text-sm">
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}
