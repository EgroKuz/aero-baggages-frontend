export const ROUTES = {
    HOME: "/",
    BAGGAGES: "/baggages"
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    BAGGAGES: "Багажи",
}