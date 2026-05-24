import Link from "next/link";
import type { SVGProps } from "react";
import AdminRegisterForm from "./AdminRegisterForm";

export const metadata = {
  title: "Register Admin | Raahi Trail",
  description: "Create a Raahi Trail admin account.",
};

export default function AdminRegisterPage() {
  return (
    <div data-testid="admin-register-page" className="pt-16 md:pt-20">
      <section className="min-h-[calc(100vh-5rem)] bg-brand-paper py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
              Admin setup
            </p>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-brand-ink tracking-tight leading-[0.95]">
              Create a private admin account.
            </h1>
            <p className="mt-5 text-lg text-brand-ink/65 leading-relaxed">
              Use the registration secret key from your environment to keep
              admin creation controlled.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-black/5 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_24px_70px_rgb(10_10_10/0.08)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-full bg-brand-green-subtle text-brand-green flex items-center justify-center">
                  <KeyIcon />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-brand-ink tracking-tight">
                    Register admin
                  </h2>
                  <p className="text-sm text-brand-ink/55">
                    Add username, password, and secret key.
                  </p>
                </div>
              </div>

              <AdminRegisterForm />

              <p className="mt-6 text-sm text-center text-brand-ink/60">
                Already have access?{" "}
                <Link
                  href="/admin/login"
                  className="font-semibold text-brand-green hover:text-brand-ink transition"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function KeyIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}
