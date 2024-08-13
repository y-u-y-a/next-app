"use client"

import { useChangeQueryParams } from "@/hooks/useChangeQueryParams"
import { Group, type GroupProps, Pagination } from "@mantine/core"

interface Props extends GroupProps {
  currentPage: number // 選択中のページ位置(1〜)
  totalPage: number // 総ページ数
}

export const PaginationGroup = ({ currentPage, totalPage, ...props }: Props) => {
  const { changeQueryParams } = useChangeQueryParams("page")

  return (
    <Group mb={20} justify="flex-end" {...props}>
      <Pagination color="teal" total={totalPage} value={currentPage} onChange={changeQueryParams} />
    </Group>
  )
}
