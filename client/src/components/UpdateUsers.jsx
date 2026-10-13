import { useState } from 'react';
import { updateUser } from '../services/userApi';

// Edit form for a single user, pre-filled from the `user` prop. UserView
// renders this with key={user.id}, so selecting a *different* user remounts
// it with a fresh lazy-initialized state instead of needing an effect to
// resync form fields from props.
function UpdateUsers({ user, onUserUpdated, onCancel }) {
  const [formData, setFormData] = useState(() => ({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    age: user?.age ?? '',
    city: user?.city || '',
  }));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return null;
  }

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email) {
      setError('Name and Email are mandatory fields');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        age: formData.age ? Number(formData.age) : null,
        city: formData.city,
      };
      // Only send a password if the user actually typed a new one —
      // leaving it blank keeps the existing hash untouched.
      if (formData.password) {
        payload.password = formData.password;
      }

      const updated = await updateUser(user.id, payload);
      onUserUpdated?.(updated);
    } catch (err) {
      setError(err.message || 'Failed to update user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Update User</h2>

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange('name')}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange('email')}
      />
      <input
        type="password"
        placeholder="New password (leave blank to keep current)"
        value={formData.password}
        onChange={handleChange('password')}
      />
      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange('age')}
      />
      <input
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={handleChange('city')}
      />

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save changes'}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

export default UpdateUsers;
