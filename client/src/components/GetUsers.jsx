import DeleteUser from './DeleteUser';

// Displays the user list and composes DeleteUser per row. Create/update are
// handled by the parent (UserView) so this component stays read-focused.
function GetUsers({ users, loading, error, onEdit, onUserDeleted }) {
  if (loading) {
    return <p>Loading users…</p>;
  }

  if (error) {
    return <p className="form-error">{error}</p>;
  }

  if (!users.length) {
    return <p>No users yet — create one above.</p>;
  }

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age ?? '—'}</td>
            <td>{user.city ?? '—'}</td>
            <td className="user-actions">
              <button type="button" onClick={() => onEdit(user)}>
                Edit
              </button>
              <DeleteUser userId={user.id} onUserDeleted={onUserDeleted} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GetUsers;
