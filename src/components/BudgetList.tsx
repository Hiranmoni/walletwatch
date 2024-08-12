"use client";
import { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import db from "../../db/dbConfig";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../db/schema";
import { useUser } from "@clerk/nextjs";
import BudgetCard from "./BudgetCard";
import { BudgetProp } from "@/interfaces";

const BudgetList = ({ currentPeriod }: { currentPeriod: string }) => {
  const { user } = useUser();
  const [budgets, setBudgets] = useState<BudgetProp[]>([]);

  useEffect(() => {
    user && getBudgets();
  }, [user, currentPeriod]);

  const getBudgets = async () => {
    const result: BudgetProp[] = await db
      .select({
        ...getTableColumns(Budgets),
        spent: sql<number>`sum(${Expenses.amount})`.mapWith(Number).as("spent"),
        totalItems: sql<number>`count(${Expenses.id})`
          .mapWith(Number)
          .as("totalItems"),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        and(
          eq(Budgets.period, currentPeriod),
          eq(
            Budgets.createdBy,
            `${user?.primaryEmailAddress?.emailAddress.toString()}`
          ),
          eq(Budgets.isActive, true)
        )
      )
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgets(result);
  };
  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget refreshData={() => getBudgets()} />
        {budgets.length > 0
          ? budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))
          : [1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-32 bg-slate-100 border rounded-lg animate-pulse"
              />
            ))}
      </div>
    </div>
  );
};

export default BudgetList;
