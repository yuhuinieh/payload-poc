import { Access, FieldAccess } from 'payload'
import { User } from '../payload-types'

export const isEditor: Access<User> = ({ req: { user } }) => {
  // Return true or false based on if the user has an editor role
  return Boolean(user?.roles?.includes('editor'))
}

export const isEditorFieldLevel: FieldAccess<User> = ({ req: { user } }) => {
  // Return true or false based on if the user has an editor role
  return Boolean(user?.roles?.includes('editor'))
}
