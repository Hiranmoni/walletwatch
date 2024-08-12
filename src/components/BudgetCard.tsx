import { BudgetProp } from "@/interfaces";
import Link from "next/link";
interface Props {
  budget: BudgetProp;
}

const BudgetCard = ({ budget }: Props) => {
  const calcProgressPercentage = () => {
    return Math.round((100 * budget?.spent) / budget?.amount);
  };
  return (
    <Link
      href={`/dashboard/expenses/${budget.id}`}
      className="h-32 flex flex-col justify-center p-1 border rounded-lg hover:bg-slate-50 hover:shadow-md cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <p className="text-xl p-1 bg-slate-100 rounded-full">{budget.icon}</p>
          <div className="text-sm">
            <h2 className="text-slate-700 font-semibold">{budget.name}</h2>
            <p className="text-slate-500">{budget.totalItems} item(s)</p>
          </div>
        </div>
        <p className="text-indigo-900 text-xl font-bold">{budget.amount}</p>
      </div>
      <div className="mt-1">
        <div className="my-2 flex justify-between items-center text-sm">
          <div className="text-rose-700">
            {budget.spent ? budget.spent : 0} spent
          </div>
          <div className="text-green-700">
            {budget.amount - budget.spent} remaining
          </div>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${calcProgressPercentage()}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetCard;
