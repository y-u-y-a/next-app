"use server"

import { userService } from "@/services/userService"
import type { CreateUserFormInput } from "./createUserSchema"

export const createUserAction = async (input: CreateUserFormInput) => {
  await userService.create(input.name, input.email)
}
