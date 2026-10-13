import { useState, useEffect } from 'react';
import CreateUsers from './components/CreateUsers';
import GetUsers from './components/GetUsers';
import UpdateUsers from './components/UpdateUsers';
import { fetchUsers } from './services/userApi';
import './UserView.css';

// Owns the user list and talks to the API; Create/Get/Update/Delete
// components stay presentational and report back through callbacks.
function UserView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Load the list once on mount. State is only ever set from inside the
  // .then()/.catch()/.finally() callbacks — i.e. once the fetch actually
  // resolves/rejects — never synchronously in the effect body itself, so
  // this doesn't trigger a cascading re-render (react-hooks/set-state-in-effect).
  // `ignore` guards against setting state after the component has unmounted.
  useEffect(() => {
    let ignore = false;

    fetchUsers()
      .then((data) => {
        if (ignore) return;
        setUsers(data);
        setError('');
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message || 'Failed to load users');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleUserCreated = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
  };

  const handleUserDeleted = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setEditingUser((current) => (current?.id === id ? null : current));
  };

  return (
    <div className="user-view">
      <CreateUsers onUserCreated={handleUserCreated} />

      {editingUser && (
        <UpdateUsers
          user={editingUser}
          onUserUpdated={handleUserUpdated}
          onCancel={() => setEditingUser(null)}
        />
      )}

      <GetUsers
        users={users}
        loading={loading}
        error={error}
        onEdit={setEditingUser}
        onUserDeleted={handleUserDeleted}
      />
    </div>
  );
}

export default UserView;
