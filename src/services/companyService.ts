import type { Company } from "@/models/company"
import { ApiService } from "./apiService"

class CompanyService extends ApiService {
  /** 企業情報一覧を取得する */
  async getAll(): Promise<Company[]> {
    const { data } = await this.mock.GET("/companies")
    if (!data) return []

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
    }))
  }
}

export const companyService = new CompanyService()
