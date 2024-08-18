import { companyService } from "@/services/companyService"
import { Anchor, Container, Paper, Table, TableScrollContainer, TableTbody, TableTd, TableTh, TableThead, TableTr, Title } from "@mantine/core"
import Link from "next/link"
import type { Metadata } from "next/types"
import { PaginationGroup } from "../../components/elements/PaginationGroup"
import { SearchCompanyForm } from "./SearchCompanyForm"

/**
 * デフォルトは静的レンダリングであり、mockサーバーがローカルのみなので動的レンダリングを指定しています
 * APIの実装が完了すれば下記記載は削除できます
 */
// export const dynamic: NextJS["dynamic"] = "force-dynamic"

export const metadata: Metadata = {
  title: "企業情報",
  description: "企業情報",
}

interface Props {
  searchParams: {
    page: string
    email: string
  }
}

export default async function CompaniesPage({ searchParams: { page, email } }: Props) {
  const currentPage = Number(page) || 1
  const { items: companies, totalPages } = await companyService.getByPaging(currentPage, email || "")

  return (
    <Container>
      <Paper mb={24} mx="auto" p="md" radius="sm">
        <Title mt="md" mb="xl" lh="36px" style={{ borderBottom: "1px solid #A0A0A0" }} size="h4" children="企業情報" />
        <SearchCompanyForm />
        <PaginationGroup currentPage={currentPage} totalPage={totalPages} />
        <TableScrollContainer minWidth="1060px">
          <Table withTableBorder withColumnBorders>
            <TableThead>
              <TableTr>
                <TableTh colSpan={4} ta="center" fw="bold" bg="#E8E8E8" children="ID" />
                <TableTh colSpan={4} ta="center" fw="bold" bg="#E8E8E8" children="企業名" />
                <TableTh colSpan={4} ta="center" fw="bold" bg="#E8E8E8" children="企業メールアドレス" />
              </TableTr>
            </TableThead>
            <TableTbody>
              {companies.map((company) => (
                <TableTr key={company.id}>
                  <TableTd colSpan={4} ta="center">
                    <Anchor href={`/companies/${company.id}`} component={Link} children={company.id} />
                  </TableTd>
                  <TableTd colSpan={4} children={company.name} />
                  <TableTd colSpan={4} children={company.email} />
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </TableScrollContainer>
      </Paper>
    </Container>
  )
}
