import { funnelList, type FunnelDefinition } from "../../content/funnels";

type IngestionGridProps = {
  currentPath: string;
  onNavigate: (path: string) => void;
};

export default function IngestionGrid({ currentPath, onNavigate }: IngestionGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {funnelList.map((funnel: FunnelDefinition) => {
        const active = funnel.path === currentPath || (funnel.path === "/" && currentPath === "/");
        return (
          <button
            key={funnel.key}
            type="button"
            onClick={() => onNavigate(funnel.path)}
            className={`marketing-ingestion-card ${active ? "marketing-ingestion-card--active" : ""}`}
          >
            <span className="marketing-ingestion-label">{funnel.navLabel}</span>
            <h3 className="marketing-ingestion-title">{funnel.audienceLabel}</h3>
            <p className="marketing-ingestion-copy">{funnel.offer}</p>
            <span className="marketing-ingestion-cta">Enter this path</span>
          </button>
        );
      })}
    </div>
  );
}
