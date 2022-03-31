import Header from '../Header';
import styled from 'styled-components';

export default function Historic () {
    return(
        <>
        <Header />
        <HabitsDiv>
            <MyHabits>
                Histórico
            </MyHabits>
        </HabitsDiv>
        <Text>Em breve  poderemos ver o histórico dos seus hábitos aqui!</Text>

        </>
    )
}

const Text = styled.p`
    margin: 20px auto;
    width: 90%;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    color: #666;
`;

const HabitsDiv = styled.div`
    margin-top: 100px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MyHabits = styled.h2`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 23px;
    color: #126BA5;
`;