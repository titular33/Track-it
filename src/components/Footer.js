import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function Footer () {
    const percentage=66;
    return(
        <Bottom>
            <Link to="/habitos">
                <Text>Hábitos</Text>
            </Link>
            <Link to="/hoje">
            <Circle>             
                    <CircularProgressbar value={percentage} text="Hoje" 
                    styles={buildStyles({
                        textColor: "white",
                        pathColor: "white",
                        trailColor: "#52B6FF"})}/>
                </Circle>
            </Link>
            <Link to="/historico">
                <Text>Histórico</Text>
            </Link>
        </Bottom>
    )
}

const Bottom = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0 36px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Text = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    color: #52B6FF;
    font-size: 18px;
`

const Circle = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 50px;
    border-radius: 50%;
    background-color: #52B6FF;
    font-family: 'Lexend Deca', sans-serif;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
`