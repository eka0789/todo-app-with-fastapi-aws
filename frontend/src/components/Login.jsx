import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authenticate";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };

  // Soft validations, as Cognito User Pool has advanced ones
  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === "" && password === "") {
        setEmailErr("Email is Required");
        setPasswordErr("Password is required");
        resolve({
          email: "Email is Required",
          password: "Password is required",
        });
      } else if (email === "") {
        setEmailErr("Email is Required");
        resolve({ email: "Email is Required", password: "" });
      } else if (password === "") {
        setPasswordErr("Password is required");
        resolve({ email: "", password: "Password is required" });
      } else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleClick = () => {
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then(
        (res) => {
          if (res.email === "" && res.password === "") {
            authenticate(email, password)
              .then(
                (data) => {
                  setLoginErr("");
                  navigate("/home");
                },
                (err) => {
                  console.log(err);
                  setLoginErr(err.message);
                }
              )
              .catch((err) => console.log(err));
          }
        },
        (err) => console.log(err)
      )
      .catch((err) => console.log(err));
  };

  const goToHome = () => {
    navigate(`/home`);
  };

  return (
    <div className="login" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    }}>
      <div className="form" style={{
        background: "#fff",
        padding: "2.5rem 2rem",
        borderRadius: "18px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        minWidth: "340px",
        maxWidth: "90vw"
      }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: "#1976d2" }}>
          Login to TODOs App
        </Typography>
        <div className="formfield" style={{ marginBottom: "1.5rem" }}>
          <TextField
            value={email}
            onChange={(e) => formInputChange("email", e.target.value)}
            label="Email"
            helperText={emailErr}
            error={!!emailErr}
            fullWidth
            variant="outlined"
            autoComplete="email"
            sx={{ background: "#f8fafc", borderRadius: 1 }}
          />
        </div>
        <div className="formfield" style={{ marginBottom: "1.5rem" }}>
          <TextField
            value={password}
            onChange={(e) => formInputChange("password", e.target.value)}
            type="password"
            label="Password"
            helperText={passwordErr}
            error={!!passwordErr}
            fullWidth
            variant="outlined"
            autoComplete="current-password"
            sx={{ background: "#f8fafc", borderRadius: 1 }}
          />
        </div>
        <div className="formfield" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.2rem"
        }}>
          <Button
            type="submit"
            variant="contained"
            onClick={handleClick}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)"
            }}
          >
            Login
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={goToHome}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              color: "#1976d2",
              borderColor: "#1976d2"
            }}
          >
            Return
          </Button>
        </div>
        {loginErr && (
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#d32f2f", fontWeight: 500, mt: 1 }}
          >
            {loginErr}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Login;
