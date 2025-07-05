import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Works from "@/pages/works";
import Members from "@/pages/members";
import News from "@/pages/news";
import About from "@/pages/about";
import ImperialCouncil from "@/pages/imperial-council";
import EcumenicalScope from "@/pages/ecumenical-scope";
import Creed from "@/pages/creed";
import DoctrineProtection from "@/pages/doctrine-protection";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/works" component={Works} />
          <Route path="/members" component={Members} />
          <Route path="/news" component={News} />
          <Route path="/about" component={About} />
          <Route path="/imperial-council" component={ImperialCouncil} />
          <Route path="/ecumenical-scope" component={EcumenicalScope} />
          <Route path="/creed" component={Creed} />
          <Route path="/doctrine-protection" component={DoctrineProtection} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;