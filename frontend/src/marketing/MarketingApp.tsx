import { useEffect, useState } from "react";
import MarketingSite from "./pages/MarketingSite";
import DiscerningAiPage from "./pages/DiscerningAiPage";
import "./marketing.css";
import { isDiscerningAiPath, stripBasePath, withBasePath } from "./routes";

function currentPathname() {
  if (typeof window === "undefined") return "/";
  return stripBasePath(window.location.pathname || "/");
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
    window.history.pushState({}, "", withBasePath(nextPath));
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isDiscerningAiPath(pathname)) {
    return <DiscerningAiPage pathname={pathname} onNavigate={navigateTo} />;
  }

  return <MarketingSite pathname={pathname} onNavigate={navigateTo} />;
}
