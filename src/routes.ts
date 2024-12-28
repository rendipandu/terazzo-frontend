import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage/UserPage";

export type RouteList = {
    id: string;
    path: string;
    component?: keyof typeof componentMaps;
};

export const componentMaps = {
    LoginPage: LoginPage,
    HomePage: HomePage,
    UserPage: UserPage,
};

export const routeLists: RouteList[] = [
    {
        id: 'login-page',
        path: '/',
        component: 'LoginPage',
    },
    {
        id: 'dashboard',
        path: '/dashboard',
        component: 'HomePage',
    },
    {
        id: 'user',
        path: '/user',
        component: 'UserPage',
    },
];