import type { User } from "@/features/user/types"
import { BaseService, type Pagination } from "./baseService"

class UserService extends BaseService {
  /**
   * @summary ユーザー情報一覧を取得する
   * @description フロント側でPaging,Sorting,Filteringをする
   * */
  async getByPaging(currentPage: number, email = ""): Promise<Pagination<User>> {
    const { data } = await this.api.GET("/users")
    if (!data) throw new Error("取得に失敗しました")

    // フィルタリング処理、ソーティング処理
    if (email) {
      data.users = data.users.filter((item) => item.email.includes(email))
    }

    return this.paging(data.users, currentPage)
  }
  /**
   * @summary ユーザー情報一覧を取得する
   * @description サーバー側でPaging,Sorting,Filteringをする
   * */
  async getAll(currentPage: number, email = ""): Promise<Pagination<User>> {
    const { data } = await this.api.GET("/users", { params: { query: { currentPage } } })
    if (!data) throw new Error("取得に失敗しました")

    // フィルタリング処理、ソーティング処理
    console.info({ email })

    return {
      ...data.paging,
      items: data.users,
    }
  }
}

export const userService = new UserService()
