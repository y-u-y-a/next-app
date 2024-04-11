import { describe, expect, test } from "vitest"

import { ERRORS } from "@/config/consts"
import { type SearchCompanyFormInput, searchCompanyFormSchema } from "./companySearchSchema"

const correctInput: SearchCompanyFormInput = {
  name: "サンプル株式会社",
  email: "test@test.com",
  includeNoContract: false,
}

describe("企業検索フォームのバリデーションテスト", () => {
  test.each([
    { ...correctInput, email: "failed.sample", expected: ERRORS.INVALID_EMAIL_TYPE },
    { ...correctInput, email: "failed@sample", expected: ERRORS.INVALID_EMAIL_TYPE },
  ])("異常系テスト", ({ expected, ...input }) => {
    expect(() => searchCompanyFormSchema.parse({ ...input })).toThrow(expected)
  })
  test.each([
    { ...correctInput, email: "" },
    { ...correctInput, email: "success@sample.com" },
  ])("正常系テスト", ({ ...input }) => {
    expect(searchCompanyFormSchema.safeParse({ ...input }).success).toBe(true)
  })
})
