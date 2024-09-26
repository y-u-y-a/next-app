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

  async find(userId: string): Promise<User> {
    const { rows } = await sql<User>`SELECT * FROM users WHERE id = ${userId} LIMIT 1;`
    return rows[0]
  }
}

export const userService = new UserService()
