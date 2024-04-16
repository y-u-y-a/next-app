import createClient from "openapi-fetch"
import type { paths } from "./api"

export class BaseService {
  protected mock
  protected api
  constructor() {
    this.mock = createClient<paths>({ baseUrl: "http://localhost:8000/" })
    this.api = createClient<paths>({ baseUrl: "https://api.sample.com/" })
  }
}
