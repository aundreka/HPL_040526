import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Endcard1Landscape from "./components/endcard1_landscape/endcard1_landscape.jsx";
import Endcard1Portrait from "./components/endcard1_portrait/endcard1_portrait.jsx";
import MIP02 from "./components/MIP02/MIP02.jsx";

const COMPONENTS = [
  {
    id: "endcard1-portrait",
    label: "Endcard 1 Portrait",
    description: "Portrait carousel end card.",
    Component: Endcard1Portrait,
  },
  {
    id: "endcard1-landscape",
    label: "Endcard 1 Landscape",
    description: "Landscape carousel end card.",
    Component: Endcard1Landscape,
  },
  {
    id: "mip02",
    label: "MIP02",
    description: "Scrollable MIP product flow.",
    Component: MIP02,
  },
];

function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function getComponentFromPath(pathname) {
  const match = pathname.match(/^\/components\/([^/]+)$/);
  if (!match) return null;
  return COMPONENTS.find((item) => item.id === match[1]) ?? null;
}

export default function App() {
  const [pathname, setPathname] = useState(() => getCurrentPath());

  useEffect(() => {
    const syncPath = () => setPathname(getCurrentPath());
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  useEffect(() => {
    const component = getComponentFromPath(pathname);
    const isMIP02Page = component?.id === "mip02";
    document.body.classList.toggle("mip02-page", isMIP02Page);
    return () => document.body.classList.remove("mip02-page");
  }, [pathname]);

  const activeComponent = useMemo(() => getComponentFromPath(pathname), [pathname]);

  if (activeComponent) {
    const ActiveComponent = activeComponent.Component;
    return (
      <div className="componentOnlyPage">
        <ActiveComponent />
      </div>
    );
  }

  return (
    <div className="showcaseShell">
      <main className="showcaseBrowser">
        <p className="showcaseEyebrow">Component Browser</p>
        <h1 className="showcaseTitle">Components</h1>
        <p className="showcaseDescription">
          Select a component to open it in a dedicated page.
        </p>
        <div className="showcaseNav">
          {COMPONENTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="showcaseButton"
              onClick={() =>
                window.open(
                  `/components/${item.id}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <span className="showcaseButtonLabel">{item.label}</span>
              <span className="showcaseButtonMeta">{item.description}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
