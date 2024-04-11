import { companyService } from "@/services/companyService"
import type { Metadata } from "next/types"
import { CompaniesContainer } from "./container"

/**
 * デフォルトは静的レンダリングであり、mockサーバーがローカルのみなので動的レンダリングを指定しています
 * APIの実装が完了すれば下記記載は削除できます
 */
export const dynamic: NextJS["dynamic"] = "force-dynamic"

export const metadata: Metadata = {
  title: "企業情報",
  description: "企業情報",
}

export default async function CompaniesPage() {
  const companies = await companyService.getAll()

  return (
    <>
      <CompaniesContainer companies={companies} />
    </>
  )
}
