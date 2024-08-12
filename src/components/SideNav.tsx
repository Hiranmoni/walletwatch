"use client";
import { usePathname } from "next/navigation";
import { LayoutGrid, PiggyBank, ReceiptText, FolderInput } from "lucide-react";
import Link from "next/link";

const SideNav = () => {
  const navList = [
    { id: 1, name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { id: 2, name: "Budgets", href: "/dashboard/budgets", icon: PiggyBank },
    { id: 3, name: "Expenses", href: "/dashboard/expenses", icon: ReceiptText },
    {
      id: 4,
      name: "Receivables",
      href: "/dashboard/receivables",
      icon: FolderInput,
    },
  ];
  const path = usePathname();
  return (
    <aside className="h-full p-5 border rounded-lg shadow-sm flex flex-col justify-between">
      <div>
        {navList.map((navItem) => (
          <Link
            href={navItem.href}
            key={navItem.id}
            className={`flex items-center gap-4 my-2 px-2 py-5 rounded font-medium text-gray-500 bg-blue-100 hover:text-primary hover:bg-blue-200 cursor-pointer duration-200 ${
              path === navItem.href && "bg-blue-200 text-primary"
            }`}
          >
            <navItem.icon />
            <span>{navItem.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideNav;
