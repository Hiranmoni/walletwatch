import { useEffect, useState } from "react";
import { FileStack, ReceiptText, Wallet } from "lucide-react";
import { BudgetProp } from "@/interfaces";

interface Props {
  budgets: BudgetProp[];
}
const InfoCards = ({ budgets }: Props) => {
  const [totalBudgets, setTotalBudgets] = useState<number>(0);
  const [totalBudgetAmount, setTotalBudgetAmount] = useState<number>(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState<number>(0);

  useEffect(() => {
    calculateCardInfo();
  }, [budgets]);

  const calculateCardInfo = () => {
    let _totalBudgetAmount = 0;
    let _totalExpenseAmount = 0;
    budgets.forEach((budget) => {
      _totalBudgetAmount += budget.amount;
      _totalExpenseAmount += budget.spent;
    });

    setTotalBudgetAmount(_totalBudgetAmount);
    setTotalExpenseAmount(_totalExpenseAmount);
    setTotalBudgets(budgets.length);
  };

  return (
    <div className="mt-5">
      <div className="font-bold text-xl">Insights of Current Month</div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets?.length > 0 ? (
          <>
            <div className="h-24 flex items-center justify-between p-1 border rounded-lg">
              <div className="">
                <p className="text-sm text-gray-700">Total Budget</p>
                <p className="text-3xl font-bold text-indigo-800">
                  {totalBudgetAmount}
                </p>
              </div>
              <Wallet className="w-12 h-12 bg-blue-800 p-3 rounded-full text-white" />
            </div>
            <div className="h-24 flex items-center justify-between p-1 border rounded-lg">
              <div className="">
                <p className="text-sm text-gray-700">Total Spent</p>
                <p className="text-3xl font-bold text-indigo-800">
                  {totalExpenseAmount}
                </p>
              </div>
              <ReceiptText className="w-12 h-12 bg-blue-800 p-3 rounded-full text-white" />
            </div>
            <div className="h-24 flex items-center justify-between p-1 border rounded-lg">
              <div className="">
                <p className="text-sm text-gray-700">No. of Budgets</p>
                <p className="text-3xl font-bold text-indigo-800">
                  {totalBudgets}
                </p>
              </div>
              <FileStack className="w-12 h-12 bg-blue-800 p-3 rounded-full text-white" />
            </div>
          </>
        ) : (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-100 border rounded-lg animate-pulse"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InfoCards;
