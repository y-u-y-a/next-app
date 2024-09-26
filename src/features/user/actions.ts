"use server"

import { userService } from "@/services/userService"
import type { User } from "./types"
import type { UpdateUserFormInput } from "./userSchema"

export const updateUserAction = async (user: User, input: UpdateUserFormInput): Promise<User> => {
  const newUser = await userService.update(user.id, input)
  return newUser
}
