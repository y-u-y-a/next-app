import { PaginationGroup } from "@/components/elements/PaginationGroup"
import { pokemonService } from "@/services/pokemonService"
import { Container, Title } from "@mantine/core"
import type { Metadata } from "next"
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
  const { pokemons, totalPage } = await pokemonService.getByPaging(currentPage)

  return (
    <Container py={40}>
      <Title mb={40} size="h2" data-testid="root-page" children="ポケモン一覧" />
      <PaginationGroup currentPage={currentPage} totalPage={totalPage} />
      <PokemonList pokemons={pokemons} />
    </Container>
  )
}
