"use client";
import { useEffect, useState } from "react";
import InfoCards from "@/components/InfoCards";
import db from "../../../db/dbConfig";
import { BudgetProp, ExpenseProp } from "@/interfaces";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../../db/schema";
import { useUser } from "@clerk/nextjs";
import DashboardBarChart from "@/components/DashboardBarChart";
import ExpensesList from "@/components/ExpensesList";
import DashboardPieChart from "@/components/DashboardPieChart";
import moment from "moment";

const DashboardPage = () => {
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
      .limit(5)
      .orderBy(desc(Expenses.createdAt));
    setExpensesData(expensesRes);
  };

  return (
    <section className="p-5">
      <h2 className="text-3xl font-bold text-gray-700">
        Hi, <span className="text-indigo-700">{user?.firstName}! 🙏</span>
      </h2>
      <p className="text-gray-500">
        Here&apos;s what&apos;s happening to your money. Let&apos;s manage your
        budgets & expenses with ease.
      </p>
      <InfoCards budgets={budgets} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="">
          <DashboardBarChart budgets={budgets} />
        </div>
        <div className="">
          <DashboardPieChart budgets={budgets} />
        </div>
        {/* <div className="space-y-4">
          <p className="font-bold text-xl">Latest Budgets</p>
          {budgets.slice(0, 2).map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div> */}
      </div>
      <div className="mt-5">
        <div className="font-bold text-xl">Recent Expenses</div>
        <ExpensesList expenses={expensesData} refreshData={getBudgets} />
      </div>
    </section>
  );
};

export default DashboardPage;
