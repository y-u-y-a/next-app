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
   * ページネーションによるデータ取得をする
   * 総データ数から、limitで分割した場合のtotalPageを取得する必要
   * */
  async getPagination(page = 1, pageSize = 20): Promise<{ page: number; totalPage: number; pokemons: Pokemon[] }> {
    const offset = (page - 1) * pageSize // pokeAPIの仕様でoffset=0が初期値のため
    const totalPage = 400 / pageSize // 400はダミー件数、ポケモン総数から算出する必要

    const pokemons = await this.getAll(offset, pageSize)
    return { page, totalPage, pokemons }
  }
  /**
   * ポケモン情報一覧を取得する
   * @param offset 何件目のデータから取得したいか
   * @param limit offsetから何件取得するか
   * */
  private async getAll(offset: number, limit: number): Promise<Pokemon[]> {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    const data: GetPokemonsResponse = await (
      await fetch(url, {
        // cache: "force-cache", // 「getStaticProps」next: { revalidate: false }
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
