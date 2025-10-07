import React from "react";

interface Props {
  engineIds: number[];
  selected: number | "all";
  onSelect: (id: number | "all") => void;
  mode: "single" | "all";
  setMode: (m: "single" | "all") => void;
}

const EngineSelector: React.FC<Props> = ({ engineIds, selected, onSelect, mode, setMode }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
      <button
        className={`btn ${mode === "all" ? "active" : ""}`}
        onClick={() => setMode("all")}
      >
        전체 엔진 보기
      </button>
      <button
        className={`btn ${mode === "single" ? "active" : ""}`}
        onClick={() => setMode("single")}
      >
        개별 엔진 보기
      </button>

      <select
        className="select"
        value={selected === "all" ? "" : selected}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "") onSelect("all");
          else onSelect(Number(v));
        }}
      >
        <option value="">엔진 선택</option>
        {engineIds.map((id) => (
          <option key={id} value={id}>
            엔진 #{id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EngineSelector;
