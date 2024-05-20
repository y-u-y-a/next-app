import type { Pokemon } from "@/models/pokemon"
import { Card, CardSection, Grid, GridCol, Image, Text } from "@mantine/core"
import Link from "next/link"

interface Props {
  pokemons: Pokemon[]
}

export function PokemonList({ pokemons }: Props) {
  return (
    <>
      <Grid>
        {pokemons.map((pokemon) => (
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
