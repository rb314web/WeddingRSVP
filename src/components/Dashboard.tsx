import React, { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/style/Dashboard.scss';

interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'confirmed' | 'declined' | 'pending';
  plusOne?: string;
}

const Dashboard: FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    plusOne: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/guests`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Błąd ładowania danych');
        }
        
        const data: Guest[] = await response.json();
        setGuests(data);
      } catch (error) {
        if (error instanceof Error) {
          setServerError(error.message);
        } else {
          setServerError('Wystąpił nieoczekiwany błąd');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!newGuest.name.trim()) {
      newErrors.name = 'Imię jest wymagane';
    }
    if (!newGuest.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/guests`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuest)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Błąd dodawania gościa');
      }

      const createdGuest: Guest = await response.json();
      setGuests([...guests, createdGuest]);
      setNewGuest({ name: '', email: '', plusOne: '' });
      setErrors({});
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Wystąpił nieznany błąd podczas dodawania gościa');
      }
    }
  };

  const handleStatusChange = async (guestId: string, newStatus: 'confirmed' | 'declined') => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/guests/${guestId}/status`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (!response.ok) {
        throw new Error('Błąd aktualizacji statusu');
      }

      setGuests(guests.map(guest => 
        guest.id === guestId ? { ...guest, status: newStatus } : guest
      ));
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Wystąpił nieznany błąd podczas aktualizacji statusu');
      }
    }
  };

  const handleDeleteGuest = async (guestId: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/guests/${guestId}`,
        { method: 'DELETE', credentials: 'include' }
      );

      if (!response.ok) {
        throw new Error('Błąd usuwania gościa');
      }

      setGuests(guests.filter(guest => guest.id !== guestId));
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Wystąpił nieznany błąd podczas usuwania gościa');
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h2>Zarządzanie Gośćmi</h2>
        
        {serverError && <div className="error-message">{serverError}</div>}

        <form onSubmit={handleAddGuest} className="guest-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Imię i nazwisko"
              value={newGuest.name}
              onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={newGuest.email}
              onChange={e => setNewGuest({ ...newGuest, email: e.target.value })}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Osoba towarzysząca (opcjonalnie)"
              value={newGuest.plusOne}
              onChange={e => setNewGuest({ ...newGuest, plusOne: e.target.value })}
            />
          </div>

          <button type="submit" className="add-button">
            Dodaj Gościa
          </button>
        </form>

        <div className="guest-list">
          {isLoading ? (
            <div className="loading">Ładowanie...</div>
          ) : guests.length === 0 ? (
            <div className="empty">Brak dodanych gości</div>
          ) : (
            guests.map(guest => (
              <div key={guest.id} className={`guest-card ${guest.status}`}>
                <div className="guest-info">
                  <h3>{guest.name}</h3>
                  <p>{guest.email}</p>
                  {guest.plusOne && <p>+1: {guest.plusOne}</p>}
                </div>

                <div className="guest-actions">
                  <select
                    value={guest.status}
                    onChange={e => handleStatusChange(
                      guest.id, 
                      e.target.value as 'confirmed' | 'declined'
                    )}
                  >
                    <option value="confirmed">Potwierdzony</option>
                    <option value="pending">Oczekujący</option>
                    <option value="declined">Odwołany</option>
                  </select>
                  <button
                    onClick={() => handleDeleteGuest(guest.id)}
                    className="delete-button"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;