import Link from "next/link";
import type { SVGProps } from "react";
import AdminLoginForm from "./AdminLoginForm";

export const metadata = {
  title: "Admin Login | Raahi Trail",
  description: "Sign in to the Raahi Trail admin dashboard.",
};

export default function AdminLoginPage() {
  return (
    <div data-testid="admin-login-page" className="pt-16 md:pt-20">
      <section className="min-h-[calc(100vh-5rem)] bg-brand-paper py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
              Admin access
            </p>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-brand-ink tracking-tight leading-[0.95]">
              Welcome back, trip captain.
            </h1>
            <p className="mt-5 text-lg text-brand-ink/65 leading-relaxed">
              Sign in with your admin username and password. Your session is
              kept in a secure HTTP-only cookie.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-black/5 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_24px_70px_rgb(10_10_10/0.08)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-full bg-brand-green-subtle text-brand-green flex items-center justify-center">
                  <LockIcon />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-brand-ink tracking-tight">
                    Login
                  </h2>
                  <p className="text-sm text-brand-ink/55">
                    Enter your admin credentials.
                  </p>
                </div>
              </div>

              <AdminLoginForm />

              <p className="mt-6 text-sm text-center text-brand-ink/60">
                Need to create an admin?{" "}
                <Link
                  href="/admin/register"
                  className="font-semibold text-brand-green hover:text-brand-ink transition"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
