import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import appLogo1 from "../assets/todo-app-logo-1.png";
import { useEffect } from "react";
import userpool from "./userpool";
import globalPublicVars from "../GLOBAL_VARS";

const Home = () => {
  const navigate = useNavigate();
  const COGNITO_HOSTED_UI_ENDPOINT =
    globalPublicVars.VITE_COGNITO_HOSTED_UI_ENDPOINT;

  useEffect(() => {
    let user = userpool.getCurrentUser();
    console.log(`user is: ${JSON.stringify(user)}`);

    if (user) {
      navigate(`/dashboard`);
    }
  }, []);

  return (
    <div
      className="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <img
        src={appLogo1}
        alt="App Logo"
        style={{
          width: "120px",
          marginBottom: "32px",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      />
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: "#22223b",
          mb: 1,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        Welcome to your TODOs
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#4a4e69",
          mb: 4,
          textAlign: "center",
          fontWeight: 400,
        }}
      >
        Please login or register to continue
      </Typography>
      <div
        className="homeButtons"
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            px: 4,
            borderRadius: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            background: "linear-gradient(90deg, #5f72bd 0%, #9aabe7 100%)",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <a
          href={COGNITO_HOSTED_UI_ENDPOINT}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{
              px: 4,
              borderRadius: "30px",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              borderColor: "#5f72bd",
              color: "#5f72bd",
              "&:hover": {
                borderColor: "#9aabe7",
                background: "#f5f7fa",
              },
            }}
          >
            Register
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Home;
