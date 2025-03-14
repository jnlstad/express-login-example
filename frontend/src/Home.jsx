import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/users", {
          credentials: "include",
        });
        if (!response.ok) {
          navigate("/");
        }

        const newData = await response.json();
        setData(JSON.stringify(newData));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  });

  async function handleLogOut() {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button onClick={handleLogOut}>logout</button>
      <p>Home</p>
      <p>{data}</p>
    </>
  );
}
