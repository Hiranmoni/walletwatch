import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import db from "../../db/dbConfig";
import { Expenses } from "../../db/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

interface Props {
  expId: number;
  refreshData: () => void;
}

const DelExpense = ({ expId, refreshData }: Props) => {
  const deleteExpense = async (expId: number) => {
    const deletedExpense = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expId))
      .returning({ deletedExpense: Expenses.name });
    if (deletedExpense) {
      refreshData();
      toast.warning(`${deletedExpense[0].deletedExpense} has been deleted.`);
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Trash2Icon className="text-rose-600 mx-auto cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              expense and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteExpense(expId)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DelExpense;
