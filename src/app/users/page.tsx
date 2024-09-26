import { Container, Paper, Skeleton, Title } from "@mantine/core"
import type { Metadata } from "next/types"
import { Suspense } from "react"
import { SearchUserForm } from "./SearchUserForm"
import { UsersTable } from "./UsersTable"

/**
 * 0:常に動的クエリを発行して表示する
 */
export const revalidate = 0

/**
 * デフォルトは静的レンダリングであり、mockサーバーがローカルのみなので動的レンダリングを指定しています
 * APIの実装が完了すれば下記記載は削除できます
 */
// export const dynamic: NextJS["dynamic"] = "force-dynamic"

export const metadata: Metadata = {
  title: "Users",
  description: "Users",
}

interface Props {
  searchParams: {
    page?: string
    email?: string
  }
}

export default function UsersPage({ searchParams: { page, email } }: Props) {
  const currentPage = Number(page) || 1

  return (
    <Container>
      <Paper mb={24} mx="auto" p="md" radius="sm">
        <Title mt="md" mb="xl" lh="36px" style={{ borderBottom: "1px solid #A0A0A0" }} size="h4" children="Users" />
        <SearchUserForm />
        <Suspense fallback={<Skeleton miw="1060px" h="200px" />}>
          <UsersTable currentPage={currentPage} email={email || ""} />
        </Suspense>
      </Paper>
    </Container>
  )
}
