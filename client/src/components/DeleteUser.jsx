import { useState } from 'react';
import { deleteUser } from '../services/userApi';

// Reused per-row by GetUsers — deletes a single user by id and reports
// back via onUserDeleted so the parent can update its local list.
function DeleteUser({ userId, onUserDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this user? This cannot be undone.');
    if (!confirmed) return;

    setDeleting(true);
    setError('');
    try {
      await deleteUser(userId);
      onUserDeleted?.(userId);
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <span className="delete-user">
      <button type="button" className="danger" onClick={handleDelete} disabled={deleting}>
        {deleting ? 'Deleting…' : 'Delete'}
      </button>
      {error && <span className="form-error"> {error}</span>}
    </span>
  );
}

export default DeleteUser;
