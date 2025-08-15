import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your Hello Computer account
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <SignIn />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Not approved yet? 
            <a href="/waitlist" className="text-primary hover:underline ml-1">
              Join the waitlist
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
