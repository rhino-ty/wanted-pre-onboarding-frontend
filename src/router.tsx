import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./page/login";
import Signup from "./page/signup";
import Todo from "./page/todo";

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
    path: "/",
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

const routers = (
  <Routes>
    {routerData.map((route) => {
      const hasAccessToken = localStorage.getItem("access_token") ? true : false;
      const isProtectedRoute = route.withAuth;

      if (hasAccessToken && (route.path === "/" || route.path === "/signup")) {
        return (
          <Route
            key={route.id}
            path={route.path}
            element={<Navigate key={route.id} to="/todo" />}
          />
        );
      }

      if (!hasAccessToken && isProtectedRoute && route.path === "/todo") {
        return (
          <Route key={route.id} path={route.path} element={<Navigate key={route.id} to="/" />} />
        );
      }

      return <Route key={route.id} path={route.path} element={route.element} />;
    })}
    {/* 404 리다이렉트 */}
    <Route path="/*" element={<Navigate to="/" />} />
  </Routes>
);

export default routers;
