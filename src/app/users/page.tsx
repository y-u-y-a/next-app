import { Container } from "@mantine/core"
import type { Metadata } from "next/types"
import { CreateUserForm } from "./CreateUserForm"

export const metadata: Metadata = {
  title: "ユーザー一覧",
  description: "ユーザー一覧",
}

export default function UsersPage() {
  return (
    <Container py={40}>
      <CreateUserForm mt={40} mx="auto" maw={600} />
    </Container>
  )
}
