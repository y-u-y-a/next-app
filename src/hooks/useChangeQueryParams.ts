"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

/**
 * クエリパラメータを変更するhooks
 * @example useChangeQueryParams("page") "page"は操作するクエリパラメータ
 * */
export const useChangeQueryParams = (newQueryParams: string) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /** 既存のクエリパラメータを変更する */
  const changeQueryParams = (newPage: string | number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(newQueryParams, newPage.toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  /** 既存のクエリパラメータを上書きする */
  const overwriteQueryParams = (keyword: string) => {
    router.replace(`${pathname}?${newQueryParams}=${keyword}`)
  }

  return { changeQueryParams, overwriteQueryParams }
}
