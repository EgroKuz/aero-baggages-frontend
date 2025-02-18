export const ROUTES = {
    HOME: "/",
    BAGGAGES: "/baggages",
    LOGIN: `/login`,
    REGISTER: `/register`,
    PROFILE: `/profile`,
    TRANSFERS: `/transfers`,
    PAGE403: "/403",
    PAGE404: "/404",
    EDIT_BAGGAGES: "/edit"
}
export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    BAGGAGES: "Багажи",
    LOGIN: "Аутентификация",
    REGISTER: "Регистрация",
    PROFILE: "Профиль",
    TRANSFERS: "Отправки",
    PAGE403: "Доступ запрещен",
    PAGE404: "Страница не найдена",
    EDIT_BAGGAGES: "Редактировать багажи"
}