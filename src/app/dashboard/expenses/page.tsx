"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import db from "../../../../db/dbConfig";
import { Budgets, Expenses } from "../../../../db/schema";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { BudgetProp, ExpenseProp } from "@/interfaces";
import ExpensesList from "@/components/ExpensesList";
import InfoCards from "@/components/InfoCards";
import moment from "moment";

const ExpensesPage = () => {
  const [budgets, setBudgets] = useState<BudgetProp[]>([]);
  const [expensesData, setExpensesData] = useState<ExpenseProp[]>([]);
  const today = new Date();
  const currentPeriod = moment(today).format("MM/yyyy");

  const { user } = useUser();

  useEffect(() => {
    user && getBudgets();
  }, [user]);

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
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const expensesRes = await db
      .select()
      .from(Expenses)
      .where(
        and(
          eq(Expenses.isActive, true),
          eq(
            Expenses.createdBy,
            `${user?.primaryEmailAddress?.emailAddress.toString()}`
          )
        )
      )
      .orderBy(desc(Expenses.createdAt));
    setExpensesData(expensesRes);
  };

  return (
    <div className="px-5">
      <InfoCards budgets={budgets} />
      <div className="mt-5">
        <p className="font-bold text-xl">All Expenses</p>
        <ExpensesList expenses={expensesData} refreshData={getBudgets} />
      </div>
    </div>
  );
};

export default ExpensesPage;
