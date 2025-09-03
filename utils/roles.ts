import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'

export const checkRole = async (role: Roles) => {
  // DISABLED FOR PREVIEW: Always return true to show all content
  return true
  
  // Original implementation (commented out for preview):
  // const { sessionClaims } = await auth()
  // return sessionClaims?.metadata.role === role
}
