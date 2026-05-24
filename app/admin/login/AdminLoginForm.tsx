"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    const data = (await response.json()) as { error?: string };
    setIsSubmitting(false);

    if (!response.ok) {
      setError(data.error ?? "Unable to login.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Field
        label="Username"
        name="username"
        type="text"
        testId="admin-login-username"
        autoComplete="username"
        required
      />
      <Field
        label="Password"
        name="password"
        type="password"
        testId="admin-login-password"
        autoComplete="current-password"
        required
      />

      {error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        data-testid="admin-login-submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:bg-brand-ink hover:text-brand-yellow transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  testId,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type: string;
  testId: string;
  autoComplete: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={testId}
        className="text-xs uppercase tracking-widest font-bold text-brand-ink/60 mb-2 block"
      >
        {label}
      </label>
      <input
        id={testId}
        name={name}
        data-testid={testId}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-brand-paper focus:border-brand-ink focus:bg-white outline-none text-sm"
      />
    </div>
  );
}
