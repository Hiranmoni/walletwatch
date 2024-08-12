import { BudgetProp } from "@/interfaces";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  budgets: BudgetProp[];
}
const DashboardBarChart = ({ budgets }: Props) => {
  return (
    <div className="border rounded-lg p-2 min-h-[350px] min-w-[300px]">
      <p className="font-bold text-xl">Your Budgets</p>
      <ResponsiveContainer width={"99%"} height={300}>
        <BarChart
          data={budgets}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="spent"
            stackId="a"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="amount"
            stackId="a"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardBarChart;
