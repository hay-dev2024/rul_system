import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SingleEngineRUL } from "../types";

interface Props {
  data: SingleEngineRUL;
}

const SingleEngineBarChart: React.FC<Props> = ({ data }) => {
  const arr = [
    { name: "Predicted RUL", value: data.predicted },
    { name: "Actual RUL", value: data.actual },
  ];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={arr} margin={{ top: 12, right: 20, left: 12, bottom: 8 }}>
        <CartesianGrid stroke="#1f2a38" />
        <XAxis dataKey="name" stroke="#9aa6b2" />
        <YAxis stroke="#9aa6b2" />
        <Tooltip />
        <Bar dataKey="value" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SingleEngineBarChart;
