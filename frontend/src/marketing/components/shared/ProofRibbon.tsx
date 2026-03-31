import type { ProofPoint } from "../../content/funnels";

type ProofRibbonProps = {
  points: ProofPoint[];
};

export default function ProofRibbon({ points }: ProofRibbonProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {points.map((point) => (
        <div key={`${point.value}-${point.label}`} className="marketing-proof-chip">
          <span className="marketing-proof-value">{point.value}</span>
          <span className="marketing-proof-label">{point.label}</span>
        </div>
      ))}
    </div>
  );
}
