"use client"

import { type SearchCompanyFormInput, searchCompanyFormSchema } from "@/config/schema/companySearchSchema"
import { usePagination } from "@/hooks/usePagination"
import type { Company } from "@/models/company"
import { Anchor, Button, Checkbox, Container, Flex, Group, Pagination, Paper, Stack, Table, TextInput, Title } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"
import Link from "next/link"

interface Props {
  companies: Company[]
}

export function CompaniesContainer({ companies }: Props) {
  // TODO: APIで再取得する仕組みにする
  const { currentItems: currentCompanies, totalPages, currentPage, setCurrentPage } = usePagination(companies, 4)

  const form = useForm<SearchCompanyFormInput>({
    validate: zodResolver(searchCompanyFormSchema),
    initialValues: {
      name: "",
      email: "",
      includeNoContract: false,
    },
  })

  /** 検索する */
  const searchCompany = async (input: SearchCompanyFormInput) => {
    try {
      console.info({ input })
      notifications.show({ title: "Success！", message: "", color: "teal", icon: <IconCheck size="1.2rem" /> })
    } catch (error) {
      console.error({ error })
      notifications.show({ title: "Failed！", message: "", color: "pink", icon: <IconX size="1.2rem" /> })
    }
  }

  return (
    <Container>
      <Paper mb={24} mx="auto" p="md" radius="sm">
        <Title mt="md" mb="xl" lh="36px" style={{ borderBottom: "1px solid #A0A0A0" }} size="h4" children="企業情報" />

        <Paper mb={60} p={40} bg="#E8E8E8" radius={0}>
          <form onSubmit={form.onSubmit(searchCompany)} noValidate>
            <Stack gap={24}>
              <Group>
                <TextInput maw={360} {...form.getInputProps("name")} label="企業名" />
                <TextInput maw={360} {...form.getInputProps("email")} label="企業メールアドレス" error={!!form.errors.email} />
              </Group>
              <Checkbox {...form.getInputProps("isIncludeCanceled")} label="未契約企業も含める" />
              <Flex gap="md" align="center">
                <Button variant="filled" type="submit" children="検索" />
                <Button variant="outline" type="submit" children="クリア" />
              </Flex>
            </Stack>
          </form>
        </Paper>

        <>
          <Group justify="flex-end">
            <Pagination mb={12} color="teal" withControls={false} total={totalPages} value={currentPage} onChange={setCurrentPage} />
          </Group>

          <Table.ScrollContainer minWidth="1060px">
            <Table withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th colSpan={4} ta="center" fw="bold" bg="#E8E8E8" children="ID" />
                  <Table.Th colSpan={4} ta="center" fw="bold" bg="#E8E8E8" children="企業名" />
                  <Table.Th colSpan={4} ta="center" fw="bold" bg="#E8E8E8" children="企業メールアドレス" />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {currentCompanies.map((company) => (
                  <Table.Tr key={company.id}>
                    <Table.Td colSpan={4} ta="center">
                      <Anchor href={`/companies/${company.id}`} component={Link} children={company.id} />
                    </Table.Td>
                    <Table.Td colSpan={4} children={company.name} />
                    <Table.Td colSpan={4} children={company.email} />
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </>
      </Paper>
    </Container>
  )
}
