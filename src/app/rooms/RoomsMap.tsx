"use client"

import { useGoogleMap } from "@/hooks/useGoogleMap"
import { Status, Wrapper } from "@googlemaps/react-wrapper"
import { Box, Loader, Text } from "@mantine/core"
import { useRef } from "react"

export const RoomsMap = () => {
  const mapRef = useRef(null)
  useGoogleMap(mapRef)

  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
      render={(status) => {
        switch (status) {
          case Status.LOADING:
            return <Loader />
          case Status.FAILURE:
            return <Text children="表示に失敗しました" />
          default:
            return <Box ref={mapRef} pos="relative" w="100vw" mih={"100vh"} />
        }
      }}
    />
  )
}
