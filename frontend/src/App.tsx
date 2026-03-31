import { useEffect } from "react";
import MarketingApp from "./marketing/MarketingApp";

export default function App() {
  useEffect(() => {
    document.body.dataset.surface = "marketing";
    return () => {
      delete document.body.dataset.surface;
    };
  }, []);

  return <MarketingApp />;
}

