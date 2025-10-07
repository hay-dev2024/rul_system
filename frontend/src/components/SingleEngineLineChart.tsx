import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { EngineRULPoint } from "../types";

interface Props {
  data: EngineRULPoint[];
}

const SingleEngineLineChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return <div>데이터가 없습니다.</div>;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid stroke="#1f2a38" strokeDasharray="3 3" />
        <XAxis dataKey="cycle" stroke="#9aa6b2" />
        <YAxis stroke="#9aa6b2" />
        <Tooltip />
        <Legend />
        <Line dataKey="predicted" name="Predicted" stroke="#8b5cf6" dot={false} />
        <Line dataKey="actual" name="Actual" stroke="#10b981" dot={false} strokeDasharray="4 2"/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SingleEngineLineChart;
