import type { Pokemon } from "@/models/pokemon"
import { BaseService } from "./baseService"

interface GetPokemonsResponse {
  results: {
    name: string
    url: string
  }[]
}

interface GetPokemonResponse {
  id: number
  name: string
  weight: number
  sprites: {
    front_default: string
    front_shiny: string
  }
}

class PokemonService extends BaseService {
  /**
   * ポケモン情報一覧を取得する
   * offsetは取得したいデータの位置であり初期値は0
   * */
  async getAll(page: number): Promise<Pokemon[]> {
    const limit = 20
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * limit}&limit=${limit}`

    const data: GetPokemonsResponse = await (
      await fetch(url, {
        cache: "force-cache", // 「getStaticProps」next: { revalidate: false }
        // cache: "no-store", // 「getServerSideProps」next: { revalidate: 0 }
        // next: { revalidate: 10 },
      })
    ).json()
    const pokemons = await Promise.all(data.results.map(async (pokemon) => await this.getDetail(pokemon.url)))
    return pokemons
  }

  /** ポケモン詳細情報を取得する */
  private async getDetail(url: string): Promise<Pokemon> {
    const data: GetPokemonResponse = await (await fetch(url)).json()
    return {
      id: data.id,
      name: data.name,
      weight: data.weight,
      image: data.sprites.front_default,
      shinyImage: data.sprites.front_shiny,
    }
  }
}

export const pokemonService = new PokemonService()
