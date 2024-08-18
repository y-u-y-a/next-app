import type { User } from "@/domain/user/types"
import { BaseService } from "./baseService"

class UserService extends BaseService {
  /** ユーザー登録する */
  async create(name: string, email: string): Promise<User> {
    const { data } = await this.api.POST("/user", { body: { name, email } })
    if (!data) throw new Error("ユーザー登録に失敗しました")
    return { ...data }
  }
}

export const userService = new UserService()
