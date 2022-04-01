import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import UserContext from "../../contexts/UserContexts";
import { TrashOutline } from "react-ionicons";
import Loader from "react-loader-spinner";

export default function Habits() {
  const { user, setUser } = useContext(UserContext);
  const [day, setDay] = useState([
    { weekday: "D", isClicked: false, id: 0 },
    { weekday: "S", isClicked: false, id: 1 },
    { weekday: "T", isClicked: false, id: 2 },
    { weekday: "Q", isClicked: false, id: 3 },
    { weekday: "Q", isClicked: false, id: 4 },
    { weekday: "S", isClicked: false, id: 5 },
    { weekday: "S", isClicked: false, id: 6 },
  ]);
  const [habitName, setHabitName] = useState("");
  const [addHabits, setAddHabits] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const body = {
    name: habitName,
    days: day.filter((d, i) => d.isClicked === true).map((d, i) => d.id),
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
      config
    );

    request.then((resposta) => {
      setItems(resposta.data);
    });

    request.catch((error) => alert("Erro! Tente novamente :/"));
  }, []);

  return (
    <>
      <Header />

      <Habit>
        <h2>Meus hábitos</h2>
        <div onClick={() => setAddHabits(true)}>+</div>
      </Habit>

      <NewHabit display={addHabits}>
        <input
          disabled={loading}
          type="text"
          required
          placeholder="nome do hábito"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <Weekday>
          {day.map((d, i) => (
            <Day
              disabled={loading}
              state={d.isClicked}
              onClick={() => clickDay(d)}
              key={i}
            >
              {d.weekday}
            </Day>
          ))}
        </Weekday>
        <Buttons>
          <p disabled={loading} onClick={() => setAddHabits(false)}>
            Cancelar
          </p>
          <div
            disabled={loading}
            onClick={() => {
              !day.find((d, i) => d.isClicked)
                ? alert("Selecione pelo menos um dia da semana")
                : sendHabit(
                    day,
                    setLoading,
                    setHabitName,
                    setItems,
                    setAddHabits,
                    setDay,
                    config,
                    body,
                    items
                  );
            }}
          >
            {loading === true ? "" : "Salvar"}
            <Loader
              visible={loading}
              type="ThreeDots"
              color="#FFF"
              height={10}
              width={40}
            />
          </div>
        </Buttons>
      </NewHabit>

      <Text>
        {items.length === 0
          ? "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"
          : ""}
      </Text>

      {items.map((h, i) => (
        <OldHabits display={items.length === 0 ? false : true}>
          <span>
            <p>{h.name}</p>
            <TrashOutline
              onClick={() => deleteHabit(h.id, user.token, config, setItems)}
            />
          </span>
          <Weekday>
            {day
              .map((d, i) =>
                sameDay(h.days, d.id) ? { ...d, isChoose: true } : d
              )
              .map((c, i) => (
                <Day state={c.isChoose} key={i}>
                  {c.weekday}
                </Day>
              ))}
          </Weekday>
        </OldHabits>
      ))}

      <Div />
      <Footer />
    </>
  );

  function clickDay(d) {
    d.isClicked = !d.isClicked;
    setDay([...day]);
  }

  function sameDay(h, d) {
    for (let i = 0; i < h.length; i++) {
      if (h[i] === d) {
        return true;
      }
    }
    return false;
  }

  function sendHabit(
    day,
    setLoading,
    setHabitName,
    setItems,
    setAddHabits,
    setDay,
    config,
    body,
    items
  ) {
    if (!day.find((d, i) => d.isClicked)) {
      alert("Selecione pelo menos um dia da semana");
      return;
    } else {
      setLoading(true);

      const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
        body,
        config
      );

      request.then((resposta) => {
        setHabitName("");
        setItems([...items, resposta.data]);
        setLoading(false);
        setAddHabits(false);
        setDay([
          { weekday: "D", isClicked: false, id: 0 },
          { weekday: "S", isClicked: false, id: 1 },
          { weekday: "T", isClicked: false, id: 2 },
          { weekday: "Q", isClicked: false, id: 3 },
          { weekday: "Q", isClicked: false, id: 4 },
          { weekday: "S", isClicked: false, id: 5 },
          { weekday: "S", isClicked: false, id: 6 },
        ]);
      });

      request.catch((error) => {
        alert("Erro! Tente novamente :/");
        setLoading(false);
      });
    }
  }

  function deleteHabit(id, token, config, setItems) {
    let resultado = window.confirm("Você gostaria de apagar esse hábito?");
    if (resultado) {
      const deleteAPI = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      deleteAPI.then(() => deleteSuccess(setItems));

      deleteAPI.catch(() => alert("Erro! Tente novamente :/"));
    }
  }

  function deleteSuccess(setItems) {
    const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
      config
    );

    request.then((response) => {
      setItems(response.data);
    });

    request.catch(() => alert("Erro! Tente novamente :/"));
  }
}

const Habit = styled.div`
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
  div {
    width: 40px;
    height: 35px;
    background-color: #52b6ff;
    border-radius: 5px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 27px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Text = styled.p`
  margin: 20px auto;
  width: 90%;
  font-family: "Lexend Deca", sans-serif;
  font-size: 18px;
  color: #666;
`;

const NewHabit = styled.div`
  margin: 20px auto;
  width: 90%;
  background-color: #ffffff;
  height: 180px;
  border-radius: 5px;
  display: ${(props) => (props.display === true ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  input {
    width: 90%;
    height: 45px;
    margin-top: 18px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    color: #afafaf;
    ::-webkit-input-placeholder {
      color: #dbdbdb;
      padding: 11px;
    }
  }
`;

const Weekday = styled.div`
  display: flex;
  width: 90%;
  margin-top: 8px;
`;

const Day = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 20px;
  color: ${(props) => (props.state ? "#fff" : "#DBDBDB")};
  background-color: ${(props) => (props.state ? "#DBDBDB" : "#fff")};
`;

const Buttons = styled.div`
  width: 90%;
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  p {
    font-family: "Lexend Deca", sans-serif;
    font-size: 16px;
    color: #52b6ff;
  }
  div {
    height: 35px;
    width: 85px;
    padding: 8px 18px;
    margin-left: 23px;
    background-color: #52b6ff;
    border-radius: 5px;
    font-family: "Lexend Deca", sans-serif;
    font-size: 16px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const OldHabits = styled.div`
  width: 90%;
  height: 91px;
  margin: auto;
  padding: 13px 15px;
  border-radius: 5px;
  background-color: #fff;
  display: ${(props) => (props.display ? "blocked" : "none")};
  margin-bottom: 10px;
  p {
    color: #666666;
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
`;

const Div = styled.div`
  height: 110px;
`;