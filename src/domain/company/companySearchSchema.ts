import { z } from "zod"

export const searchCompanyFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  // includeNoContract: z.boolean(),
})

export type SearchCompanyFormInput = z.infer<typeof searchCompanyFormSchema>
