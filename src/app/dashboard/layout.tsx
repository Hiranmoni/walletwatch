"use client";
import { useEffect } from "react";
import SideNav from "@/components/SideNav";
import { Budgets } from "../../../db/schema";
import db from "../../../db/dbConfig";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface PageProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: PageProps) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(
        eq(
          Budgets.createdBy,
          `${user?.primaryEmailAddress?.emailAddress.toString()}`
        )
      );

    if (result.length === 0) {
      router.replace("/dashboard/budgets");
    } else {
      router.replace("/dashboard");
    }
  };
  return (
    <div className="container grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
      <div className="hidden md:block">
        <SideNav />
      </div>
      <div className="border rounded-lg md:col-span-2 lg:col-span-3 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
