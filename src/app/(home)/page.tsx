import { Container, Title } from "@mantine/core"

export default async function RootPage() {
  return (
    <Container py={40}>
      <Title mb={40} size="h2" data-testid="root-page">
        ホーム
      </Title>
    </Container>
  )
}
