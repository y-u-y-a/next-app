"use client"

import { Group, type GroupProps, Pagination } from "@mantine/core"
import { usePathname, useRouter } from "next/navigation"

interface Props extends GroupProps {
  currentPage: number
  totalPage: number
}

/**
 * クエリパラメータでページネーションするコンポーネント
 * @param currentPage 選択中のページ位置(1〜)
 * @param totalPage 総ページ数
 */
export function PaginationGroup({ currentPage, totalPage, ...props }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const refetch = (newPage: number) => {
    router.replace(`${pathname}?page=${newPage}`)
  }
  return (
    <Group mb={20} justify="flex-end" {...props}>
      <Pagination color="teal" total={totalPage} value={currentPage} onChange={refetch} />
    </Group>
  )
}
