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
import { BudgetProp } from "@/interfaces";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import db from "../../db/dbConfig";
import { Budgets } from "../../db/schema";
import { toast } from "sonner";
import EmojiPicker from "emoji-picker-react";
import { Input } from "./ui/input";
import { eq } from "drizzle-orm";

interface Props {
  budget: BudgetProp;
  refreshData: () => void;
}

const EditBudget = ({ budget, refreshData }: Props) => {
  const [emojiIcon, setEmojiIcon] = useState("❤️");
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);

  const [budgetName, setBudgetName] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<number>(0);
  const [budgetPeriod, setBudgetPeriod] = useState<string>("");

  const { user } = useUser();

  useEffect(() => {
    if (user || budget) {
      setEmojiIcon(budget?.icon ?? "❤️");
      setBudgetName(budget?.name);
      setBudgetAmount(budget?.amount);
      setBudgetPeriod(budget?.period);
    }
  }, [user, budget]);

  const handleUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: budgetName,
        amount: budgetAmount,
        icon: emojiIcon,
        period: budgetPeriod,
      })
      .where(eq(Budgets.id, budget.id))
      .returning({ editedBudget: Budgets.name });
    if (result) {
      refreshData();
      toast.info(`${result[0].editedBudget} has been updated.`);
      setBudgetName("");
      setBudgetAmount(0);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>Update Budget</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Edit Budget: ${budget.name}`}</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant={"outline"}
                  value={budget.icon?.toString()}
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-10">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(ev) => {
                      setEmojiIcon(ev.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="my-4">
                  <p className="text-slate-700 font-medium my-1">
                    Budget Period:
                  </p>
                  <Input
                    type="text"
                    id="budgetPeriod"
                    defaultValue={budgetPeriod}
                    onChange={(e) => setBudgetPeriod(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <p className="text-slate-700 font-medium my-1">
                    Budget Name:
                  </p>
                  <Input
                    type="text"
                    id="budgetName"
                    defaultValue={budgetName}
                    onChange={(e) => setBudgetName(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <p className="text-slate-700 font-medium my-1">
                    Budget Amount:
                  </p>
                  <Input
                    type="number"
                    id="budgetAmount"
                    defaultValue={budgetAmount}
                    onChange={(e) => setBudgetAmount(Number(e.target.value))}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button className="w-full my-4" onClick={handleUpdateBudget}>
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
