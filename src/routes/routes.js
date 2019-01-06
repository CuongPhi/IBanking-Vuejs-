import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Login from "@/pages/Login.vue";
import Beneficiary from "@/pages/Beneficiary.vue";
import TransferMoney from "@/pages/TransferMoney.vue";
import Accounts from "@/pages/Accounts.vue"

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "login",
        name: "Login",
        component: Login
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "beneficiary",
        name: "Beneficiary",
        component: Beneficiary
      },
      {
        path: "transfer",
        name: "Transfer Money",
        component: TransferMoney
      },
      { 
        path: "accounts",
        name: "Accounts",
        component: Accounts
      }
    ]
  }
];

export default routes;
