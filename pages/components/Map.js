import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";



import { useEffect, useState } from "react";

mapboxgl.accessToken =process.env.NEXT_PUBLIC_MAPBOX_API_KEY
 


function Map(props) {

  const {pickUpCoordinates,dropOffCoordinates}=props



  async function getRoute(){
    return await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoordinates[0]},${pickUpCoordinates[1]};${dropOffCoordinates[0]},${dropOffCoordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
   
  ).then(res=>res.json()).then(data=>data.routes[0])
 
  }


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [77.216721, 28.6448],
      zoom: 3,
    });

    if (pickUpCoordinates) {
      addToMap(map, pickUpCoordinates);
    }

    if (dropOffCoordinates) {
      addToMap(map, dropOffCoordinates);
    }
    if(pickUpCoordinates && dropOffCoordinates){
      map.fitBounds([
        props.dropOffCoordinates,
        props.pickUpCoordinates
      ],{
        padding: 60
      })
    

    getRoute().then(data=>{
      const route=data?.geometry?.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      }
      if(map.getSource('route')){
        map.getSource('route').setData(geojson)
      }
      else{
        map?.addLayer({
          id:'route',
          type:'line',
          source:{
            type:'geojson',
            data:geojson

          },
          layout:{
            'line-join':'round',
            'line-cap':'round'
          },
          paint:{
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        })
      }

    })
  }
 
   
  }, [pickUpCoordinates,dropOffCoordinates]);
  const addToMap = (map, coordinates) => {
    console.log(coordinates)
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };
  return <Wrapper id="map">
  
  
  </Wrapper>;
}

export default Map;
const Wrapper = tw.div`
flex-1 h-1/2
`;
