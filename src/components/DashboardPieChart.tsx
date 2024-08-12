import { BudgetProp } from "@/interfaces";
import { PieChart, Pie, Cell } from "recharts";

interface Props {
  budgets: BudgetProp[];
}

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#605F5E"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DashboardPieChart = ({ budgets }: Props) => {
  return (
    <div className="border rounded-lg p-2 min-h-[350px] min-w-[300px]">
      <p className="font-bold text-xl">Your Expenses</p>
      <PieChart width={350} height={300}>
        <Pie
          data={budgets}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="spent"
        >
          {budgets.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default DashboardPieChart;
