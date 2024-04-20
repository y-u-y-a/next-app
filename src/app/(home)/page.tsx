import { Container, Title } from "@mantine/core"
import type { Metadata } from "next"
import { Suspense } from "react"
import { RootContainer } from "./container"

export const metadata: Metadata = {
  title: "ポケモン一覧",
  description: "現在図鑑に登録されているポケモン一覧です。",
}

export default function RootPage() {
  return (
    <Container py={40}>
      <Title mb={40} size="h2" data-testid="root-page">
        ポケモン一覧
      </Title>
      <Suspense>
        <RootContainer />
      </Suspense>
    </Container>
  )
}
