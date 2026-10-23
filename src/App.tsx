import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import ProjectDetailPage from "./components/ProjectDetailPage";
import { ROUTE_EVENT, navigate } from "./router";

/** hash 路由：#/project/01 → 项目详情；其余 → 首页 */
function readRoute(): string | null {
  const m = window.location.hash.match(/^#\/project\/(\d+)$/);
  return m ? m[1] : null;
}

export default function App() {
  const [projectId, setProjectId] = useState<string | null>(readRoute);

  useEffect(() => {
    const onHash = () => setProjectId(readRoute());
    // 事件驱动路由：沙箱 iframe 预览会拦截锚点导航，事件兜底
    const onRoute = (e: Event) =>
      setProjectId((e as CustomEvent<string | null>).detail);
    window.addEventListener("hashchange", onHash);
    window.addEventListener(ROUTE_EVENT, onRoute);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener(ROUTE_EVENT, onRoute);
    };
  }, []);

  if (projectId) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] font-kanit" style={{ overflowX: "clip" }}>
        <ProjectDetailPage
          key={projectId}
          projectId={projectId}
          onBack={() => navigate("")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] font-kanit" style={{ overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
