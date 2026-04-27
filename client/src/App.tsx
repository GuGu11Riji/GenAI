// App.tsx
// Design: Deep Space Quantum Aesthetics — Main app with sidebar layout

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SideNav from "./components/SideNav";
import Home from "./pages/Home";
import GalaxyPage from "./pages/GalaxyPage";
import ProjectsPage from "./pages/ProjectsPage";
import TimelinePage from "./pages/TimelinePage";
import ResearchersPage from "./pages/ResearchersPage";
import AgentPage from "./pages/AgentPage";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/galaxy" component={GalaxyPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/timeline" component={TimelinePage} />
      <Route path="/researchers" component={ResearchersPage} />
      <Route path="/agent" component={AgentPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="flex min-h-screen" style={{ background: "#050810" }}>
            <SideNav />
            <main className="flex-1 min-w-0">
              <Router />
            </main>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
