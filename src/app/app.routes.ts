import { Routes } from '@angular/router';
import { Login } from './UI/login/login';
import { Home } from './UI/home/home';
export const routes: Routes = [
    {
        path: '',
        redirectTo: "login",
        pathMatch: "full",
    },
    {
        path: "login",
        component: Login,
        title: 'Login page'
    },
    {
        path: "home",
        component: Home,
        title: 'Home page'
    },
];
