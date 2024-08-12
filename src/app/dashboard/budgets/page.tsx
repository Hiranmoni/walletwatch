"use client";
import BudgetList from "@/components/BudgetList";
import PeriodSelector from "@/components/PeriodSelector";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useState } from "react";

const BudgetsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Date | string>(
    new Date()
  );
  const [currentPeriod, setCurrentPeriod] = useState(
    moment(selectedPeriod).format("MM/yyyy")
  );

  const onSearchHandler = () => {
    setCurrentPeriod(moment(selectedPeriod).format("MM/yyyy"));
  };

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <h2 className="text-3xl font-bold text-blue-800">My Budgets</h2>
        <div className="flex gap-3 items-center justify-between md:justify-center">
          <PeriodSelector selectedPeriod={(val) => setSelectedPeriod(val)} />
          <Button onClick={onSearchHandler}>Search</Button>
        </div>
      </div>
      <BudgetList currentPeriod={currentPeriod} />
    </div>
  );
};

export default BudgetsPage;
