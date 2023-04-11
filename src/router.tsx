import { Navigate, createBrowserRouter } from "react-router-dom";
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
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/login",
    label: "Login",
    element: <Login />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/signup",
    label: "Signup",
    element: <Signup />,
    withAuth: false,
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
    const isProtectedRoute = router.withAuth;

    if (hasAccessToken && (router.path === "/login" || router.path === "/signup")) {
      return {
        path: router.path,
        element: <Navigate to={"/todo"} replace />,
      };
    }

    if (!hasAccessToken && router.path === "/todo" && isProtectedRoute) {
      return {
        path: router.path,
        element: <Navigate to={"/login"} replace />,
      };
    }

    return {
      path: router.path,
      element: router.element,
    };
  })
);

export default routers;
