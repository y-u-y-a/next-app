"use client"

import { useGoogleMap } from "@/hooks/useGoogleMap"
import { Status, Wrapper } from "@googlemaps/react-wrapper"
import { Box, Loader } from "@mantine/core"
import { useRef } from "react"

/**
 * @see https://github.com/googlemaps/react-wrapper
 * @see https://developers.google.com/maps/documentation/javascript/react-map?hl=ja
 * @see https://developers.google.com/maps/documentation/javascript?hl=ja
 */
export const RoomsMap = () => {
  const mapRef = useRef(null)
  useGoogleMap(mapRef)

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <Loader c="gray" />
      default:
        return <Box ref={mapRef} pos="relative" w="50vw" mih="100vh" />
    }
  }

  return <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""} render={render} />
}
