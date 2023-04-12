import React, { useEffect, useRef, useState } from "react";
import { postLogin } from "../api/auth/loginApi";
import { useRouter } from "../hooks/useRouter";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Login() {
  const { routeTo } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAccessTokenFetched = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginResult = await postLogin({
      email: email,
      password: password,
    });

    if (loginResult === "fail") {
      setPassword("");
      alert("로그인 실패, 이메일과 비밀번호를 다시 입력해주세요.");
      return;
    } else if (loginResult === "success") {
      isAccessTokenFetched.current = true;
      routeTo("/todo");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (isAccessTokenFetched.current) routeTo("/todo");

    return;
  }, [routeTo]);

  const isButtonDisabled = !email.includes("@") || !email.includes(".") || password.length < 8;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isButtonDisabled}
          >
            로그인
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"계정이 없다면 회원가입하기"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
