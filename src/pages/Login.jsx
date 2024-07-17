import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useState } from "react";
import { VisuallyHiddeninput } from "../components/styles/StyledComponents";
import { useInputValidation, useFileHandler } from '6pp';
import { usernameValidator } from "../utils/Validators";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducer/auth";
import toast from "react-hot-toast";
import axios from 'axios'; // Import Axios

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const name = useInputValidation("");
  const email = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");
  const dispatch = useDispatch();


 

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Signing...")
// setIsLoading(true)
//     if (!avatar.file) {
//       toast.error("Please upload an avatar");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name.value);
//     formData.append("email", email.value);
//     formData.append("bio", bio.value);
//     formData.append("username", username.value);
//     formData.append("password", password.value);
//     formData.append("avatar", avatar.file);

//     try {
//       const response = await axios.post(`${server}/api/v1/user/signup`, formData, {
//         withCredentials: true,  // Ensure credentials are included
//         headers: {
//           'Content-Type': 'multipart/form-data',  // Set correct content type for FormData
//         },
//       });

//       const data = response.data;

//       if (!response.data.success) {
//         throw new Error(data.message || "Something went wrong");
//       }

//       dispatch(userExists(true));
//       toast.success(data.message,{
//         id:toast
//       });

//     } catch (error) {
//       toast.error(error.message || "Something went wrong",{id:toastId});
//     }
//     finally{
//       setIsLoading(false)
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const toastId=toast.loading("Loggin...")
    
// setIsLoading(true)
//     const requestBody = {
//       email: email.value,
//       password: password.value,
//     };

//     try {
//       const response = await axios.post(`${server}/api/v1/user/login`, requestBody, {
//         withCredentials: true,  // Ensure credentials are included
//       });

//       const data = response.data;

//       if (!response.data.success) {
//         throw new Error(data.message || "Something went wrong");
//       }

//       dispatch(userExists(true));
//       toast.success(data.message,{id:toastId});
//     } catch (error) {
//       toast.error(error.message || "Something went wrong",{id:toastId});
//     }
//     finally{
//       setIsLoading(false)
//     }
//   };
const handleSignup = async (e) => {
  e.preventDefault();
  const toastId = toast.loading("Signing...");
  setIsLoading(true);
  if (!avatar.file) {
    toast.error("Please upload an avatar");
    return;
  }

  const formData = new FormData();
  formData.append("name", name.value);
  // formData.append("email", email.value);
  formData.append("bio", bio.value);
  formData.append("username", username.value);
  formData.append("password", password.value);
  formData.append("avatar", avatar.file);

  try {
    const response = await fetch(`${server}/api/v1/user/new`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Something went wrong");
    }

    dispatch(userExists(true));
    toast.success(data.message, { id: toastId });

  } catch (error) {
    toast.error(error.message || "Something went wrong", { id: toastId });
  } finally {
    setIsLoading(false);
  }
};

const handleLogin = async (e) => {
  e.preventDefault();
  const toastId = toast.loading("Logging...");
  setIsLoading(true);

  const requestBody = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await fetch(`${server}/api/v1/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Something went wrong");
    }

    dispatch(userExists(true));
    toast.success(data.message, { id: toastId });

  } catch (error) {
    toast.error(error.message || "Something went wrong", { id: toastId });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handleLogin}
            >
              {/* <TextField
                required
                fullWidth
                label="E-mail"
                margin="normal"
                variant="outlined"
                value={email.value}
                onChange={email.changeHandler}
                type="email"
              /> */}
                <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                Login
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                Or
              </Typography>
              <Button
                variant="text"
                fullWidth
                onClick={() => setIsLogin(false)}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={handleSignup}
            >
              <Stack position={"relative"} width={"6rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "6rem",
                    height: "6rem",
                    objectFit: "contain",
                  }}
                  src={avatar.preview}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "1px",
                    right: "-6px",
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      bgcolor: "rgba(0,0,0,0.7)",
                    },
                    width: '30px',
                    height: '30px'
                  }}
                  component='label'
                >
                  <>
                    <CameraAltIcon sx={{ width: '15px', height: '15px' }} />
                    <VisuallyHiddeninput type="file" onChange={avatar.changeHandler} />
                  </>
                </IconButton>
              </Stack>
              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}
              {/* <TextField
                required
                fullWidth
                label="E-mail"
                margin="normal"
                variant="outlined"
                value={email.value}
                onChange={email.changeHandler}
                type="email"
              /> */}
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                Sign Up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                Or
              </Typography>
              <Button variant="text" fullWidth onClick={() => setIsLogin(true)}  disabled={isLoading}>
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
