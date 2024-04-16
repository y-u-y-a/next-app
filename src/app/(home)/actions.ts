"use server"

import type { Pokemon } from "@/models/pokemon"
import { pokemonService } from "@/services/pokemonService"

export async function fetchPokemonsAction(page: number): Promise<Pokemon[]> {
  const pokemons = await pokemonService.getAll(page)
  return pokemons
}
