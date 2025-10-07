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
  data: { [engineId: number]: EngineRULPoint[] };
}

/**
 * 전체 엔진의 cycle별 평균 predicted & actual을 그려주는 컴포넌트
 * - data: {1: [...], 2: [...], ...}
 */
const MultiEngineChart: React.FC<Props> = ({ data }) => {
  const engineIds = Object.keys(data).map((k) => Number(k));
  if (engineIds.length === 0) return <div>데이터가 없습니다.</div>;

  // assume same cycle length for engines (for this demo)
  const length = data[engineIds[0]].length;
  const merged = [];
  for (let i = 0; i < length; i++) {
    let sumPred = 0,
      sumAct = 0,
      cntPred = 0,
      cntAct = 0;
    engineIds.forEach((id) => {
      const arr = data[id];
      if (arr && arr[i]) {
        sumPred += arr[i].predicted;
        sumAct += arr[i].actual;
        cntPred++;
        cntAct++;
      }
    });
    merged.push({
      cycle: i + 1,
      predicted: cntPred ? sumPred / cntPred : null,
      actual: cntAct ? sumAct / cntAct : null,
    });
  }

  return (
    <ResponsiveContainer width="100%" height={420}>
      <LineChart data={merged} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
        <CartesianGrid stroke="#1f2a38" strokeDasharray="3 3" />
        <XAxis dataKey="cycle" stroke="#9aa6b2" />
        <YAxis stroke="#9aa6b2" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="predicted"
          name="모델 예측 (Predicted)"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
        <Line
          type="monotone"
          dataKey="actual"
          name="실제값 (Actual)"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MultiEngineChart;
