import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ProgressContext from '../contexts/ProgressContexts';
import { useContext } from 'react';

export default function Footer () {
    const progress = useContext(ProgressContext);
    return(
        <Bottom>
            <Link to="/habitos">
                <p>Hábitos</p>
            </Link>
            <Link to="/hoje">
            <div>             
                    <CircularProgressbar 
                        value={progress} 
                        text="Hoje" 
                        styles={buildStyles({
                            textColor: "white",
                            pathColor: "white",
                            trailColor: "#52B6FF"
                        })}/>
                </div>
            </Link>
            <Link to="/historico">
                <p>Histórico</p>
            </Link>
        </Bottom>
    )
}

const Bottom = styled.footer`
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

p {
    font-family: 'Lexend Deca', sans-serif;
    color: #52B6FF;
    font-size: 18px;
}
div{
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
}
`;