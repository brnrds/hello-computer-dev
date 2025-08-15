import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { SearchUsers } from './SearchUsers'
import { clerkClient } from '@clerk/nextjs/server'
import { removeRole, setRole } from './_actions'

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>
}) {
  if (!(await checkRole('admin'))) {
    redirect('/')
  }

  const query = (await params.searchParams).search

  const client = await clerkClient()

  const users = query ? (await client.users.getUserList({ query })).data : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          This is the protected admin dashboard restricted to users with the `admin` role.
        </p>
      </div>

      <div className="mb-8">
        <SearchUsers />
      </div>

      {users.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Search Results</h2>
          <div className="grid gap-4">
            {users.map((user) => (
              <div key={user.id} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-medium text-card-foreground">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {
                        user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
                          ?.emailAddress
                      }
                    </div>
                    <div className="text-sm">
                      Current role: <span className="font-medium text-primary">
                        {(user.publicMetadata.role as string) || 'No role assigned'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <form action={setRole}>
                      <input type="hidden" value={user.id} name="id" />
                      <input type="hidden" value="admin" name="role" />
                      <button 
                        type="submit" 
                        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                      >
                        Make Admin
                      </button>
                    </form>

                    <form action={setRole}>
                      <input type="hidden" value={user.id} name="id" />
                      <input type="hidden" value="moderator" name="role" />
                      <button 
                        type="submit" 
                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                      >
                        Make Moderator
                      </button>
                    </form>

                    <form action={removeRole}>
                      <input type="hidden" value={user.id} name="id" />
                      <button 
                        type="submit" 
                        className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                      >
                        Remove Role
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {query && users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found for "{query}"</p>
        </div>
      )}
    </div>
  )
}
