import Admin from "./pages/Admin";
import Moderation from "./pages/Moderation";
import { ADMIN_ROUTE, EVENT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ALLEVENTS_ROUTE, CREATE_EVENT_ROUTE, REGISTRATION_EVENTS_ROUTE } from "./utils/consts";
import AllEvents from "./pages/AllEvents";
import Auth from "./pages/Auth";
import EventPage from "./pages/EventPage";
import RegistrationEvents from "./pages/RegistrationEvents"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CREATE_EVENT_ROUTE,
        Component: Moderation
    },
    {
        path: REGISTRATION_EVENTS_ROUTE,
        Component: RegistrationEvents
    }
]

export const publicRoutes = [
    {
        path: ALLEVENTS_ROUTE,
        Component: AllEvents
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: EVENT_ROUTE + '/:id',
        Component: EventPage
    },
]
