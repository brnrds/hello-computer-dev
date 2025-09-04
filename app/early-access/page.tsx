import { Waitlist } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EarlyAccessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Get Early Access to the Future of{' '}
              <span className="text-retro-orange-bright">AI Business</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of forward-thinking businesses already on our waitlist. 
              Be among the first to experience AI-powered growth marketing, creative engines, 
              and seamless technical integration.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="#waitlist">
                  Join the Waitlist
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What You'll Get
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Early access members receive exclusive benefits and priority access to our full suite of AI tools.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-retro-orange-bright">
                  <span className="text-sm font-semibold text-white">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-foreground">
                    Priority Access
                  </h3>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    Skip the line and get immediate access to our platform when we launch.
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-retro-orange-bright">
                  <span className="text-sm font-semibold text-white">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-foreground">
                    Exclusive Pricing
                  </h3>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    Lock in founder pricing with significant discounts for early supporters.
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-retro-orange-bright">
                  <span className="text-sm font-semibold text-white">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-foreground">
                    Shape the Product
                  </h3>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    Direct access to our team and influence over product development priorities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Section */}
      <div id="waitlist" className="bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">
              Join the Waitlist
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Reserve your spot and be notified the moment we're ready for you.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-md">
            <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
              <Waitlist />
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Already approved? 
              <Link href="/sign-in" className="text-primary hover:underline ml-1">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
