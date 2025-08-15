import { Waitlist } from '@clerk/nextjs'

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Join the Waitlist
          </h1>
          <p className="text-muted-foreground">
            Be the first to experience the future of AI-powered business transformation.
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <Waitlist />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already approved? 
            <a href="/sign-in" className="text-primary hover:underline ml-1">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
