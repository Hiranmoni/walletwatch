"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import db from "../../../../../db/dbConfig";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../../db/schema";
import BudgetCard from "@/components/BudgetCard";
import AddExpense from "@/components/AddExpense";
import ExpensesList from "@/components/ExpensesList";
import EditBudget from "@/components/EditBudget";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BudgetProp, ExpenseProp } from "@/interfaces";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Params {
  params: {
    id: number;
  };
}

const ExpensePage = ({ params }: Params) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetProp>({} as BudgetProp);
  const [expensesData, setExpensesData] = useState<ExpenseProp[]>([]);
  const router = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    const budgetRes: BudgetProp[] = await db
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
          eq(
            Budgets.createdBy,
            `${user?.primaryEmailAddress?.emailAddress.toString()}`
          ),
          eq(Budgets.isActive, true),
          eq(Budgets.id, params.id)
        )
      )
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetInfo(budgetRes[0]);
    getExpensesList();
  };

  const getExpensesList = async () => {
    const expensesRes = await db
      .select()
      .from(Expenses)
      .where(
        and(
          eq(Expenses.budgetId, params.id),
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

  const deleteBudget = async (id: number) => {
    const delRelatedExpenses = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, id));
    if (delRelatedExpenses) {
      const deletedBudget = await db
        .delete(Budgets)
        .where(
          and(
            eq(Budgets.id, id),
            eq(
              Budgets.createdBy,
              `${user?.primaryEmailAddress?.emailAddress.toString()}`
            )
          )
        )
        .returning({ deletedBudget: Budgets.name });
      if (deletedBudget) {
        router.replace("/dashboard/budgets");
        toast.warning(`${deletedBudget[0].deletedBudget} has been deleted.`);
      }
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center md:justify-between gap-2">
          <Button variant={"outline"}>
            <ArrowLeft onClick={() => router.back()} />
          </Button>
          <p className="md:text-3xl font-bold text-blue-800">My Expenses</p>
        </div>
        <div className="flex gap-2">
          <EditBudget budget={budgetInfo} refreshData={() => getBudgetInfo()} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete Budget</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete and
                  remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget(budgetInfo.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        {budgetInfo ? (
          <BudgetCard budget={budgetInfo} />
        ) : (
          <div className="h-32 bg-slate-100 border rounded-lg animate-pulse" />
        )}
        <AddExpense budgetId={params.id} refreshData={() => getBudgetInfo()} />
      </div>
      <div className="border mt-5 rounded-lg p-4">
        <p className="font-bold text-xl">Last 5 Expenses</p>
        <ExpensesList
          expenses={expensesData}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default ExpensePage;
