import React from "react";
import ModalBg from "../ModalBg";

interface props {
  isLoading: boolean
}

export default function Loading({isLoading}: props) {
  if (!isLoading) return <></>
  return (
    <ModalBg>
      <div />
      <span>Loading...</span>
    </ModalBg>
  )
}
