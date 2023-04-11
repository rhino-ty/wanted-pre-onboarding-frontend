import React, { useState } from "react";
import styled from "styled-components";
import { postLogin } from "../api/auth/loginApi";
import { useRouter } from "../hooks/useRouter";
import { getAccessTokenFromLocalStorage } from "../utils/accessTokenHandler";

// import { saveRefreshTokenToLocalStorage } from "@/src/utils/refreshTokenHandler";
// import { saveAccessTokenToLocalStorage } from "@/src/utils/accessTokenHandler";

export default function Login() {
  const { routeTo } = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isLoggedIn = async (): Promise<boolean> => {
    const userProfileResponse = getAccessTokenFromLocalStorage();
    return userProfileResponse !== null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isUserLoggedIn: boolean = await isLoggedIn();

    if (isUserLoggedIn) {
      routeTo("/todo");
      return;
    }

    const loginResult = await postLogin({
      email: email,
      password: password,
    });

    if (loginResult === "fail") {
      alert("로그인 실패, 이메일과 비밀번호를 다시 입력해주세요.");
      return;
    }
    routeTo("/todo");
  };

  const handleSignup = () => {
    routeTo("/signup");
  };

  const isButtonDisabled = !email.includes("@") || !email.includes(".") || password.length < 8;

  return (
    <S.Container>
      <form onSubmit={handleSubmit}>
        <S.AccountWrapper>
          <S.InputField>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </S.InputField>
          <S.InputField>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </S.InputField>
        </S.AccountWrapper>

        <S.ButtonWrapper>
          <S.LoginButton disabled={isButtonDisabled} type="submit">
            로그인
          </S.LoginButton>
          <S.RegisterButton onClick={handleSignup}>회원가입</S.RegisterButton>
        </S.ButtonWrapper>
      </form>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 768px;
    margin: auto;
  `,

  AccountWrapper: styled.div`
    margin: auto;
  `,

  InputField: styled.div`
    margin: 0 auto;
    width: 452px;
    height: 50px;
    border: 1px solid #dcdce0;
    border-radius: 8px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;

    & > input {
      border: none;
      padding: 0 16px;
      border-radius: 8px;
      height: 100%;
      flex: 1;

      &::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: #959599;
      }
    }
  `,

  ButtonWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  LoginButton: styled.button`
    width: 452px;
    height: 50px;
    background-color: ${({ disabled }) => (disabled ? "#eee" : "#ff812e")};
    color: ${({ disabled }) => (disabled ? "#959599" : "#fff")};
    border-radius: 8px;
    margin: 0 auto;
    font-weight: 700;
    font-size: 16px;
    line-height: 22.4px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  `,

  RegisterButton: styled.button`
    margin: 20px;
    width: 56px;
    border-bottom: 1px solid #49494d;
    color: #49494d;
    font-weight: 800;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
  `,
};
