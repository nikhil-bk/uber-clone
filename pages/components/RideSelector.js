import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =process.env.NEXT_PUBLIC_MAPBOX_API_KEY

const carList = [
  {
    imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
    service: 'UberX',
    multiplier: 1,
  },
  {
    imgUrl: 'https://i.ibb.co/YDYMKny/uberxl.png',
    service: 'UberXL',
    multiplier: 1.5,
  },
  {
    imgUrl: 'https://i.ibb.co/Xx4G91m/uberblack.png',
    service: 'Black',
    multiplier: 2,
  },
  {
    imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
    service: 'Comfort',
    multiplier: 1.2,
  },
  {
    imgUrl: ' https://i.ibb.co/1nStPWT/uberblacksuv.png',
    service: 'Black SUV',
    multiplier: 2.8,
  }
]

function RideSelector(props) {
  const [rideDuration,setRideDuration]=useState(0)
  const {pickUpCoordinates,dropOffCoordinates}=props

  useEffect(()=>{
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoordinates[0]},${pickUpCoordinates[1]};${dropOffCoordinates[0]},${dropOffCoordinates[1]}?access_token=${mapboxgl.accessToken}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setRideDuration((data?.routes[0]?.duration/10).toFixed(2))
    })
  },[pickUpCoordinates,dropOffCoordinates])
  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      <CarList>
      {carList.map((car,index)=>(
        <Car key={index}>
        <CarImage src={car.imgUrl} />
        <CarDetails>
          <ServiceSection>{car.service}</ServiceSection>
          <TimeSection>5 min away</TimeSection>
        </CarDetails>
        <Price>&#x20B9;{(rideDuration*car.multiplier).toFixed(2)}</Price>
      </Car>
      ))}
       
        
      </CarList>
    </Wrapper>
  );
}

export default RideSelector;


const Title = tw.div`
flex-1 text-gray-500 text-xs py-2 border-b text-center 
`
const CarList = tw.div`
overflow-y-scroll
`
const Car = tw.div`
flex p-4 items-center
`
const CarImage = tw.img`
h-14 mr-4
`
const CarDetails = tw.div`
flex-1 
`
const ServiceSection = tw.div`
font-medium
`
const TimeSection = tw.div`
text-xs text-blue-500
`
const Price = tw.div`
text-sm
`
const Wrapper = tw.div`
flex-1 overflow-y-scroll flex flex-col
`
