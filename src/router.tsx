import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./page/login";
import Signup from "./page/signup";
import Todo from "./page/todo";
import { getAccessTokenFromLocalStorage } from "./utils/accessTokenHandler";

interface RouterElement {
  id: number; // 페이지 아이디 (반복문용 고유값)
  path: string; // 페이지 경로
  label: string; // 사이드바에 표시할 페이지 이름
  element: React.ReactNode; // 페이지 엘리먼트
  withAuth?: boolean; // 인증이 필요한 페이지 여부
  redirectPath?: string;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/login",
    label: "Login",
    element: <Login />,
    withAuth: false,
    redirectPath: "/todo",
  },
  {
    id: 1,
    path: "/signup",
    label: "Signup",
    element: <Signup />,
    withAuth: false,
    redirectPath: "/todo",
  },
  {
    id: 2,
    path: "/todo",
    label: "Todo",
    element: <Todo />,
    withAuth: true,
  },
];

const routers = createBrowserRouter(
  routerData.map((router) => {
    const hasAccessToken = !!getAccessTokenFromLocalStorage();
    const isProtectedRoute = !!router.withAuth;

    if (isProtectedRoute && !hasAccessToken) {
      return {
        path: router.path,
        element: <Navigate to={"/login"} />,
      };
    }

    if (hasAccessToken && !isProtectedRoute) {
      return {
        path: router.path,
        element: <Navigate to={"/todo"} />,
      };
    }

    return {
      path: router.path,
      element: router.element,
    };
  })
);

export default routers;
