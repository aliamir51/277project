import Vue from "vue";
import Router from "vue-router";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");

const Scientist = () => import("@/components/Scientists");

const Projects = () => import("@/components/Projects");

const Resources = () => import("@/components/Resources");

const Executives = () => import("@/components/Executives");

const Departments = () => import("@/components/Departments");
const Welcome = () => import("@/components/Welcome");

const Mypage = () => import("@/components/Mypage");

// const Typography = () => import('@/views/theme/Typography')

// const Charts = () => import('@/views/Charts')
// const Widgets = () => import('@/views/Widgets')

// // Views - Components
// const Cards = () => import('@/views/base/Cards')
// const Forms = () => import('@/views/base/Forms')
// const Switches = () => import('@/views/base/Switches')
const Tables = () => import("@/views/base/Tables");
// const Tabs = () => import('@/views/base/Tabs')
// const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
// const Carousels = () => import('@/views/base/Carousels')
// const Collapses = () => import('@/views/base/Collapses')
// const Jumbotrons = () => import('@/views/base/Jumbotrons')
// const ListGroups = () => import('@/views/base/ListGroups')
// const Navs = () => import('@/views/base/Navs')
// const Navbars = () => import('@/views/base/Navbars')
// const Paginations = () => import('@/views/base/Paginations')
// const Popovers = () => import('@/views/base/Popovers')
// const ProgressBars = () => import('@/views/base/ProgressBars')
// const Tooltips = () => import('@/views/base/Tooltips')

// // Views - Buttons
// const StandardButtons = () => import('@/views/buttons/StandardButtons')
// const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
// const Dropdowns = () => import('@/views/buttons/Dropdowns')
// const BrandButtons = () => import('@/views/buttons/BrandButtons')

// // Views - Icons
// const Flags = () => import('@/views/icons/Flags')
// const FontAwesome = () => import('@/views/icons/FontAwesome')
// const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
// const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// // Views - Notifications
// const Alerts = () => import('@/views/notifications/Alerts')
// const Badges = () => import('@/views/notifications/Badges')
// const Modals = () => import('@/views/notifications/Modals')

// // Views - Pages
// const Page404 = () => import('@/views/pages/Page404')
// const Page500 = () => import('@/views/pages/Page500')
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");

// // Users
// const Users = () => import('@/views/users/Users')
// const User = () => import('@/views/users/User')

Vue.use(Router);

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/home",

      name: "Home",
      component: DefaultContainer,
      children: [
        {
          path: "/",
          name: "welcome",
          component: Welcome
        },
        {
          name: "department",
          path: "/department",
          component: Departments
        },
        {
          name: "Executives Board",
          path: "/executivesBoard",
          component: Executives
        },
        {
          name: "Projects",
          path: "/projects",
          component: Projects
        },
        {
          name: "Scientist",
          path: "/scientist",
          component: Scientist
        },
        {
          name: "Resources",
          path: "/resources",
          component: Resources
        }
      ]
    },
    {
      path: "/Mypage",

      name: "Mypage",
      component: DefaultContainer,
      children: [
        {
          path: "/",
          name: "mypage",
          component: Mypage
        }
      ]
    }
  ]
});
