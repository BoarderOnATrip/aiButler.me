import { useEffect, useState } from "react";
import OrigamiResearchPage from "./pages/OrigamiResearchPage";
import MarketingSite from "./pages/MarketingSite";
import "./marketing.css";
import "./styles/origami.css";
import { isOrigamiPath } from "./routes";

function currentPathname() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname || "/";
}

export default function MarketingApp() {
  const [pathname, setPathname] = useState(currentPathname);

  useEffect(() => {
    const onPopState = () => setPathname(currentPathname());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigateTo = (nextPath: string) => {
    if (nextPath === pathname) return;
    window.history.pushState({}, "", nextPath);
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isOrigamiPath(pathname)) {
    return <OrigamiResearchPage onNavigate={navigateTo} />;
  }

  return <MarketingSite pathname={pathname} onNavigate={navigateTo} />;
}
