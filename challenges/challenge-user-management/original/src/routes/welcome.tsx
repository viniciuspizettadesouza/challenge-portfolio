import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  support: {
    url: string;
    text: string;
  };
}

export default function Welcome(): React.ReactNode {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('challenge/token');
    const id = sessionStorage.getItem('challenge/id');

    if (token && id) {
      fetchUser(id);
    } else {
      navigate("/sign-in")
    }
  }, [navigate]);

  const fetchUser = (id: string | null): void => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user data');
        }
      })
      .then((responseData: { data: UserData }) => {
        const data = responseData.data;
        setUserData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  return (
    <div>
      {userData ? (
        <div>
          <p>Hello {userData.first_name} {userData.last_name}</p>
          <img src={userData.avatar} alt="User Avatar" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
