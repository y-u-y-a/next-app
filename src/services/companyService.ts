import type { Company } from "@/domain/company/types"
import { BaseService, type Pagination } from "./baseService"

class CompanyService extends BaseService {
  /** 企業情報一覧を取得する */
  async getAll(): Promise<Company[]> {
    const { data } = await this.api.GET("/companies")
    if (!data) return []

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
    }))
  }

  /** 企業情報をページネーション取得する */
  async getPagination(currentPage: number, email = ""): Promise<Pagination<Company>> {
    let { data: allItems } = await this.api.GET("/companies")
    if (!allItems) throw new Error("取得に失敗しました")

    // フィルタリング
    if (email) {
      allItems = allItems.filter((item) => item.email.includes(email))
    }

    return this.paging(allItems, currentPage)
  }
}

export const companyService = new CompanyService()
