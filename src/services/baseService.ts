import { createClient as tursoClient } from "@libsql/client"
import { PrismaLibSQL } from "@prisma/adapter-libsql"
import { PrismaClient } from "@prisma/client"
import createClient from "openapi-fetch"
import type { paths } from "./api"

const turso = tursoClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const adapter = new PrismaLibSQL(turso)

export class BaseService {
  protected api
  protected prisma
  constructor() {
    this.api = createClient<paths>({ baseUrl: "https://api.sample.com/" })
    this.prisma = new PrismaClient({ adapter })
  }
}
