import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import "../styles/Login.css";

import userpool from "./userpool";

// DEPRECATED, NOW LEVERAGING COGNITO HOSTED UI TO REGISTER

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
    if (formField === "name") {
      setName(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === "") {
        setEmailErr("Email is Required");
        resolve({
          email: "Email is Required",
          name: "",
          password: "",
        });
      } else if (name === "") {
        setNameErr("Name is required");
        resolve({ name: "Name is Required", email: "", password: "" });
      } else if (password === "") {
        setPasswordErr("Password is required");
        resolve({ email: "", password: "Password is required" });
      } else if (password.length < 6) {
        setPasswordErr("must be 6 character");
        resolve({ email: "", name: "", password: "must be 6 character" });
      } else {
        resolve({ email: "", name: "", password: "" });
      }
      reject("");
    });
  };

  const handleClick = (e) => {
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then(
        (res) => {
          if (res.email === "" && res.password === "") {
            const attributeList = [];
            attributeList.push(
              new CognitoUserAttribute({
                Name: "email",
                Value: email,
              })
            );
            attributeList.push(
              new CognitoUserAttribute({
                Name: "name",
                Value: name,
              })
            );
            let username = email;
            userpool.signUp(
              username,
              password,
              attributeList,
              null,
              (err, data) => {
                if (err) {
                  console.log(err);
                  alert(`Couldn't sign up: ${err.message}`);
                } else {
                  console.log(data);
                  alert("User Added Successfully");
                  navigate("/dashboard");
                }
              }
            );
          }
        },
        (err) => {
          console.log(err);
          alert(`Couldn't sign up: ${err.message}`);
        }
      )
      .catch((err) => console.log(err));
  };

  const goToHome = () => {
    navigate(`/home`);
  };

  return (
    <div className="register" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        padding: "40px 32px",
        minWidth: "350px",
        maxWidth: "90vw",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        <Typography variant="h4" align="center" fontWeight={700} color="primary" gutterBottom>
          Register to TODOs App
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
          Create your account to start managing your tasks
        </Typography>
        <TextField
          value={email}
          onChange={(e) => formInputChange("email", e.target.value)}
          label="Email"
          helperText={emailErr}
          error={!!emailErr}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          value={name}
          onChange={(e) => formInputChange("name", e.target.value)}
          label="Name"
          helperText={nameErr}
          error={!!nameErr}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          value={password}
          onChange={(e) => formInputChange("password", e.target.value)}
          type="password"
          label="Password"
          helperText={passwordErr}
          error={!!passwordErr}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
          marginTop: "16px"
        }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleClick}
            fullWidth
            style={{ fontWeight: 600, borderRadius: "8px" }}
          >
            Register
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={goToHome}
            fullWidth
            style={{ fontWeight: 600, borderRadius: "8px" }}
          >
            Return
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
