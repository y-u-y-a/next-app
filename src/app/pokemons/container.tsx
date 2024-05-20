"use client"

import { Group, Pagination } from "@mantine/core"
import { usePathname, useRouter } from "next/navigation"

export function RootContainer({ currentPage, totalPage }: { currentPage: number; totalPage: number }) {
  const router = useRouter()
  const pathname = usePathname()

  const refetch = (newPage: number) => {
    router.replace(`${pathname}?page=${newPage}`)
  }
  return (
    <>
      <Group mb={20} justify="flex-end">
        <Pagination color="teal" total={totalPage} value={currentPage} onChange={refetch} />
      </Group>
    </>
  )
}
