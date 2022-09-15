import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import Map from "./components/Map";
import Link from "next/link"
import { onAuthStateChanged, signOut } from "firebase/auth";
import {  useRouter } from "next/router";
import { auth } from "../firebase";

export default function Home() {
  const [user,setUser]=useState(null)
const router=useRouter()
  useEffect(()=>{
    return onAuthStateChanged(auth,user=>{
      if(user){
        console.log(user)
        setUser({
          name:user.displayName,
          photoUrl:user.photoURL,

        })
      }else{
        setUser(null)
        router.push('/login')
      }
    })
  },[])
  return (
    <Wrapper>
       <Head>
        <title>Uber - Home</title>
      </Head>
      <Map />
      <ActionItems>
        <Header>
          <UberLogo src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg" />

          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage src={user && user.photoUrl} onClick={()=>signOut(auth)} />
          </Profile>
        </Header>
        <ActionButtons>
          <Link href="/search">
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png"/>
            Ride</ActionButton></Link>
            <Link href="/search"><ActionButton><ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png"/>Wheels</ActionButton></Link>
            <Link href="/search"><ActionButton><ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png"/>Reserves</ActionButton></Link>
        </ActionButtons>
        <InputButton>
        Where to?
        </InputButton>
        

      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex flex-col h-screen
`;
const Header = tw.div`
flex justify-between items-center
`;

const UberLogo = tw.img`
h-28
`;

const ActionItems = tw.div`
flex-1 p-4
`;

const Profile = tw.div`
flex items-center 
`;

const Name = tw.div`
mr-4 w-20 text-lg

`;

const UserImage = tw.img`
h-16 w-16 rounded-full border border-gray-200 p-px cursor-pointer

`;
const ActionButtons=tw.div`
flex
`

const ActionButton=tw.div`
flex flex-col bg-gray-200 flex-1 m-1 h-32 items-center justify-center rounded-lg transform hover:scale-105 transition text-xl
`

const ActionButtonImage=tw.img`
h-3/5

`
const InputButton=tw.div`
h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`