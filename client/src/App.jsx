import UserView from './UserView'; // Container wiring together create/get/update/delete
import './App.css'; // Import the CSS file for styling the App component

function App() {
  return (
    <div className="app"> {/* Main container with a class name for styling */}
      <h1>VitalBliss User Management</h1> {/* Heading for the application */}
      <UserView /> {/* Fetches users and composes the CRUD components */}
    </div>
  );
}

export default App;
