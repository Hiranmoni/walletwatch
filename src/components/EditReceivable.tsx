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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Loader, PenBox } from "lucide-react";
import { ReceivableProp } from "@/interfaces";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import db from "../../db/dbConfig";
import { Receivables } from "../../db/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

interface Props {
  receivable: ReceivableProp;
  refreshData: () => void;
}

const EditReceivable = ({ receivable, refreshData }: Props) => {
  const { user } = useUser();
  const [debtorName, setDebtorName] = useState<string>("");
  const [purpose, setPurpose] = useState<string | null>("");
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [loanDate, setLoanDate] = useState<Date>(new Date());
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  const [receivedDate, setReceivedDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setDebtorName(receivable.debtorName);
    setPurpose(receivable.purpose || null);
    setLoanAmount(receivable.loanAmount);
    setLoanDate(receivable.loanDate);
    setReceivedAmount(receivable.receivedAmount || 0);
    setReceivedDate(receivable.receivedDate || null);
    setStatus(receivable.status);
  }, [receivable]);

  const handleUpdateReceivable = async () => {
    setLoading(true);
    const result = await db
      .update(Receivables)
      .set({
        debtorName: debtorName,
        purpose: purpose,
        loanAmount: loanAmount,
        loanDate: loanDate,
        receivedAmount: receivedAmount,
        receivedDate: receivedDate,
        status: status,
        createdBy: `${user?.primaryEmailAddress?.emailAddress.toString()}`,
      })
      .where(eq(Receivables.id, receivable.id))
      .returning({ updatedReceivable: Receivables.debtorName });
    if (result) {
      refreshData();
      toast.info(
        `${result[0].updatedReceivable}&apos;s receivable has been updated.`
      );
    }
    setLoading(false);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <PenBox className="text-blue-600 mx-auto cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{`Update Receivable from: ${receivable.debtorName}`}</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="w-full my-4">
                  <p className="text-slate-700 font-medium my-1">
                    Debtor&apos;s Name:
                  </p>
                  <Input
                    type="text"
                    id="debtorName"
                    defaultValue={debtorName}
                    onChange={(e) => setDebtorName(e.target.value)}
                  />
                </div>
                <div className="my-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="">
                    <p className="text-slate-700 font-medium my-1">Status:</p>
                    <Select onValueChange={(e) => setStatus(e)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{receivable.status}</SelectLabel>
                          <SelectItem value="Not Received">
                            Not Received
                          </SelectItem>
                          <SelectItem value="Received">Received</SelectItem>
                          <SelectItem value="Partially Received">
                            Partially Received
                          </SelectItem>
                          <SelectItem value="Bad Debt">Bad Debt</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="">
                    <p className="text-slate-700 font-medium my-1">Purpose:</p>
                    <Input
                      type="text"
                      id="purpose"
                      defaultValue={purpose?.toString()}
                      onChange={(e) => setPurpose(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <p className="text-slate-700 font-medium my-1">
                      Loan Amount:
                    </p>
                    <Input
                      type="number"
                      id="loanAmount"
                      defaultValue={loanAmount}
                      onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="">
                    <p className="text-slate-700 font-medium my-1">
                      Loan Date:
                    </p>
                    <Input
                      type="date"
                      id="loanDate"
                      placeholder={loanDate.toLocaleDateString()}
                      onChange={(e) => setLoanDate(new Date(e.target.value))}
                    />
                  </div>
                  <div className="">
                    <p className="text-slate-700 font-medium my-1">
                      Received Amount:
                    </p>
                    <Input
                      type="number"
                      id="receivedAmount"
                      defaultValue={receivedAmount}
                      onChange={(e) =>
                        setReceivedAmount(parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="">
                    <p className="text-slate-700 font-medium my-1">
                      Received Date:
                    </p>
                    <Input
                      type="date"
                      id="receivedDate"
                      defaultValue={
                        receivedDate ? receivedDate.toLocaleDateString() : ""
                      }
                      onChange={(e) =>
                        setReceivedDate(new Date(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(debtorName && loanAmount) || loading}
                className="w-full my-4"
                onClick={handleUpdateReceivable}
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "Update Receivable"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditReceivable;
