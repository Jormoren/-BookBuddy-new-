import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


const Account = ({ token }) => {
  const [me, setMe] = useState(null); 
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.statusText}`);
      }
      return response.json();
    })
    .then(result => {
      setMe(result);
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
      navigate('/login'); 
    });
  }, [token, navigate]);

  useEffect(() => {
    // fetch request for the reservation details
    fetch(`${API_URL}/reservations`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch reservations: ${response.statusText}`);
      }
      return response.json();
    })
    .then(result => {
      setReservations(result.reservation);
    })
    .catch(error => {
      console.error('Error fetching reservations:', error);
    });
  }, [token]);

  const handleDelete = (reservation) => {
    // fetch request to delete reservation
    fetch(`${API_URL}/reservations/${reservation.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to delete reservation: ${response.statusText}`);
      }
      return response.json();
    })
    .then(result => {
      alert('You successfully returned the book: ' + reservation.title);
      // Remove the deleted reservation from state
      setReservations(prevReservations => prevReservations.filter(item => item.id !== reservation.id));
    })
    .catch(error => {
      console.error('Error deleting reservation:', error);
    });
  };

  return (
    <>
      <h2>Account</h2>
      {me && (
        <>
          <h2>Welcome {me.firstname} {me.lastname}!</h2>
          <h3>Email: {me.email}</h3>
        </>
      )}
      <ul>
        {reservations.map(reservation => (
          <li className="bookCard" key={reservation.id}>
            <h3>{reservation.title}</h3>
            <img src={reservation.coverimage} alt={reservation.title} />
            <p>By: {reservation.author}</p>
            <p>Description: {reservation.description}</p>
            <p>Id: {reservation.id}</p>
            <button onClick={() => handleDelete(reservation)}>Return Book</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Account;
