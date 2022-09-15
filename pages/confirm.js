import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import RideSelector from "./components/RideSelector";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;
  const [pickUpCoordinates, SetPickUpCoordinates] = useState([0,0]);
  const [dropOffCoordinates, SetDropOffCoordinates] = useState([0,0]);
  const getPickUpCoordinates = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
           
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("PickUp");
        console.log(data.features[0].center);
        SetPickUpCoordinates(data.features[0].center);
      });
  };
  const getDropOfCoordinates = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Drop-Off");
        console.log(data.features[0].center);
        SetDropOffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    getPickUpCoordinates();
    getDropOfCoordinates();
  }, [pickup, dropoff]);
  return (
    <Wrapper>
    <Head>
    <title>Uber - Confirm</title>
  </Head>
  <ButtonContainer>
  <Link href="/search">
  <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
  </Link>
  </ButtonContainer>
      <Map
        pickUpCoordinates={pickUpCoordinates}
        dropOffCoordinates={dropOffCoordinates}
      />
      <RideContainer>
        <RideSelector
        
        pickUpCoordinates={pickUpCoordinates}
        dropOffCoordinates={dropOffCoordinates}
        
        />
        <ConfirmContainer>
          <ConfirmButton>Confirm UberX</ConfirmButton>
        </ConfirmContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
flex flex-col h-screen
`;
const RideContainer = tw.div`
 flex flex-1 flex-col h-1/2
`;

const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer

`
const BackButton = tw.img`
`
const ConfirmContainer = tw.div`
border-t-2
`;
const ConfirmButton = tw.div`
bg-black text-white my-4 mx-4 py-4 text-center text-xl
`;
