import {
  Banknote,
  Calculator,
  MonitorSmartphone,
  ShieldCheck,
  Wallet,
  Weight,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Features = () => {
  return (
    <section className="container text-center">
      <div className="py-12">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <div className="mx-auto max-w-lg lg:mx-0 lg:text-left">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <blockquote>Empower Your Finances!</blockquote>
            </h2>

            <p className="mt-4 text-gray-600">
              This budget manager app offers a robust set of features to help
              you take control of your finances. Easily track expenses, income
              and receivables, set personalized budgets, and save money. Gain
              insights with expense analysis and visualizations, and stay on
              track with goal setting. The app categorizes transactions and
              syncs data across devices securely. Whether saving for a goal or
              managing debt, our app is your trusted companion for financial
              success.
            </p>

            <Link
              href="/sign-up"
              className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Now
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 text-center">
            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-slate-200 p-3">
                <Weight />
              </span>

              <h2 className="mt-2 font-bold text-sm md:text-base">
                Budget Creation
              </h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Create you budget.
              </p>
            </div>
            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-slate-200 p-3">
                <Wallet />
              </span>

              <h2 className="mt-2 font-bold text-sm md:text-base">
                Expense Tracking
              </h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Track your expenses.
              </p>
            </div>
            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-slate-200 p-3">
                <Calculator />
              </span>

              <h2 className="mt-2 font-bold text-sm md:text-base">
                Expense Analysis
              </h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Analyse expenses.
              </p>
            </div>
            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-slate-200 p-3">
                <Banknote />
              </span>

              <h2 className="mt-2 font-bold text-sm md:text-base">
                Track Receivables
              </h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Track your debtors.
              </p>
            </div>
            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-slate-200 p-3">
                <MonitorSmartphone />
              </span>

              <h2 className="mt-2 font-bold text-sm md:text-base">
                Sync Devices
              </h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Sync across devices.
              </p>
            </div>
            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-slate-200 p-3">
                <ShieldCheck />
              </span>

              <h2 className="mt-2 font-bold text-sm md:text-base">
                Data Security
              </h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Your data is secured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
