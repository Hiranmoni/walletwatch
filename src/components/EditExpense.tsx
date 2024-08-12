"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import db from "../../db/dbConfig";
import { Expenses } from "../../db/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { PenBox } from "lucide-react";
import { ExpenseProp } from "@/interfaces";

interface Props {
  expense: ExpenseProp;
  refreshData: () => void;
}

const EditExpense = ({ expense, refreshData }: Props) => {
  const [expenseName, setExpenseName] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseDate, setExpenseDate] = useState<Date>(new Date());

  const { user } = useUser();

  useEffect(() => {
    if (user || expense) {
      setExpenseName(expense?.name);
      setExpenseAmount(expense?.amount);
      setExpenseDate(expense?.createdAt);
    }
  }, [user, expense]);

  const handleUpdateExpense = async () => {
    const result = await db
      .update(Expenses)
      .set({
        name: expenseName,
        amount: expenseAmount,
        createdAt: expenseDate,
        createdBy: `${user?.primaryEmailAddress?.emailAddress.toString()}`,
      })
      .where(eq(Expenses.id, expense.id))
      .returning({ updatedExpense: Expenses.name });
    if (result) {
      refreshData();
      toast.info(`${result[0].updatedExpense} has been updated.`);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <PenBox className="text-blue-600 mx-auto cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Edit Expense: ${expense.name}`}</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="my-4">
                  <p className="text-slate-700 font-medium my-1">
                    Expense Name:
                  </p>
                  <Input
                    type="text"
                    id="expenseName"
                    placeholder="e.g. pizza, groceries"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                  />
                </div>
                <div className="w-full flex gap-2">
                  <div className="my-2 flex-1">
                    <p className="text-slate-700 font-medium my-1">
                      Amount Spent:
                    </p>
                    <Input
                      type="number"
                      id="expenseAmount"
                      placeholder="e.g. 500"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(Number(e.target.value))}
                    />
                  </div>
                  <div className="my-2">
                    <p className="text-slate-700 font-medium my-1">
                      Expense Date:
                    </p>
                    <Input
                      type="date"
                      id="expenseDate"
                      placeholder={new Date().toLocaleDateString("en-IN")}
                      onChange={(e) => setExpenseDate(new Date(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button className="w-full my-4" onClick={handleUpdateExpense}>
                Update Expense
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditExpense;
