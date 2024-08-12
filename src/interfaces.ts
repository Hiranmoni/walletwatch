export interface BudgetProp {
  spent: number;
  totalItems: number;
  id: number;
  name: string;
  amount: number;
  icon: string | null;
  period: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface ExpenseProp {
  id: number;
  name: string;
  amount: number;
  budgetId: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  action?: any;
}

export interface ReceivableProp {
  id: number;
  debtorName: string;
  purpose: string | null;
  loanAmount: number;
  loanDate: Date;
  receivedAmount: number;
  receivedDate: Date | null;
  status: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  totalDebt?: number;
  totalReceived?: number;
  receivedCount?: number;
  action?: any;
}
