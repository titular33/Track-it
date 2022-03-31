import styled from "styled-components";
import UserContext from "../contexts/UserContexts";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);
  const { image, name } = user;

  return (
    <Top>
      <h1>TrackIt</h1>
      <img src={image} alt={name} />
    </Top>
  );
}

const Top = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  background-color: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  z-index: 2;
  h1 {
    font-family: "Playball", cursive;
    font-size: 40px;
    color: #fff;
  }
  img {
    border-radius: 50%50%;
    height: 51px;
    width: 51px;
  }
`;