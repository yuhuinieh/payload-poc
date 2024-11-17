import { Access, FieldAccess } from 'payload'
import { User } from '../payload-types'

export const isAdmin: Access<User> = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdminFieldLevel: FieldAccess<User> = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  console.log('isAdminFieldLevel', user?.roles)
  return Boolean(user?.roles?.includes('admin'))
}
