"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  User,
  Lock,
  Eye,
  EyeSlash,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Check,
  WarningCircle,
  Sparkle,
  Fingerprint,
} from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthFormProps {
  initialMode?: "login" | "signup";
}

export default function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Password strength logic for sign up
  const passwordCriteria = useMemo(() => {
    return {
      hasLength: password.length >= 8,
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^a-zA-Z0-9]/.test(password),
    };
  }, [password]);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (passwordCriteria.hasLength) score += 1;
    if (passwordCriteria.hasLetter) score += 1;
    if (passwordCriteria.hasNumber) score += 1;
    if (passwordCriteria.hasSpecial) score += 1;
    return score;
  }, [passwordCriteria]);

  const passwordMatch = useMemo(() => {
    if (!confirmPassword) return null;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validation
    const cleanUsername = username.trim();
    if (!cleanUsername) {
      setErrorMessage("Please enter a valid username.");
      return;
    }
    if (cleanUsername.length < 3) {
      setErrorMessage("Username must be at least 3 characters long.");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      setErrorMessage("Username can only contain letters, numbers, and underscores.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    if (mode === "signup") {
      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      if (!agreeTerms) {
        setErrorMessage("You must agree to the Terms of Service and Privacy Policy.");
        return;
      }
    }

    setIsLoading(true);

    // Save session to localStorage and simulate authentication processing
    setTimeout(() => {
      setIsLoading(false);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "escrow_user",
          JSON.stringify({ username: cleanUsername, role: "Institutional Trader" })
        );
      }
      if (mode === "login") {
        setSuccessMessage(`Welcome back, @${cleanUsername}! Redirecting to your escrow dashboard...`);
      } else {
        setSuccessMessage(`Account created successfully for @${cleanUsername}! Preparing your vault...`);
      }
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040907] relative overflow-hidden bg-grid-pattern selection:bg-[#00F59B]/20 selection:text-[#00F59B]">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00F59B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Persistent Global Header */}
      <Header />

      {/* Main Container with generous top/bottom padding to fit fixed Header */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24 relative z-10 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand & Security Guarantee Highlights (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 space-y-8 pr-4">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {mode === "login"
                  ? "Access your protected escrow transactions."
                  : "Start trading with cryptographic certainty."}
              </h1>
              <p className="text-base text-slate-300 leading-relaxed">
                Whether you are releasing milestones, trading crypto, or acquiring high-ticket merchandise, funds move only when both sides confirm.
              </p>
            </div>

            {/* Value Checkpoints */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#091510] border border-white/10">
                <div className="p-2 rounded-xl bg-emerald-950/80 text-[#00F59B] border border-emerald-500/30 shrink-0">
                  <ShieldCheck weight="bold" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Multi-Sig Vault Protection</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Threshold keys ensure zero unauthorized movements of locked crypto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#091510] border border-white/10">
                <div className="p-2 rounded-xl bg-emerald-950/80 text-[#00F59B] border border-emerald-500/30 shrink-0">
                  <Fingerprint weight="bold" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Zero Chargeback Risk</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Irrevocable locked deposits protect sellers from payment recalls.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <Lock weight="bold" className="w-4 h-4 text-[#00F59B]" />
              <span>256-bit encrypted secure session</span>
            </div>
          </div>

          {/* Right Column: Interactive Login / Sign Up Card */}
          <div className="lg:col-span-7 max-w-lg mx-auto w-full">
            <div className="bg-[#091510] rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Card Header & Switcher */}
              <div className="space-y-6 mb-8">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {mode === "login" ? "Sign in to Escrow Bay" : "Create your account"}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1.5">
                    {mode === "login"
                      ? "Enter your username and password to access your agreements."
                      : "Create your secure escrow identity in seconds."}
                  </p>
                </div>

                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#040806] rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className={`py-2.5 text-sm sm:text-base font-semibold rounded-lg transition-all cursor-pointer ${
                      mode === "login"
                        ? "bg-[#00F59B] text-[#04100C] shadow-md font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className={`py-2.5 text-sm sm:text-base font-semibold rounded-lg transition-all cursor-pointer ${
                      mode === "signup"
                        ? "bg-[#00F59B] text-[#04100C] shadow-md font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Success Feedback Alert */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-[#00F59B]/50 flex items-start gap-3 animate-fade-in">
                  <CheckCircle weight="bold" className="w-5 h-5 text-[#00F59B] shrink-0 mt-0.5" />
                  <div className="text-sm text-emerald-200 font-medium">
                    {successMessage}
                  </div>
                </div>
              )}

              {/* Error Feedback Alert */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-500/50 flex items-start gap-3 animate-fade-in">
                  <WarningCircle weight="bold" className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-sm text-red-200 font-medium">
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <User weight="bold" className="w-5 h-5" />
                    </div>
                    <Input
                      type="text"
                      name="username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Satoshi99"
                      className="pl-12 pr-4 h-13 bg-[#040806] border-white/15 focus:border-[#00F59B] text-white placeholder:text-slate-600 rounded-xl text-base"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-200">
                      Password
                    </label>
                    {mode === "login" && (
                      <Link
                        href="/forgot-password"
                        className="text-xs font-semibold text-[#00F59B] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock weight="bold" className="w-5 h-5" />
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-12 pr-12 h-13 bg-[#040806] border-white/15 focus:border-[#00F59B] text-white placeholder:text-slate-600 rounded-xl text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeSlash weight="bold" className="w-5 h-5" />
                      ) : (
                        <Eye weight="bold" className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator (Sign Up Only) */}
                  {mode === "signup" && password.length > 0 && (
                    <div className="mt-3 space-y-2 animate-fade-in">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Password strength:</span>
                        <span
                          className={`font-semibold ${
                            passwordScore <= 1
                              ? "text-red-400"
                              : passwordScore <= 3
                              ? "text-amber-400"
                              : "text-[#00F59B]"
                          }`}
                        >
                          {passwordScore <= 1
                            ? "Weak"
                            : passwordScore <= 3
                            ? "Good"
                            : "Strong"}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordScore <= 1
                              ? "bg-red-500 w-1/4"
                              : passwordScore <= 2
                              ? "bg-amber-500 w-2/4"
                              : passwordScore <= 3
                              ? "bg-amber-400 w-3/4"
                              : "bg-[#00F59B] w-full"
                          }`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
                        <span className={`flex items-center gap-1.5 ${passwordCriteria.hasLength ? "text-emerald-400" : ""}`}>
                          <Check weight="bold" className={`w-3.5 h-3.5 ${passwordCriteria.hasLength ? "opacity-100" : "opacity-30"}`} />
                          8+ characters
                        </span>
                        <span className={`flex items-center gap-1.5 ${passwordCriteria.hasNumber ? "text-emerald-400" : ""}`}>
                          <Check weight="bold" className={`w-3.5 h-3.5 ${passwordCriteria.hasNumber ? "opacity-100" : "opacity-30"}`} />
                          Includes numbers
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field (Sign Up Only) */}
                {mode === "signup" && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock weight="bold" className="w-5 h-5" />
                      </div>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className={`pl-12 pr-12 h-13 bg-[#040806] border-white/15 focus:border-[#00F59B] text-white placeholder:text-slate-600 rounded-xl text-base ${
                          passwordMatch === false
                            ? "border-red-500/80"
                            : passwordMatch === true
                            ? "border-[#00F59B]/80"
                            : ""
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeSlash weight="bold" className="w-5 h-5" />
                        ) : (
                          <Eye weight="bold" className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {passwordMatch === false && (
                      <p className="text-xs text-red-400 mt-1.5">Passwords do not match.</p>
                    )}
                  </div>
                )}

                {/* Remember Me (Login) or Terms Checkbox (Sign Up) */}
                {mode === "login" ? (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-white/20 bg-[#040806] text-[#00F59B] accent-[#00F59B] cursor-pointer"
                      />
                      <span>Remember this device for 30 days</span>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 text-xs text-slate-300 select-none">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-white/20 bg-[#040806] text-[#00F59B] accent-[#00F59B] cursor-pointer shrink-0"
                    />
                    <label htmlFor="agreeTerms" className="cursor-pointer leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#00F59B] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#00F59B] hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>
                )}

                {/* Submit Action Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full h-14 text-base font-bold rounded-xl shadow-lg transition-all duration-200 mt-2"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-[#04100C]">
                      <div className="w-5 h-5 border-2 border-[#04100C] border-t-transparent rounded-full animate-spin" />
                      <span>{mode === "login" ? "Authenticating..." : "Creating Account..."}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-[#04100C]">
                      <Lock weight="bold" className="w-4 h-4" />
                      <span>{mode === "login" ? "Sign In" : "Create Escrow Account"}</span>
                      <ArrowRight weight="bold" className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                {/* Switcher Footnote */}
                <div className="text-center pt-2 text-sm text-slate-400">
                  {mode === "login" ? (
                    <span>
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setMode("signup");
                          setErrorMessage("");
                          setSuccessMessage("");
                        }}
                        className="text-[#00F59B] font-semibold hover:underline cursor-pointer ml-1"
                      >
                        Create one now
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setMode("login");
                          setErrorMessage("");
                          setSuccessMessage("");
                        }}
                        className="text-[#00F59B] font-semibold hover:underline cursor-pointer ml-1"
                      >
                        Sign in here
                      </button>
                    </span>
                  )}
                </div>

              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
