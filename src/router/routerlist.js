import Home from '../views/home'
import Login from '../views/login'
import Addtext from '@/views/home/text/addtext';
import Textcluster from '@/views/home/text/textcluster';
import Looktext from '@/views/home/text/looktext';
import Adduser from '@/views/home/user/adduser';
import Userdisplay from '@/views/home/user/userdisplay';
import Addexam from '@/views/home/exam/addexam';
import Textlist from '@/views/home/exam/textlist';
import Gread from '@/views/home/grade/grade';
import Room from '@/views/home/grade/room';
import Student from '@/views/home/grade/students';
import Weit from '@/views/home/mark/weit';
import Detail from '@/views/home/detail';



// import Home from '@/views/home'
// import Login from '@/views/login'
// import Rank from '@/views/home/rank'
const routes = [{
    component: Login,
    path: '/login'
}, {
    component: Home,
    path: '/home',
    children:[
        {
            path:'/home/addtext',
            component:Addtext
        },{
            path:'/home/textcluster',
            component:Textcluster
        },{
            path:'/home/looktext',
            component:Looktext
        },{
            path:'/home/adduser',
            component:Adduser
        },{
            path:'/home/userdisplay',
            component:Userdisplay
        },{
            path:'/home/addexam',
            component:Addexam
        },{
            path:'/home/textlist',
            component:Textlist
        },{
            path:'/home/grade',
            component:Gread
        },{
            path:'/home/room',
            component:Room
        },{
            path:'/home/student',
            component:Student
        },{
            path:'/home/weit',
            component:Weit
        },{
            path:'/home/detail/:id',
            component:Detail
        }
    ]
}, {
    path: '/',
    redirect: '/login'
}]
export default routes