import type { Company } from "@/models/company"
import { BaseService } from "./baseService"

class CompanyService extends BaseService {
  /** 企業情報一覧を取得する */
  async getAll(): Promise<Company[]> {
    const companies = await this.db.company.findMany()

    return companies.map((company) => ({
      id: company.id,
      name: company.name,
      email: company.email,
    }))
  }
}

export const companyService = new CompanyService()
