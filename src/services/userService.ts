import type { User } from "@/features/user/types"
import { sql } from "@vercel/postgres"
import { BaseService, type Pagination } from "./baseService"

class UserService extends BaseService {
  /**
   * @summary ユーザー情報一覧を取得する
   * @description フロント側でPaging,Sorting,Filteringをする
   * */
  async getByPaging(currentPage: number, email = ""): Promise<Pagination<User>> {
    const limit = 4
    const offset = limit * (currentPage - 1)
    const { rows } = await sql<{ count: number }>`SELECT COUNT(*) FROM users WHERE email LIKE ${`%${email}%`};`
    const { rows: users } = await sql<User>`SELECT * FROM users WHERE email LIKE ${`%${email}%`} LIMIT ${limit} OFFSET ${offset};`

    return {
      currentPage,
      paginate: limit,
      total: rows[0].count,
      totalPages: Math.ceil(rows[0].count / limit),
      items: users,
    }
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

  /** ユーザー登録する */
  async create(name: string, email: string): Promise<User> {
    const { data } = await this.api.POST("/user", { body: { name, email } })
    if (!data) throw new Error("ユーザー登録に失敗しました")
    return { ...data }
  }
}

export const userService = new UserService()
