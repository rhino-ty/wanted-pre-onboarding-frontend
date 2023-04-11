import { SidebarElement } from "./types/sidebar";
import { createBrowserRouter } from "react-router-dom";
// import { Router as RemixRouter } from "@remix-run/router/dist/router";
// import GeneralLayout from "./layout/GeneralLayout";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import PageA from "./pages/PageA";
// import PageB from "./pages/PageB";
// import PageC from "./pages/PageC";

interface RouterElement {
  id: number; // 페이지 아이디 (반복문용 고유값)
  path: string; // 페이지 경로
  label: string; // 사이드바에 표시할 페이지 이름
  element: React.ReactNode; // 페이지 엘리먼트
  withAuth?: boolean; // 인증이 필요한 페이지 여부
}

const routerData: RouterElement[] = [
  // TODO 3-1: 로그인 페이지 라우터 등록하기 ('login', withAuth: false)
  // TODO 3-2: page a, b, c 등록하기
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/login",
    label: "Login",
    element: <Login />,
    withAuth: false,
  },
  {
    id: 2,
    path: "/page-a",
    label: "PageA",
    element: <PageA />,
    withAuth: true,
  },
  {
    id: 3,
    path: "/page-b",
    label: "PageB",
    element: <PageB />,
    withAuth: true,
  },
  {
    id: 4,
    path: "/page-c",
    label: "PageC",
    element: <PageC />,
    withAuth: true,
  },
];
