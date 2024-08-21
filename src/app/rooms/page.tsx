import { Center } from "@mantine/core"
import type { Metadata } from "next/types"
import { RoomsMap } from "./RoomsMap"

export const metadata: Metadata = {
  title: "物件一覧",
  description: "物件一覧",
}

export default function RoomsPage() {
  return (
    <Center>
      <RoomsMap />
    </Center>
  )
}
