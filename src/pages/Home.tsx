
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/common/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-28 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Smart Waste Collection for Modern Living
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Schedule pickups, track waste reduction, and contribute to a cleaner environment with our innovative service.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="px-8">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Background gradient effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/20 blur-[120px] -z-0 opacity-50"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass-card p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
                <h3 className="text-xl font-semibold mb-4">Weekly Pickup</h3>
                <p className="text-muted-foreground mb-4">
                  Regular weekly waste collection scheduled on your preferred day.
                </p>
                <Button variant="ghost" className="group">
                  Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
              
              <Card className="glass-card p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
                <h3 className="text-xl font-semibold mb-4">Urgent Service</h3>
                <p className="text-muted-foreground mb-4">
                  Need immediate waste removal? Get our urgent pickup within 2 hours.
                </p>
                <Button variant="ghost" className="group">
                  Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
              
              <Card className="glass-card p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
                <h3 className="text-xl font-semibold mb-4">Eco Monitoring</h3>
                <p className="text-muted-foreground mb-4">
                  Track your waste reduction progress and environmental impact.
                </p>
                <Button variant="ghost" className="group">
                  Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of satisfied customers who have simplified their waste management.
              </p>
              <Button asChild size="lg">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-gradient">TrashFlow</span>
              <p className="text-sm text-muted-foreground mt-1">© 2025 TrashFlow. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
