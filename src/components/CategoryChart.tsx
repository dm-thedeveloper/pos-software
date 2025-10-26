import { Card } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Electronics", value: 4500, color: "#3b82f6" },
  { name: "Accessories", value: 3200, color: "#10b981" },
  { name: "Furniture", value: 2800, color: "#f59e0b" },
  { name: "Clothing", value: 2100, color: "#8b5cf6" },
  { name: "Others", value: 1400, color: "#ef4444" },
];

export function CategoryChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-gray-900">Sales by Category</h3>
        <p className="text-sm text-gray-500 mt-1">Revenue distribution across categories</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.map((category) => (
          <div key={category.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <div className="flex-1">
              <p className="text-sm text-gray-600">{category.name}</p>
              <p className="text-xs text-gray-500">${category.value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
