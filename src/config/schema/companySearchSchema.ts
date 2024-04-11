import { ERRORS } from "@/config/consts"
import { z } from "zod"

export const searchCompanyFormSchema = z.object({
  name: z.string(),
  email: z.string().email(ERRORS.INVALID_EMAIL_TYPE).optional().or(z.literal("")), // https://github.com/colinhacks/zod/issues/310#issuecomment-794533682
  includeNoContract: z.boolean(),
})

export type SearchCompanyFormInput = z.infer<typeof searchCompanyFormSchema>
