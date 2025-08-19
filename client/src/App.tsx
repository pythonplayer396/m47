import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Staffs from "@/pages/staffs";
import Contribute from "@/pages/contribute";
import Updates from "@/pages/updates";
import UpdateDetail from "@/pages/update-detail";
import BestStaffs from "@/pages/best-staffs";
import Contact from "@/pages/contact";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";
import StaffDetail from "@/pages/staff-detail";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/staffs" component={Staffs} />
          <Route path="/best-staffs" component={BestStaffs} />
          <Route path="/contribute" component={Contribute} />
          <Route path="/updates" component={Updates} />
          <Route path="/updates/:id" component={UpdateDetail} />
          <Route path="/staffs/:id" component={StaffDetail} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" component={Profile} />
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