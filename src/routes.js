import Restorans from './Components/Common/Restorans';
import PaymentInfo from './Components/Common/PaymentInfo';
import Payment from './Components/Common/Payment';
import systemMenu from './Components/Navigation/systemMenu';
import MyProfile from './Components/ProfileInfo/MyPorfile';
import Home from './Components/Home';
import Login from './Components/Authorization/Login';
import Register from './Components/Authorization/Register';
import ForgotPassword from './Components/Authorization/ForgotPassword';
import SalataMenu from './Components/Navigation/SalataMenu';
import Kasedilja from './Components/Navigation/Kesadilja';
import Address from './Components/ProfileInfo/Address';
import Placanje from './Components/ProfileInfo/Placanje';
import History from './Components/ProfileInfo/History';
import MyRewards from './Components/ProfileInfo/MyRewards';
import Desert from './Components/Common/Desert';

const routePaths = {
    HOME: '/',
    Restorans: '/restorans',
    System: '/restaurant-menu',
    // PROFILEDATA: '/profile-data',
    PROFILEINFO: '/profile-info',
    ORDERS_HISTORY: '/profile-info/history',
    CREDIT_CARD: '/profile-info/credit-card',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOTPASSOWRD: '/forgot-password',
    SALATA: '/salata',
    KESADILJA: '/kesadilja',
    ADDRESS: '/profile-info/address',
    PLACANJE: '/profile-info/credit-card',
    HISTORY: '/profile-info/history',
    MY_REWARDS: '/profile-info/myRewards',
    PAYMENT_INFO: '/payment-info',
    PAYMENT: '/payment',
    DESERT: '/desert'
};

const routes = [{
    id: 1,
    title: 'home',
    path: routePaths.HOME,
    component: Home,
    hideOnNavbar: false,
},
{
    id: 2,
    title: 'restorans',
    path: routePaths.Restorans,
    component: Restorans,
    hideOnNavbar: false,
},
{
    id: 3,
    title: 'System',
    path: routePaths.System,
    component: systemMenu,
    hideOnNavbar: true,
},
{
    id: 4,
    title: '',
    path: routePaths.PROFILEINFO,
    component: MyProfile,
    hideOnNavbar: false,
    showUserInfoHeader: true
},
{
    id: 5,
    title: 'MOJ PROFILE',
    path: routePaths.PROFILEINFO,
    component: MyProfile,
    hideOnNavbar: false,
    showUserInfoHeader: true
},
{
    id: 6,
    title: 'KESEDILJA',
    path: routePaths.KESADILJA,
    hideOnNavbar: true,
    component: Kasedilja,
},
{
    id: 7,
    title: 'SALATA',
    path: routePaths.SALATA,
    hideOnNavbar: true,
    component: SalataMenu,
},
{
    id: 8,
    title: 'PRIJAVA',
    path: routePaths.LOGIN,
    component: Login,
    loginButtonShow: true,
},
{
    id: 9,
    title: '',
    path: routePaths.REGISTER,
    component: Register,
},
{
    id: 10,
    title: 'MOJE ADRESE',
    path: routePaths.ADDRESS,
    component: Address,
},
{
    id: 10,
    title: 'PLACANJE',
    path: routePaths.PLACANJE,
    component: Placanje,
},
{
    id: 11,
    title: 'HISTORY',
    path: routePaths.HISTORY,
    component: History,
},
{
    id: 12,
    title: 'MY_REWARDS',
    path: routePaths.MY_REWARDS,
    component: MyRewards,
},
{
    id: 13,
    title: 'PAYMENT_INFO',
    path: routePaths.PAYMENT_INFO,
    component: PaymentInfo,
},
{
    id: 14,
    title: 'FORGOT_PASSWORD',
    path: routePaths.FORGOTPASSOWRD,
    component: ForgotPassword,
},
{
    id: 15,
    title: 'PAYMENT',
    path: routePaths.PAYMENT,
    component: Payment,
},
{
    id: 16,
    title: '',
    path: routePaths.LIMUNADA,
    component: Desert,
},
];

export { routePaths };
export default routes;