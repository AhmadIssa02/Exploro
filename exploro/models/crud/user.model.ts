
export interface User {
  _id: string
  name: string
  email: string
  profilePicture?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

export interface UserRequest {
  name: string
  email: string
  password: string
}
