import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlanTrip = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Plan Your Perfect Trip
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create detailed itineraries, manage budgets, and organize every aspect of your travel
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create New Trip Card */}
            <Card className="feature-card border-dashed border-2 border-primary/30 hover:border-primary/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Create New Trip</h3>
                <p className="text-muted-foreground mb-6">
                  Start planning your next adventure with our smart trip planner
                </p>
                <Button className="cta-button w-full">
                  Start Planning
                </Button>
              </CardContent>
            </Card>

            {/* Sample Trip Cards */}
            <Card className="feature-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Europe Adventure
                  </CardTitle>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    In Progress
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    June 15 - July 2, 2024
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    2 Travelers
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Paris, Rome, Barcelona
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Continue Planning
                </Button>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    Asian Exploration
                  </CardTitle>
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                    Completed
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    March 10 - March 25, 2024
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    4 Travelers
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Tokyo, Seoul, Bangkok
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;