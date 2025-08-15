'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const SearchUsers = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          const queryTerm = formData.get('search') as string
          router.push(pathname + '?search=' + queryTerm)
        }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Search for users
          </Label>
          <div className="mt-1 flex gap-2">
            <Input
              id="search"
              name="search"
              type="text"
              placeholder="Enter name or email..."
              className="flex-1"
            />
            <Button type="submit">
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
