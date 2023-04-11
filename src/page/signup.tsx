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
import { useState } from "react";
import { postSignUp } from "../api/auth/signUpApi";
import { useRouter } from "../hooks/useRouter";

export default function SignUp() {
  const { routeTo } = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signUpResult = await postSignUp({
      email: email,
      password: password,
    });

    if (signUpResult === "fail") {
      alert("로그인 실패, 이메일과 비밀번호를 다시 입력해주세요.");
      return;
    }
    routeTo("/login");
  };

  const isButtonDisabled = !email.includes("@") || !email.includes(".") || password.length < 8;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원 가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="사용할 이메일"
                name="email"
                autoComplete="email"
                data-testid="email-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="사용할 비밀번호"
                type="password"
                id="password"
                autoComplete="new-password"
                data-testid="password-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={isButtonDisabled}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-testid="signup-button"
          >
            작성 완료
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                계정이 이미 있다면 로그인하기
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
