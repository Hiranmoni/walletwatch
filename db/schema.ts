import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
export const Budgets = pgTable(
  "budgets",
  {
    id: serial("id").primaryKey(),
    name: varchar("budget_name", { length: 255 }).notNull(),
    amount: integer("budget_amount").notNull(),
    icon: varchar("budget_icon"),
    period: varchar("budget_period", { length: 8 }).notNull(),
    createdBy: varchar("created_by", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    isActive: boolean("is_active").notNull().default(true),
  },
  (budgets) => ({
    budgetNameIdx: index("budget_name_idx").on(budgets.name),
  })
);

export const Expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    name: varchar("expense_name", { length: 255 }).notNull(),
    amount: integer("expense_amount").notNull(),
    budgetId: integer("budget_id")
      .references(() => Budgets.id)
      .notNull(),
    createdBy: varchar("created_by", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    isActive: boolean("is_active").notNull().default(true),
  },
  (expenses) => ({
    budgetIdIdx: index("budget_id_idx").on(expenses.budgetId),
    expenseNameIdx: index("expense_name_idx").on(expenses.name),
    budgetIdNameIdx: index("budget_id_name_idx").on(
      expenses.budgetId,
      expenses.name
    ),
  })
);

export const Receivables = pgTable(
  "receivables",
  {
    id: serial("id").primaryKey(),
    debtorName: varchar("debtor_name", { length: 255 }).notNull(),
    purpose: varchar("purpose", { length: 255 }),
    loanAmount: integer("loan_amount").notNull(),
    loanDate: timestamp("loan_date", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    receivedAmount: integer("received_amount").default(0).notNull(),
    receivedDate: timestamp("received_date", {
      precision: 6,
      withTimezone: true,
    }),
    status: varchar("status", { length: 20 }).default("Not Received"),
    createdBy: varchar("created_by", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    isActive: boolean("is_active").notNull().default(true),
  },
  (receivables) => ({
    debtorNameIdx: index("debtor_name_idx").on(receivables.debtorName),
    loanDateIdx: index("loan_date_idx").on(receivables.loanDate),
  })
);
