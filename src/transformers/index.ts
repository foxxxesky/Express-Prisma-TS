import { User } from 'types'

export const transformUser = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

export const transformUserArray = (users: User[]) => {
  return users.map(user => transformUser(user));
}
