import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {ThreeDots} from "react-loader-spinner";
import Logo from "../Logo";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const body = {
    email,
    name,
    image,
    password,
  };

  let navigate = useNavigate();

  return (
    <>
      <Logo />

      <Data>
        <input
          disabled={loading}
          type="email"
          required
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          disabled={loading}
          type="password"
          required
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          disabled={loading}
          type="text"
          required
          placeholder="nome"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          disabled={loading}
          type="url"
          required
          placeholder="foto"
          onChange={(e) => setImage(e.target.value)}
        />
        <div disabled={loading} onClick={() => signUp(body, setLoading)}>
          {loading === true ? "" : "Cadastrar"}
          <ThreeDots
            visible={loading}
            color="#FFF"
            height={80}
            width={80}
          />
        </div>
      </Data>

      <Link to="/">
        <Login>Já tem uma conta? Faça login!</Login>
      </Link>
    </>
  );
  function signUp(body, setLoading) {
    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      body
    );
    setLoading(true);

    request.then((response) => navigate("/"));

    request.catch((error) => {
      alert("Erro! Preencha novamente os campos.");
      setLoading(false);
    });
  }
}

const Data = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 36px;
  input {
    height: 45px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #afafaf;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin-bottom: 6px;
    ::-webkit-input-placeholder {
      color: #dbdbdb;
      padding: 11px;
    }
  }
  div {
    cursor: pointer;
    height: 45px;
    font-size: 21px;
    font-family: "Lexend Deca", sans-serif;
    color: #fff;
    background-color: #52b6ff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Login = styled.p`
  cursor: pointer;
  font-family: "Lexend Deca", sans-serif;
  font-size: 14px;
  color: #52b6ff;
  text-decoration-line: underline;
  text-align: center;
  margin-bottom: 30px;
`;