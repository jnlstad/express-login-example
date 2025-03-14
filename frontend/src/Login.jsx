import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(username, password);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.ok) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input type="submit" value="Submit" />
      </form>
      <p>Login</p>
      <div
        style={{
          width: "200px",
          backgroundColor: "red",
          height: "200px",
          position: "relative",
        }}
      ></div>
    </>
  );
}
