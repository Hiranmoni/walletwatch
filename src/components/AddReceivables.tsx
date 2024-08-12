"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import db from "../../db/dbConfig";
import { Receivables } from "../../db/schema";
import { useUser } from "@clerk/nextjs";

interface Props {
  refreshData: () => void;
}

const AddReceivables = ({ refreshData }: Props) => {
  const { user } = useUser();
  const [debtorName, setDebtorName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [loanDate, setLoanDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateReceivable = async () => {
    setLoading(true);
    const result = await db
      .insert(Receivables)
      .values({
        debtorName: debtorName,
        purpose: purpose,
        loanAmount: loanAmount,
        loanDate: loanDate,
        isActive: true,
        createdBy: `${user?.primaryEmailAddress?.emailAddress.toString()}`,
      })
      .returning({ insertedReceivable: Receivables.debtorName });
    setLoading(false);
    if (result) {
      toast.success("Receivable created successfully");
      setDebtorName("");
      setPurpose("");
      setLoanAmount(0);
      setLoanDate(new Date());
      refreshData();
    }
  };

  return (
    <div className="mt-5 p-4 border rounded-lg">
      <p className="font-bold text-xl">Add Receivable</p>
      <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="">
          <p className="text-slate-700 font-medium my-1">Debtor&apos;s Name:</p>
          <Input
            type="text"
            id="debtorName"
            placeholder="Enter Debtor Name"
            value={debtorName}
            onChange={(e) => setDebtorName(e.target.value)}
          />
        </div>
        <div className="">
          <p className="text-slate-700 font-medium my-1">Purpose:</p>
          <Input
            type="text"
            id="purpose"
            placeholder="e.g. Medical Emergency"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="">
          <p className="text-slate-700 font-medium my-1">Amount:</p>
          <Input
            type="number"
            id="loanAmount"
            placeholder="Enter Amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
          />
        </div>
        <div className="">
          <p className="text-slate-700 font-medium my-1">Loan Date:</p>
          <Input
            type="date"
            id="loanDate"
            defaultValue={new Date().toLocaleDateString("en-IN")}
            onChange={(e) => setLoanDate(new Date(e.target.value))}
          />
        </div>
        <Button
          disabled={!(debtorName && loanAmount) || loading}
          className="w-full my-4"
          onClick={handleCreateReceivable}
        >
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            "Add Receivable"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddReceivables;
