import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/useAuthContext";
import Button from "../components/Common/Button";
import { ButtonVariant } from "../enums/button";

interface LocationState {
  from?: {
    pathname?: string;
  };
}

function Login() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const returnTo = state?.from?.pathname ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      navigate(returnTo, { replace: true });
    } catch {
      setError("Login failed. Please check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
      <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-md sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to your Swift Cart account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

            <label className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(event) => setShowPassword(event.target.checked)}
                className="accent-orange-500"
              />
              Show password
            </label>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant={ButtonVariant.Primary}
            disabled={isSubmitting}
            className="!w-full !rounded-lg !px-4 !py-3 !font-semibold disabled:!cursor-not-allowed disabled:!opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Want to keep browsing?{" "}
          <Link
            to="/products"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            View products
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
