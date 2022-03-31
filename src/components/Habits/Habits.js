import styled from 'styled-components';
import { useState } from 'react';
export default function Habits (){
    const day = ["D", "S", "T", "Q", "Q", "S", "S"]
    const [habitName,setHabitName] = useState ("");
    const [addHabits, setAddHabits] = useState(false);

    return(
        <>        
        <HabitsDiv>
            <MyHabits>
                Meus hábitos
            </MyHabits>
            <AddHabits onClick={() => setAddHabits(true)}>
                +
            </AddHabits>
        </HabitsDiv>
        <NewHabit display = {addHabits}>
            <HabitName type="text" placeholder="nome do hábito" onChange={e => setHabitName(e.target.value)}></HabitName>
            <Weekday>
                {day.map((d,i) => <Day key = {i}>{d}</Day>)}
            </Weekday>
            <Buttons>
                <Cancel onClick={() => setAddHabits(false)}>Cancelar</Cancel>
                <Save>Salvar</Save>
            </Buttons>
        </NewHabit>
        <Text>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Text>
        </>
    )
}

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

const AddHabits = styled.div`
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 27px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.p`
    margin: 20px auto;
    width: 90%;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    color: #666;
`;

const NewHabit = styled.div`
    margin: 20px auto;
    width: 90%;
    background-color: #FFFFFF;
    height: 180px;
    border-radius: 5px;
    display: ${props => props.display === true? "flex": "none"};
    flex-direction: column;
    align-items: center;
`

const HabitName = styled.input`
    width: 90%;
    height: 45px;
    margin-top: 18px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #AFAFAF;
    ::-webkit-input-placeholder  { 
        color: #DBDBDB; 
        padding: 11px;
    }
`
const Weekday = styled.div`
    display: flex;
    width: 90%;
    margin-top: 8px;
`

const Day = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #DBDBDB;
`

const Buttons = styled.div`
    width: 90%;
    margin-top: 36px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Cancel = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 16px;
    color: #52B6FF;
`

const Save = styled.div`
    padding: 8px 18px;
    margin-left: 23px;
    background-color: #52B6FF;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 16px;
    color: #fff;
`