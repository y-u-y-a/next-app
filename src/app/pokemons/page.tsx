import { pokemonService } from "@/services/pokemonService"
import { Container, Title } from "@mantine/core"
import type { Metadata } from "next"
import { PaginationGroup } from "./PaginationGroup"
import { PokemonList } from "./PokemonList"

interface Props {
  searchParams: {
    page: string
  }
}

export const metadata: Metadata = {
  title: "ポケモン一覧",
  description: "現在図鑑に登録されているポケモン一覧です。",
}

export default async function RootPage({ searchParams: { page } }: Props) {
  const currentPage = Number(page) || 1
  const { pokemons, totalPage } = await pokemonService.getPagination(currentPage)

  return (
    <Container py={40}>
      <Title mb={40} size="h2" data-testid="root-page">
        ポケモン一覧
      </Title>

      <PaginationGroup currentPage={currentPage} totalPage={totalPage} />
      <PokemonList pokemons={pokemons} />
    </Container>
  )
}
