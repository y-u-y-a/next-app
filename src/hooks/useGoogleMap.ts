import { type MutableRefObject, useEffect, useState } from "react"

export type Position = {
  lat: number
  lng: number
}

export const useGoogleMap = (ref: MutableRefObject<null>) => {
  //
  const [map, setMap] = useState<google.maps.Map>()
  const [current, setCurrent] = useState<Position>()
  const [currentMarker, setCurrentMarker] = useState<google.maps.Marker>()
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  // const [mapRealRadius, setMapRealRadius] = useState(0) // 検索エリアの現実半径

  /** 現在地を取得する */
  useEffect(() => {
    if (current) return
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      setCurrent({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [current])

  /** 初期マップを表示する */
  useEffect(() => {
    if (map || !ref.current || !current) return
    const mapOptions = {
      center: current,
      zoom: 16,
      styles: googleMapStyle,
      disableDefaultUI: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      panControl: true,
      scaleControl: false,
      keyboardShortcuts: false,
    }
    const newMap = new window.google.maps.Map(ref.current, mapOptions)
    setMap(newMap)
    console.log("Create Map!")
  }, [map, ref.current, current])

  /** 現在地ピンを表示する */
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!map) return
    createCurrentMarker()
  }, [map, current])

  /** 現在地へ移動する */
  const moveToCurrent = (): void => {
    if (!map || !current) return
    map.setCenter(current)
  }

  /** 現在地ピンを作成する */
  const createCurrentMarker = (): void => {
    currentMarker?.setMap(null)
    const newMarker = new google.maps.Marker({
      map,
      title: "現在地",
      position: current,
      icon: { scaledSize: new google.maps.Size(28, 28), url: "/icons/map-current.png" },
    })
    setCurrentMarker(newMarker)
  }

  /** 座標からピンを作成する */
  const createMarkers = (positions: Position[]): void => {
    markers.map((marker) => marker.setMap(null))
    const newMarkers = positions.map((position) => {
      return new google.maps.Marker({ map, position, animation: google.maps.Animation.DROP })
    })
    setMarkers(newMarkers)
  }

  /** マップの表示エリア内の座標であるか判定を返す */
  // const isWithinArea = (position: Position): boolean => {
  //   const center = map?.getCenter()
  //   if (!center) return false
  //   const result = calculateDistance({ lat: center.lat(), lng: center.lng() }, position) <= mapRealRadius
  //   return result
  // }

  /** マップをドラッグ終了した際の処理 */
  // map?.addListener("dragend", () => {
  //   const center = map.getCenter()
  //   const bounds = map.getBounds()
  //   if (!center || !bounds) return

  //   // 移動後のマップの中心地
  //   const newMapCenter = {
  //     lat: center.lat(),
  //     lng: center.lng(),
  //   }
  //   // 移動後のマップの北東端と南西端
  //   const newMapBounds = {
  //     northEast: {
  //       lat: bounds.getNorthEast().lat(),
  //       lng: bounds.getNorthEast().lng(),
  //     },
  //     southWest: {
  //       lat: bounds.getSouthWest().lat(),
  //       lng: bounds.getSouthWest().lng(),
  //     },
  //   }
  //   // 中心距離を取得する
  //   if (newMapCenter && newMapBounds) {
  //     const northEastDistance = calculateDistance(newMapCenter, newMapBounds.northEast)
  //     const southWestDistance = calculateDistance(newMapCenter, newMapBounds.southWest)
  //     const distanceFromCenterToEdge = (northEastDistance + southWestDistance) / 2
  //     setMapRealRadius(distanceFromCenterToEdge)
  //   }
  // })

  return {
    map,
    // markers,
    createMarkers,
    moveToCurrent,
    // isWithinArea,
  }
}

/**
 * Using generator
 * @see https://snazzymaps.com/explore?text=&sort=popular&tag=complex&color=green
 * */
const googleMapStyle = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7c93a3",
      },
      {
        lightness: "-10",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#a0a4a5",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#62838e",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#dde3e3",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#3f4a51",
      },
      {
        weight: "0.30",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.government",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.school",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: "-100",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#bbcacf",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        lightness: "0",
      },
      {
        color: "#bbcacf",
      },
      {
        weight: "0.50",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#a9b4b8",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        invert_lightness: true,
      },
      {
        saturation: "-7",
      },
      {
        lightness: "3",
      },
      {
        gamma: "1.80",
      },
      {
        weight: "0.01",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a3c7df",
      },
    ],
  },
]
