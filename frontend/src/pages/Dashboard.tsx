import React, { useState } from "react";
import Header from "../components/Header";
import EngineSelector from "../components/EngineSelector";
import MultiEngineChart from "../components/MultiEngineChart";
import SingleEngineBarChart from "../components/SingleEngineBarChart";
import SingleEngineLineChart from "../components/SingleEngineLineChart";
import { EngineRULPoint, SingleEngineRUL } from "../types";

/**
 * 대시보드 페이지 (가상 데이터 사용)
 */

const Dashboard: React.FC = () => {
  const [mode, setMode] = useState<"single" | "all">("all");
  const [selectedEngine, setSelectedEngine] = useState<number | "all">("all");

  // 가짜 / 샘플 데이터 (엔진 1~5)
  const fakeMultiData: { [id: number]: EngineRULPoint[] } = {
    1: Array.from({ length: 40 }, (_, i) => ({ cycle: i + 1, predicted: 120 - i * 2 - Math.sin(i) * 3, actual: 118 - i * 2.2 })),
    2: Array.from({ length: 40 }, (_, i) => ({ cycle: i + 1, predicted: 130 - i * 2.1 - Math.cos(i) * 2, actual: 128 - i * 2 })),
    3: Array.from({ length: 40 }, (_, i) => ({ cycle: i + 1, predicted: 115 - i * 1.9 + Math.sin(i/2) * 2, actual: 114 - i * 2 })),
    4: Array.from({ length: 40 }, (_, i) => ({ cycle: i + 1, predicted: 125 - i * 2 + Math.cos(i/3) * 1.5, actual: 123 - i * 2 })),
    5: Array.from({ length: 40 }, (_, i) => ({ cycle: i + 1, predicted: 118 - i * 2 + Math.sin(i/3) * 1, actual: 116 - i * 2 })),
  };

  const fakeSingle: { [id: number]: SingleEngineRUL } = {
    1: { predicted: 45, actual: 42 },
    2: { predicted: 60, actual: 58 },
    3: { predicted: 35, actual: 30 },
    4: { predicted: 52, actual: 50 },
    5: { predicted: 48, actual: 46 },
  };

  const engineIds = Object.keys(fakeMultiData).map((k) => Number(k));

  return (
    <div className="container">
      <Header />

      <div className="controls">
        <EngineSelector
          engineIds={engineIds}
          selected={selectedEngine}
          onSelect={(id) => setSelectedEngine(id)}
          mode={mode}
          setMode={setMode}
        />
      </div>

      <div className="card">
        {mode === "all" && (
          <>
            <h3 style={{ marginTop: 0 }}>전체 엔진 RUL 평균 추세 (Predicted vs Actual)</h3>
            <MultiEngineChart data={fakeMultiData} />
            <p style={{ color: "#94a3b8", marginTop: 8 }}>
              설명: 각 엔진의 cycle별 RUL 값을 평균내어 모델 예측값(보라)과 실제값(녹색)을 비교합니다.
            </p>
          </>
        )}

        {mode === "single" && selectedEngine !== "all" && (
          <>
            <h3 style={{ marginTop: 0 }}>엔진 #{selectedEngine} — 예측 vs 실제</h3>
            <SingleEngineLineChart data={fakeMultiData[selectedEngine as number]} />
            <div style={{ marginTop: 12 }}>
              <SingleEngineBarChart data={fakeSingle[selectedEngine as number]} />
            </div>
          </>
        )}

        {mode === "single" && selectedEngine === "all" && (
          <p style={{ color: "#94a3b8" }}>오른쪽 드롭다운에서 엔진을 선택하세요.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
