import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import Header from '../Header'
import Footer from '../Footer';
import axios from 'axios';
import UserContext from '../../contexts/UserContexts';
import { TrashOutline } from 'react-ionicons';
import Loader from "react-loader-spinner";

export default function Habits (){
    const { user }= useContext(UserContext);
    const [day, setDay ]= useState([
        {weekday: "D", isClicked: false, id: 0}, 
        {weekday: "S", isClicked: false, id: 1},
        {weekday: "T", isClicked: false, id: 2}, 
        {weekday: "Q", isClicked: false, id: 3},
        {weekday: "Q", isClicked: false, id: 4},
        {weekday: "S", isClicked: false, id: 5},
        {weekday: "S", isClicked: false, id: 6}
    ])
    const [habitName,setHabitName] = useState ("");
    const [addHabits, setAddHabits] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(items);

	useEffect(() => {
        const config = {
	        headers: {
		        "Authorization": `Bearer ${user.token}`
	        }
        }
		const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

		request.then(resposta => {
			setItems(resposta.data);
		});

        request.catch(error => alert("Erro! Tente novamente :/"))
	}, []);

    console.log(day);


    return(
        <>        
        <Header/>
        <HabitsDiv>
            <MyHabits>
                Meus hábitos
            </MyHabits>
            <AddHabits onClick={() => setAddHabits(true)}>
                +
            </AddHabits>
        </HabitsDiv>
        <NewHabit display = {addHabits}>
            <HabitName disabled = {loading} type="text" placeholder="nome do hábito" value = {habitName} 
            onChange={e => setHabitName(e.target.value)}></HabitName>
            <Weekday>
            
            {day.map((d,i) => <Day disabled = {loading} state = {d.isClicked} 
            onClick={() => clickDay(d)} key = {i}>{d.weekday}</Day>)}
            </Weekday>
            <Buttons>
            <Cancel disabled = {loading} onClick={() => setAddHabits(false)}>Cancelar</Cancel>
                    <Save disabled = {loading} onClick={() => {
                        setLoading(true);
                        const config = {
                            headers: {
                                "Authorization": `Bearer ${user.token}`
                            }
                        }
                        const body = {
                            name: habitName,
                            days: day.filter((d,i) => d.isClicked === true).map((d,i) => d.id)
                        }
                        const request = axios.post("https", body, config);

                        request.then(resposta => {
                            setHabitName("");
                            setItems([...items, resposta.data]);
                            setLoading(false);
                            setAddHabits(false);
                            setDay ([
                                {weekday: "D", isClicked: false, id: 0}, 
                                {weekday: "S", isClicked: false, id: 1},
                                {weekday: "T", isClicked: false, id: 2}, 
                                {weekday: "Q", isClicked: false, id: 3},
                                {weekday: "Q", isClicked: false, id: 4},
                                {weekday: "S", isClicked: false, id: 5},
                                {weekday: "S", isClicked: false, id: 6}
                            ]);

                    })

                    request.catch(error => {
                        alert("Erro! Tente novamente :/");
                        setLoading (false);
                    })
                    }}>{loading === true? "": "Salvar"}
                        <Loader visible ={loading} type="ThreeDots" color="#FFF" height={10} width={40} />
                    </Save>
                </Buttons>
        </NewHabit>
        <Text>{items.length === 0? "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!": ""}</Text>

                {items.map((h,i)=>
                    <OldHabits display = {items.length === 0? false: true}>
                        <span>
                            <p>{h.name}</p>
                            <TrashOutline onClick={() => {
                            let resultado = window.confirm("Você gostaria de apagar esse hábito?");
                            if(resultado){
                                axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${h.id}`, {
                                    headers: {
                                        "Authorization": `Bearer ${user.token}`
                                    },
                                  });

                                    const config = {
                                        headers: {
                                            "Authorization": `Bearer ${user.token}`
                                        }
                                    }
                                    const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

                                    request.then(resposta => {
                                        setItems(resposta.data);
                                    });

                                    request.catch(error => alert("Erro! Tente novamente :/"))
                                ;
                                }
                            else{
                                alert("cancelar")
                            }
                            }
                            }
                            />
                        </span>
                        <Weekday>
                            {day.map((d,i) => d.weekday.id === h.days[0]? <Day state= {true} key = {i}>{d.weekday}</Day>:  <Day state = {false} key = {i}>{d.weekday}</Day>)}
                        </Weekday>
                    </OldHabits>
                )}
                <Div/>
            <Footer />
        </>
    )

    function clickDay (d){
        d.isClicked = !(d.isClicked);
        setDay([...day]);
    }
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