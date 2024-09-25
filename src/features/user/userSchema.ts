import { z } from "zod"

const userFormSchema = z.object({
  name: z.string(),
  email: z.string(),

  /**
   * @see https://github.com/colinhacks/zod/issues/310#issuecomment-794533682
   * */
  // email: z.string().email(Errors.INVALID_EMAIL_TYPE).optional().or(z.literal("")),
})

export const createUserFormSchema = userFormSchema
export const searchUserFormSchema = userFormSchema

export type CreateUserFormInput = z.infer<typeof createUserFormSchema>
export type SearchUserFormInput = z.infer<typeof searchUserFormSchema>
