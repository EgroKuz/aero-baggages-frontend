import { FC, useEffect } from "react";
import "./HomePage.css"; 

export const HomePage: FC = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="home">
      <video className="background-video" autoPlay loop muted>
        <source src="/videos/baggages.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <div className="overlay" />
      <div className="content">
        <h1>Регистрация авиабагажа</h1>
        <p>
          Сервис помогает пользователям добавлять и отслеживать перелеты своих багажей, а
          диспетчерам — контролировать процессы этих перелетов.
        </p>
      </div>
    </div>
  );
};