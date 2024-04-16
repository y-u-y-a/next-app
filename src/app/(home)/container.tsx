"use client"

import type { Pokemon } from "@/models/pokemon"
import { pokemonService } from "@/services/pokemonService"
import { Card, CardSection, Grid, GridCol, Group, Image, Pagination, Text } from "@mantine/core"
import Link from "next/link"
import { useState } from "react"

interface Props {
  pokemons: Pokemon[]
}

export function RootContainer({ pokemons }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPokemons, setCurrentPokemons] = useState<Pokemon[]>(pokemons)

  const refetchPokemons = async (newPage: number): Promise<void> => {
    const pokemons = await pokemonService.getAll(newPage)
    setCurrentPokemons(pokemons)
    setCurrentPage(newPage)
  }

  return (
    <>
      <Group mb={20} justify="flex-end">
        <Pagination color="teal" withControls={false} total={20} value={currentPage} onChange={refetchPokemons} />
      </Group>

      <Grid>
        {currentPokemons.map((pokemon) => (
          <GridCol span={{ base: 12, xs: 6, sm: 4, md: 3 }} key={pokemon.id}>
            <Card component={Link} href={pokemon.image} target="_blank" withBorder>
              <CardSection>
                <Image src={pokemon.image} alt={pokemon.name} />
              </CardSection>
              <Text fw="bold" ta="center" children={pokemon.name} lineClamp={2} />
            </Card>
          </GridCol>
        ))}
      </Grid>
    </>
  )
}
