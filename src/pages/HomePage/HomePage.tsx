import { Component } from "react";
import "./HomePage.css";

export class HomePage extends Component {
  componentDidMount() {
    // Устанавливаем overflow: hidden при монтировании
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    // Возвращаем overflow: auto при размонтировании
    document.body.style.overflow = "auto";
  }

  render() {
    return (
      <div className="home">
        <video className="background-video" autoPlay loop muted>
          <source src="./videos/baggages.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="overlay" />
        <div className="content">
          <h1>Регистрация авиабагажа</h1>
          <p>
            Сервис помогает пользователям добавлять и отслеживать перелеты своих багажей, а
            агентам по багажам — контролировать процессы этих перелетов.
          </p>
        </div>
      </div>
    );
  }
}
