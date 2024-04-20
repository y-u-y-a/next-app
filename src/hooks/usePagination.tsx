import { useState } from "react"

/**
 * 全てのデータを取得してページネーションしたい場合
 */
export const usePagination = <T,>(items: T[], perPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)

  // ページネーション分割
  const newItemsList = Array.from({ length: Math.ceil(items.length / perPage) }, (_, i) => items.slice(i * perPage, i * perPage + perPage))
  // 現在のアイテム一覧
  const currentItems = newItemsList[currentPage - 1]

  return {
    currentItems,
    currentPage,
    totalPages: newItemsList.length,
    setCurrentPage,
  }
}
