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
import EmojiPicker from "emoji-picker-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import db from "../../db/dbConfig";
import { useUser } from "@clerk/nextjs";
import { Budgets } from "../../db/schema";
import { toast } from "sonner";
import { addMonths } from "date-fns";
import moment from "moment";

interface Props {
  refreshData: () => void;
}

const CreateBudget = ({ refreshData }: Props) => {
  const [emojiIcon, setEmojiIcon] = useState("❤️");
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);

  const [budgetName, setBudgetName] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<number>(0);
  const today = new Date();
  const nextMonths = addMonths(today, 0);
  const [period, setPeriod] = useState<Date | undefined>(nextMonths);
  const [budgetPeriod, setBudgetPeriod] = useState<string>(
    moment(period).format("MM/yyyy")
  );

  const { user } = useUser();

  const handleCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: budgetName,
        amount: budgetAmount,
        icon: emojiIcon,
        period: budgetPeriod,
        createdBy: `${user?.primaryEmailAddress?.emailAddress.toString()}`,
        isActive: true,
      })
      .returning({ insertedBudget: Budgets.name });
    if (result) {
      refreshData();
      toast.success(`${result[0].insertedBudget} has been created.`);
      setBudgetName("");
      setBudgetAmount(0);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="h-32 flex flex-col items-center justify-center bg-slate-100 hover:bg-slate-50 hover:shadow-md border-2 border-slate-500 border-dashed cursor-pointer p-10 rounded-lg duration-200">
            <p className="text-4xl border border-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
              +
            </p>
            <p className="text-xl">Create New Budget</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant={"outline"}
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
                    value={budgetPeriod}
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
                    placeholder="e.g. food, entertainment"
                    value={budgetName}
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
                    placeholder="e.g. 5000"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(Number(e.target.value))}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(budgetName && budgetAmount)}
                className="w-full my-4"
                onClick={handleCreateBudget}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
