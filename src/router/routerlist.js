import Home from '../views/home/index.tsx';
import Login from "../views/login/login.tsx";

import Rank from '../views/home/rank.tsx';

const routes = [
    {
    component: Login,
    path: '/login'
}, {
    children: [
        {
        component: Rank,
        path: '/home/rank',
     }
    ],
    component: Home,
    path: '/home'
}
]
export default routes