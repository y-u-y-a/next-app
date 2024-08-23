import { Container } from "@mantine/core"
import type { Metadata } from "next/types"
import { CreateUserForm } from "./CreateUserForm"

export const metadata: Metadata = {
  title: "トップ",
  description: "トップ",
}

export default function RootPage() {
  return (
    <Container py={40}>
      <CreateUserForm mt={40} mx="auto" maw={600} />
    </Container>
  )
}
