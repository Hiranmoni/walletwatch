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
import { Receivables } from "../../db/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

interface Props {
  recId: number;
  refreshData: () => void;
}

const DelReceivable = ({ recId, refreshData }: Props) => {
  const deleteReceivable = async (recId: number) => {
    const deletedReceivable = await db
      .delete(Receivables)
      .where(eq(Receivables.id, recId))
      .returning({ deletedReceivable: Receivables.debtorName });
    if (deletedReceivable) {
      refreshData();
      toast.warning(
        `${deletedReceivable[0].deletedReceivable}&apos;s receivable has been deleted.`
      );
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
              receivable and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteReceivable(recId)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DelReceivable;
