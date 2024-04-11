import { Container, Title } from "@mantine/core"

export default async function RootPage() {
  return (
    <>
      <Container py={40}>
        <Title size="h2" data-testid="home-articles">
          トップページ
        </Title>
      </Container>
    </>
  )
}
