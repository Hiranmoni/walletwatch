import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ColDef } from "ag-grid-community";
import { ExpenseProp } from "@/interfaces";
import DelExpense from "./DelExpense";
import EditExpense from "./EditExpense";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  expenses: ExpenseProp[];
  refreshData: () => void;
}

const ExpensesList = ({ expenses, refreshData }: Props) => {
  const CustomButtons = (props: any) => {
    return (
      <div className="h-full grid grid-cols-2 gap-4 place-content-center">
        <EditExpense refreshData={refreshData} expense={props.data} />
        <DelExpense expId={props.data.id} refreshData={refreshData} />
      </div>
    );
  };
  const [searchInput, setSearchInput] = useState("");
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<ExpenseProp[]>([]);
  const [colDefs, setColDefs] = useState<ColDef<ExpenseProp>[]>([
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Amount",
      field: "amount",
      sortable: true,
      filter: true,
      width: 150,
    },
    { headerName: "Date", field: "createdAt", filter: true },
    {
      headerName: "Actions",
      field: "action",
      cellRenderer: CustomButtons,
    },
  ]);
  const pagination = true;
  const paginationPageSize = 20;
  const paginationPageSizeSelector = [20, 50, 100];
  const onBtnExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  useEffect(() => {
    expenses && setRowData(expenses);
  }, [expenses]);

  return (
    <div className="py-5">
      <Button
        variant={"outline"}
        onClick={onBtnExport}
        style={{ marginBottom: "10px", fontWeight: "bold" }}
      >
        Export as CSV
      </Button>
      <div className="mb-4 flex items-center justify-between">
        <div className="w-2/3 p-2 border flex gap-2 items-center shadow-sm rounded-md">
          <Search className="h-6 w-6" />
          <Input
            type="search"
            id="searchInput"
            placeholder="Search here..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="ml-4">
          <div className="bg-sky-500 h-8 w-8 flex items-center justify-center font-bold text-white rounded-full md:hidden">
            {expenses.length}
          </div>
          <div className="hidden md:block">
            Total Expenses: <span className="font-bold">{expenses.length}</span>
          </div>
        </div>
      </div>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact<ExpenseProp>
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default ExpensesList;
