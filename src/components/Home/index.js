import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


export default function Home (){
    const [email,setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    return (
        <>
        <Title>TrackIt</Title>
        <Data>
            <Input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}></Input>
            <Input type="password" placeholder="senha" onChange={e => setPassword(e.target.value)}></Input>
            <Button>Entrar</Button>
        </Data>
        <Link to="/cadastro">
            <Register>Não tem uma conta? Cadastre-se!</Register>
        </Link>
        </>
    )
}

const Title = styled.h1`
    font-family: 'Playball', cursive;
    font-size: 68.98px;
    text-align: center;
    color: #126BA5;
    margin-bottom: 10px;
    margin-top: 68px;
`;

const Input = styled.input`
    height: 45px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #AFAFAF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-bottom: 6px;
    ::-webkit-input-placeholder  { 
        color: #DBDBDB; 
        padding: 11px;
    }
`;


const Data = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px 36px;
`;

const Button = styled.div`
    cursor: pointer;
    height: 45px;
    font-size: 21px;
    font-family: 'Lexend Deca', sans-serif;
    color: #fff;
    background-color: #52B6FF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Register = styled.p`
    cursor: pointer;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    color: #52B6FF;
    text-decoration-line: underline;
    text-align: center;
`