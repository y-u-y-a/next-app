import { userService } from "@/services/userService"
import { Anchor, Container, Paper, Table, TableScrollContainer, TableTbody, TableTd, TableTh, TableThead, TableTr, Title } from "@mantine/core"
import Link from "next/link"
import type { Metadata } from "next/types"
import { PaginationGroup } from "../../components/elements/PaginationGroup"
import { SearchUserForm } from "./SearchUserForm"

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

export default async function UsersPage({ searchParams: { page, email } }: Props) {
  const currentPage = Number(page) || 1
  const { items: users, totalPages } = await userService.getByPaging(currentPage, email)

  return (
    <Container>
      <Paper mb={24} mx="auto" p="md" radius="sm">
        <Title mt="md" mb="xl" lh="36px" style={{ borderBottom: "1px solid #A0A0A0" }} size="h4" children="Users" />
        <SearchUserForm />
        <PaginationGroup currentPage={currentPage} totalPage={totalPages} />
        <TableScrollContainer minWidth="1060px">
          <Table withTableBorder withColumnBorders>
            <TableThead>
              <TableTr>
                <TableTh colSpan={4} ta="center" fw="bold" bg="gray.2" children="ID" />
                <TableTh colSpan={4} ta="center" fw="bold" bg="gray.2" children="Name" />
                <TableTh colSpan={4} ta="center" fw="bold" bg="gray.2" children="Email" />
              </TableTr>
            </TableThead>
            <TableTbody>
              {users.map((user) => (
                <TableTr key={user.id}>
                  <TableTd colSpan={4} ta="center">
                    <Anchor href={`/users/${user.id}`} component={Link} children={user.id} />
                  </TableTd>
                  <TableTd colSpan={4} children={user.name} />
                  <TableTd colSpan={4} children={user.email} />
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </TableScrollContainer>
      </Paper>
    </Container>
  )
}
