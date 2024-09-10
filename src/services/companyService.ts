import type { Company } from "@/features/company/types"
import { BaseService, type Pagination } from "./baseService"

class CompanyService extends BaseService {
  /**
   * @summary 企業情報一覧を取得する
   * @description フロント側でPaging,Sorting,Filteringをする
   * */
  async getByPaging(currentPage: number, email = ""): Promise<Pagination<Company>> {
    const { data } = await this.api.GET("/companies")
    if (!data) throw new Error("取得に失敗しました")

    // フィルタリング処理、ソーティング処理
    if (email) {
      data.companies = data.companies.filter((item) => item.email.includes(email))
    }

    return this.paging(data.companies, currentPage)
  }
  /**
   * @summary 企業情報一覧を取得する
   * @description サーバー側でPaging,Sorting,Filteringをする
   * */
  async getAll(currentPage: number, email = ""): Promise<Pagination<Company>> {
    const { data } = await this.api.GET("/companies", { params: { query: { currentPage } } })
    if (!data) throw new Error("取得に失敗しました")

    // フィルタリング処理、ソーティング処理
    console.info({ email })

    return {
      ...data.paging,
      items: data.companies,
    }
  }
}

export const companyService = new CompanyService()
