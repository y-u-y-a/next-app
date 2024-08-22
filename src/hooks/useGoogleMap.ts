import { type MutableRefObject, useEffect, useState } from "react"

type GeoPosition = google.maps.LatLngLiteral
type GeoMarker = google.maps.Marker

export const useGoogleMap = (ref: MutableRefObject<null>) => {
  //
  const [map, setMap] = useState<google.maps.Map>()
  const [current, setCurrent] = useState<GeoPosition>()
  const [currentMarker, setCurrentMarker] = useState<GeoMarker>()
  const [markers, setMarkers] = useState<GeoMarker[]>([])
  // const [mapRealRadius, setMapRealRadius] = useState(0) // 検索エリアの現実半径

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
  const createMarkers = (positions: GeoPosition[]): void => {
    markers.map((marker) => marker.setMap(null))
    const newMarkers = positions.map((position) => {
      return new google.maps.Marker({ map, position, animation: google.maps.Animation.DROP })
    })
    setMarkers(newMarkers)
  }

  /** マップの表示エリア内の座標であるか判定を返す */
  // const isWithinArea = (position: GeoPosition): boolean => {
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

  // const initMap = async (center: GeoPosition): Promise<google.maps.Map> => {
  //   const { Map: GoogleMap } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary

  //   const mapOptions = {
  //     center,
  //     zoom: 16,
  //     styles: googleMapStyle,
  //     disableDefaultUI: true,
  //     mapTypeControl: false,
  //     streetViewControl: false,
  //     fullscreenControl: false,
  //     zoomControl: false,
  //     panControl: true,
  //     scaleControl: false,
  //     keyboardShortcuts: false,
  //   }

  //   const newMap = new GoogleMap(document.getElementById("map") as HTMLElement, mapOptions)
  //   return newMap
  // }

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
    elementType: "labels.text",
    stylers: [
      {
        color: "#878787",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f9f5ed",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#aee0f4",
      },
    ],
  },
]
