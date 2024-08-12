"use client";
import AddReceivables from "@/components/AddReceivables";
import ReceivablesList from "@/components/ReceivablesList";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Banknote, HandCoins, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import db from "../../../../db/dbConfig";
import { Receivables } from "../../../../db/schema";
import { and, desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { ReceivableProp } from "@/interfaces";

const ReceivablesPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [receivablesData, setReceivablesData] = useState<ReceivableProp[]>([]);
  const [totalReceivables, setTotalReceivables] = useState<number>(0);
  const [totalDebt, setTotalDebt] = useState<number>(0);
  const [totalReceived, setTotalReceived] = useState<number>(0);

  const getAllReceivables = async () => {
    const result = await db
      .select()
      .from(Receivables)
      .where(
        and(
          eq(Receivables.isActive, true),
          eq(
            Receivables.createdBy,
            `${user?.primaryEmailAddress?.emailAddress.toString()}`
          )
        )
      )
      .groupBy(Receivables.id)
      .orderBy(desc(Receivables.loanDate));
    setReceivablesData(result);
  };

  useEffect(() => {
    user && getAllReceivables();
  }, [user]);

  useEffect(() => {
    calculateValues();
  }, [receivablesData]);

  const calculateValues = () => {
    let _totalDebt = 0;
    let _totalReceived = 0;

    receivablesData.forEach((record) => {
      _totalDebt += record.loanAmount;
      _totalReceived += record.receivedAmount;
    });

    setTotalReceivables(receivablesData.length);
    setTotalDebt(_totalDebt);
    setTotalReceived(_totalReceived);
  };

  return (
    <div className="p-5">
      <div className="flex items-center gap-2">
        <Button variant={"outline"}>
          <ArrowLeft onClick={() => router.back()} />
        </Button>
        <p className="md:text-3xl font-bold text-blue-800">My Receivables</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
        <div className="h-16 flex flex-col justify-center p-1 border rounded-lg hover:bg-slate-50 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-xl p-2 bg-slate-100 rounded-full">
                <Users />
              </p>
              <p className="text-slate-700 font-semibold">Receivables</p>
            </div>
            <p className="text-indigo-900 text-xl font-bold">
              {totalReceivables}
            </p>
          </div>
        </div>
        <div className="h-16 flex flex-col justify-center p-1 border rounded-lg hover:bg-slate-50 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-xl p-2 bg-slate-100 rounded-full">
                <Banknote />
              </p>
              <p className="text-rose-700 font-semibold">Amount</p>
            </div>
            <p className="text-rose-600 text-xl font-bold">{totalDebt}</p>
          </div>
        </div>
        <div className="h-16 flex flex-col justify-center p-1 border rounded-lg hover:bg-slate-50 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-xl p-2 bg-slate-100 rounded-full">
                <HandCoins />
              </p>
              <p className="text-emerald-700 font-semibold">Received</p>
            </div>
            <p className="text-emerald-600 text-xl font-bold">
              {totalReceived}
            </p>
          </div>
        </div>
      </div>
      <AddReceivables refreshData={getAllReceivables} />
      <div className="border mt-5 rounded-lg p-4">
        <p className="font-bold text-xl">List of Receivables</p>
        <ReceivablesList
          receivables={receivablesData}
          refreshData={getAllReceivables}
        />
      </div>
    </div>
  );
};

export default ReceivablesPage;
