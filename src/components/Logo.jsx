import Image from './assets/logo.png';
import styled from 'styled-components';

export default function Logo() {
    return(
        <LogoImage>
            <img src={Image}/> 
        </LogoImage>
    )
}

const LogoImage = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 68px;
    img{
        width: 180px;
        height: 180px;
    }
`;