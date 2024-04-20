"use client"

import { pokemonService } from "@/services/pokemonService"
import { Group, Pagination } from "@mantine/core"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { PokemonList } from "./PokemonList"

export function RootContainer() {
  const router = useRouter()
  const currentPage = Number(useSearchParams().get("page")) || 1

  const { data, isLoading } = useSWR(`/pokemons?page=${currentPage}`, () => pokemonService.getPagination(currentPage))

  const refetch = (newPage: number) => {
    router.replace(`/?page=${newPage}`)
  }

  return (
    <>
      <Group mb={20} justify="flex-end">
        <Pagination color="teal" total={data?.totalPage || 40} value={currentPage} onChange={refetch} />
      </Group>
      {!isLoading && data && <PokemonList pokemons={data.pokemons} />}
    </>
  )
}
