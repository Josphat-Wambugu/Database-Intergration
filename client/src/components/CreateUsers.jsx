import { useState } from 'react';
import { createUser } from '../services/userApi';

const EMPTY_FORM = { name: '', email: '', password: '', age: '', city: '' };

function CreateUsers({ onUserCreated }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Name, email and password are mandatory fields');
      return;
    }

    setSubmitting(true);
    try {
      const newUser = await createUser({
        ...formData,
        age: formData.age ? Number(formData.age) : null,
      });
      setFormData(EMPTY_FORM);
      onUserCreated?.(newUser);
    } catch (err) {
      setError(err.message || 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Create User</h2>

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
        placeholder="Password"
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

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving…' : 'Save'}
      </button>

      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

export default CreateUsers;
