import React, { FC, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/style/Dashboard.scss';

interface Guest {
  id: string;
  name: string;
  email: string;
  confirmed: boolean;
  plusOne?: string;
}

const Dashboard: FC = () => {
  const { logout, user } = useAuth0();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [editGuest, setEditGuest] = useState<Guest | null>(null);
  const [newGuest, setNewGuest] = useState<Omit<Guest, 'id'>>({
    name: '',
    email: '',
    confirmed: false,
    plusOne: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Walidacja formularza
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!newGuest.name.trim()) newErrors.name = 'Imię jest wymagane';
    if (!newGuest.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Nieprawidłowy format email';
    }
    return newErrors;
  };

  // Obsługa dodawania/edycji
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) return setErrors(errors);

    if (editGuest) {
      // Edycja istniejącego gościa
      setGuests(guests.map(g =>
          g.id === editGuest.id ? { ...newGuest, id: editGuest.id } : g
      ));
    } else {
      // Dodawanie nowego gościa
      setGuests([...guests, { ...newGuest, id: Date.now().toString() }]);
    }

    setNewGuest({ name: '', email: '', confirmed: false, plusOne: '' });
    setEditGuest(null);
    setErrors({});
  };

  // Przygotowanie formularza do edycji
  const handleEdit = (guest: Guest) => {
    setEditGuest(guest);
    setNewGuest({
      name: guest.name,
      email: guest.email,
      confirmed: guest.confirmed,
      plusOne: guest.plusOne || ''
    });
  };

  // Usuwanie gościa
  const handleDelete = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  return (
      <div className="dashboard">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <div className="user-info">
              <h1>Lista Gości</h1>
              <p>Zalogowany jako: {user?.email}</p>
            </div>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Wyloguj
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>{editGuest ? 'Edytuj Gościa' : 'Dodaj Nowego Gościa'}</h2>

              <div className="input-group">
                <label>Imię i Nazwisko*</label>
                <input
                    value={newGuest.name}
                    onChange={e => setNewGuest({...newGuest, name: e.target.value})}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="input-group">
                <label>Email*</label>
                <input
                    type="email"
                    value={newGuest.email}
                    onChange={e => setNewGuest({...newGuest, email: e.target.value})}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="input-group">
                <label>Potwierdzenie</label>
                <div className="radio-group">
                  <label>
                    <input
                        type="radio"
                        checked={newGuest.confirmed}
                        onChange={() => setNewGuest({...newGuest, confirmed: true})}
                    />
                    Tak
                  </label>
                  <label>
                    <input
                        type="radio"
                        checked={!newGuest.confirmed}
                        onChange={() => setNewGuest({...newGuest, confirmed: false})}
                    />
                    Nie
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label>Osoba Towarzysząca</label>
                <input
                    value={newGuest.plusOne}
                    onChange={e => setNewGuest({...newGuest, plusOne: e.target.value})}
                />
              </div>

              <button type="submit">
                {editGuest ? 'Zapisz Zmiany' : 'Dodaj Gościa'}
              </button>
              {editGuest && (
                  <button type="button" onClick={() => setEditGuest(null)}>
                    Anuluj
                  </button>
              )}
            </div>
          </form>

          <div className="guest-list">
            <h3>Lista Gości ({guests.length})</h3>

            {guests.map(guest => (
                <div key={guest.id} className={`guest-item ${guest.confirmed ? 'confirmed' : 'declined'}`}>
                  <div className="guest-info">
                    <div>
                      <h4>{guest.name}</h4>
                      {guest.plusOne && <p>+ {guest.plusOne}</p>}
                    </div>
                    <p>{guest.email}</p>
                  </div>

                  <div className="guest-actions">
                <span className={`status ${guest.confirmed ? 'confirmed' : 'declined'}`}>
                  {guest.confirmed ? 'Tak ✅' : 'Nie ❌'}
                </span>
                    <button onClick={() => handleEdit(guest)}>Edytuj</button>
                    <button onClick={() => handleDelete(guest.id)}>Usuń</button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Dashboard;