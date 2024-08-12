"use client";
import { usePathname } from "next/navigation";
import { FolderInput, LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import Link from "next/link";

const BottomNavbar = () => {
  const path = usePathname();
  return (
    <nav className="container fixed bottom-0 left-0 z-50 px-1 w-full h-16 bg-white border-t border-gray-200">
      <div className="grid h-full w-full grid-cols-4 mx-auto">
        <Link
          href={"/dashboard"}
          className={`flex flex-col items-center justify-center p-2 rounded-full ${
            path === "/dashboard" && "bg-blue-200 text-primary"
          }`}
        >
          <LayoutGrid />
          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Dashboard
          </span>
        </Link>
        <Link
          href={"/dashboard/budgets"}
          className={`flex flex-col items-center justify-center p-2 rounded-full ${
            path === "/dashboard/budgets" && "bg-blue-200 text-primary"
          }`}
        >
          <PiggyBank />
          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Budgets
          </span>
        </Link>
        <Link
          href={"/dashboard/expenses"}
          className={`flex flex-col items-center justify-center p-2 rounded-full ${
            path === "/dashboard/expenses" && "bg-blue-200 text-primary"
          }`}
        >
          <ReceiptText />
          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Expenses
          </span>
        </Link>
        <Link
          href={"/dashboard/receivables"}
          className={`flex flex-col items-center justify-center p-2 rounded-full ${
            path === "/dashboard/receivables" && "bg-blue-200 text-primary"
          }`}
        >
          <FolderInput />
          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Receivables
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavbar;
