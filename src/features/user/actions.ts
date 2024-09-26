"use server"

import { sql } from "@vercel/postgres"
import type { User } from "./types"
import type { UpdateUserFormInput } from "./userSchema"

export const updateUserAction = async (user: User, input: UpdateUserFormInput): Promise<User> => {
  const { rows } = await sql<User>`UPDATE users SET name = ${input.name}, email = ${input.email} WHERE id = ${user.id} RETURNING *;`
  return rows[0]
}
