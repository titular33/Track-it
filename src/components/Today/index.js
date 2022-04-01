import Header from "../Header";
import styled from "styled-components";
import Footer from "../Footer";
import dayjs from "dayjs";
import { CheckmarkOutline } from "react-ionicons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContexts";
import ProgressContext from "../../contexts/ProgressContexts";

export default function Today() {
  const now = dayjs().format("DD/MM/YYYY");
  const weekday = dayjs().day();
  const weekdayName = [
    { name: "Domingo", id: 0 },
    { name: "Segunda", id: 1 },
    { name: "Terça", id: 2 },
    { name: "Quarta", id: 3 },
    { name: "Quinta", id: 4 },
    { name: "Sexta", id: 5 },
    { name: "Sábado", id: 6 },
  ];
  const found = weekdayName.find((e) => e.id === weekday);
  const [items, setItems] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { progress, setProgress } = useContext(ProgressContext);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    const request = axios.get(
        'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',
      config
    );

    request.then((resposta) => {
      setItems(resposta.data);
    });

    request.catch((error) => alert("Erro! Tente novamente :/"));
  }, []);

  //Barra de progresso
  let done = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].done === true) {
      done += 1;
    }
  }

  setProgress(Math.round((done * 100) / items.length));
  //Fim da barra de progresso

  return (
    <>
      <Header />

      <Date>
        <h2>
          {found.name}, {now}
        </h2>
      </Date>
      <Text value={!items.find((i) => i.done === true)}>
        {!items.find((i) => i.done === true)
          ? "Nenhum hábito concluído ainda"
          : `${progress}% dos hábitos concluídos`}
      </Text>
      <TasksContainer>
        {items.map((t, i) => (
          <Habits>
            <Task>
              <h1>{t.name}</h1>
              <p>
                Sequência atual:
                <Days state={t.done}>{t.currentSequence} dias</Days>
              </p>
              <p>
                Seu recorde:
                <Days state={t.currentSequence === t.highestSequence}>
                  {t.highestSequence} dias
                </Days>
              </p>
            </Task>
            <Checkmark
              state={t.done}
              onClick={() => addOrRemoveHabits(t.done, t.id, t)}
            >
              <CheckmarkOutline color={"#fff"} height="60px" width="60px" />
            </Checkmark>
          </Habits>
        ))}
      </TasksContainer>
      <Footer />
    </>
  );

  function addOrRemoveHabits(done, id, item) {
    if (done === false) {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
        {},
        config
      );

      request.then(() =>
        setItems([
          ...items.filter((i) => i.id !== id),
          { ...item, done: true, currentSequence: item.currentSequence + 1 },
        ])
      );

      request.catch((error) => alert(error));
    } else {
      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
        {},
        config
      );

      request.then(() =>
        setItems([
          { ...item, done: false, currentSequence: item.currentSequence - 1 },
          ...items.filter((i) => i.id !== id),
        ])
      );

      request.catch((error) => alert(error));
    }
  }
}

const Date = styled.div`
  margin: auto;
  margin-top: 100px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 23px;
    color: #126ba5;
  }
`;

const Text = styled.p`
  margin: 20px auto;
  width: 90%;
  font-family: "Lexend Deca", sans-serif;
  font-size: 18px;
  color: ${(props) => (props.value ? "#666" : "#8FC549")};
`;

const Habits = styled.div`
  width: 90%;
  margin: auto;
  padding: 13px 13px 17px 15px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Checkmark = styled.div`
  width: 69px;
  height: 69px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.state ? "#8FC549" : "#EBEBEB")};
  border: 1px solid #e7e7e7;
  border-radius: 5px;
`;

const Task = styled.div`
  font-family: "Lexend Deca", sans-serif;
  h1 {
    color: #666;
    margin-bottom: 7px;
    font-size: 20px;
  }
  span,
  p {
    font-size: 13px;
    margin-bottom: 5px;
  }
  p {
    color: #666;
  }
`;

const TasksContainer = styled.div`
  margin-bottom: 80px;
`;

const Days = styled.span`
  color: ${(props) => (props.state ? "#8FC549" : "#666")};
`;