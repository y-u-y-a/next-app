import { Errors } from "@/config/consts"
import { describe, expect, test } from "vitest"
import { type SearchCompanyFormInput, searchCompanyFormSchema } from "./companySchema"

const correctInput: SearchCompanyFormInput = {
  name: "サンプル株式会社",
  email: "test@test.com",
}

describe("企業検索フォームのバリデーションテスト", () => {
  test.skip.each([
    { ...correctInput, email: "failed.sample", expected: Errors.INVALID_EMAIL_TYPE },
    { ...correctInput, email: "failed@sample", expected: Errors.INVALID_EMAIL_TYPE },
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
