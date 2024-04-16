"use client"

import { pokemonService } from "@/services/pokemonService"
import { Container, Title } from "@mantine/core"
import { RootContainer } from "./container"

export default async function RootPage() {
  const pokemons = await pokemonService.getAll(1)

  return (
    <>
      <Container py={40}>
        <Title mb={40} size="h2" data-testid="root-page">
          ポケモン一覧
        </Title>
        <RootContainer pokemons={pokemons} />
      </Container>
    </>
  )
}
