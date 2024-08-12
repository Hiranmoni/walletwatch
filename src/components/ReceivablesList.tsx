import { ReceivableProp } from "@/interfaces";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ColDef } from "ag-grid-community";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import DelReceivable from "./DelReceivable";
import EditReceivable from "./EditReceivable";

interface Props {
  receivables: ReceivableProp[];
  refreshData: () => void;
}
const ReceivablesList = ({ receivables, refreshData }: Props) => {
  const CustomButtons = (props: any) => {
    return (
      <div className="h-full grid grid-cols-2 gap-4 place-content-center">
        <EditReceivable receivable={props.data} refreshData={refreshData} />
        <DelReceivable recId={props.data.id} refreshData={refreshData} />
      </div>
    );
  };
  const [searchInput, setSearchInput] = useState("");
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<ReceivableProp[]>([]);
  const [colDefs, setColDefs] = useState<ColDef<ReceivableProp>[]>([
    {
      headerName: "Debtor Name",
      field: "debtorName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Loan Date",
      field: "loanDate",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      headerName: "Amount",
      field: "loanAmount",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      width: 120,
    },
    { headerName: "Purpose", field: "purpose" },
    {
      headerName: "Received",
      field: "receivedAmount",
      width: 100,
    },
    {
      headerName: "Rec. Date",
      field: "receivedDate",
      sortable: true,
      filter: true,
      width: 150,
    },
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
    receivables && setRowData(receivables);
  }, [receivables]);

  return (
    <div className="py-5">
      <div className="mb-4 flex gap-4 items-center justify-between">
        <div className="w-2/3 p-2 border flex gap-2 items-center shadow-sm rounded-md">
          <Search className="h-6 w-6" />
          <Input
            type="search"
            id="searchInput"
            placeholder="Search here..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Button
          variant={"outline"}
          onClick={onBtnExport}
          style={{ fontWeight: "bold" }}
        >
          Export as CSV
        </Button>
      </div>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact<ReceivableProp>
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

export default ReceivablesList;
