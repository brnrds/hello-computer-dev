import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PriorityAccessCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-retro-orange-bright/5 to-retro-orange-warm/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-retro-orange-bright/20 bg-card/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-retro-orange-bright/10 rounded-full mb-4">
                <Zap className="w-8 h-8 text-retro-orange-bright" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Skip the Waitlist with Priority Access
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete our qualification form to get priority access to Hello Computer. 
                Qualified businesses can skip the general waitlist and get immediate access.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-retro-orange-bright mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Fast Track</h3>
                <p className="text-sm text-muted-foreground">
                  Skip the general waitlist queue with our priority application
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-retro-orange-bright mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Personal Review</h3>
                <p className="text-sm text-muted-foreground">
                  Every application gets personal review within 24 hours
                </p>
              </div>
              <div className="text-center">
                <Zap className="w-12 h-12 text-retro-orange-bright mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Immediate Access</h3>
                <p className="text-sm text-muted-foreground">
                  Qualified businesses can get access within hours, not weeks
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-retro-orange-bright hover:bg-retro-orange-dark">
                <Link href="/contact-waitlist">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Apply for Priority Access
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Takes 3-5 minutes • Reviewed within 24 hours • No spam, ever
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
