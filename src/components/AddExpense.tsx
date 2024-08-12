"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import db from "../../db/dbConfig";
import { Budgets, Expenses } from "../../db/schema";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { desc, eq, sql } from "drizzle-orm";

interface Props {
  budgetId: number;
  refreshData: () => void;
}

const AddExpense = ({ budgetId, refreshData }: Props) => {
  const [expenseName, setExpenseName] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseDate, setExpenseDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const handleCreateExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: expenseName,
        amount: expenseAmount,
        budgetId: budgetId,
        createdBy: `${user?.primaryEmailAddress?.emailAddress.toString()}`,
        createdAt: expenseDate,
        isActive: true,
      })
      .returning({ insertedExpense: Expenses.name });
    if (result) {
      refreshData();
      toast.success("New expense has been added.");
      setExpenseName("");
      setExpenseAmount(0);
      setExpenseDate(new Date());
    }
    setLoading(false);
  };

  const checkAmount: (val: number) => void = async function (val: number) {
    const budget = await db
      .select({
        amount: Budgets.amount,
        spent: sql<number>`sum(${Expenses.amount})`.mapWith(Number).as("spent"),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.id, budgetId))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    const budgetRemaining = budget[0].amount - budget[0].spent;

    if (val > budgetRemaining) {
      toast.error("Excess of stipulated budget");
      setLoading(true);
    } else {
      setLoading(false);
      setExpenseAmount(val);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <p className="font-bold text-xl">Add Expense</p>
      <div className="my-4">
        <p className="text-slate-700 font-medium my-1">Expense Name:</p>
        <Input
          type="text"
          id="expenseName"
          placeholder="e.g. pizza, rent, etc."
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <div className="my-2 flex-1">
          <p className="text-slate-700 font-medium my-1">Amount Spent:</p>
          <Input
            type="number"
            id="expenseAmount"
            placeholder="e.g. 500"
            value={expenseAmount}
            onChange={(e) => {
              checkAmount(parseInt(e.target.value));
              setExpenseAmount(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="my-2">
          <p className="text-slate-700 font-medium my-1">Expense Date:</p>
          <Input
            type="date"
            id="expenseDate"
            placeholder={new Date().toLocaleDateString("en-IN")}
            onChange={(e) => setExpenseDate(new Date(e.target.value))}
          />
        </div>
      </div>
      <Button
        disabled={!(expenseName && expenseAmount) || loading}
        className="w-full my-4"
        onClick={handleCreateExpense}
      >
        {loading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          "Add New Expense"
        )}
      </Button>
    </div>
  );
};

export default AddExpense;
