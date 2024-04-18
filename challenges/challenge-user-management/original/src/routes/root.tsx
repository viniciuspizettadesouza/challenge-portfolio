import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const navigate = useNavigate();
  const [session] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const fetchDataAndNavigate = async () => {
      if (session) {
        navigate("/welcome", { state: "" });
      } else {
        navigate("/sign-up");
      }
    };

    fetchDataAndNavigate();
  }, [session, navigate]);

  return (
    <>
      <h1>Vite + React</h1>
    </>
  );
}
