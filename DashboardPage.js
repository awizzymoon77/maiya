import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

function DashboardPage() {
  const { userData } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [bmi, setBmi] = useState(null);

  // BMI calculation logic
  const calculateBMI = () => {
    // Implement conversion from imperial/metric
    // and actual BMI calculation
    return 22; // Example value
  };

  return (
    <div className="dashboard">
      <h2>Your Health Dashboard</h2>
      
      {!editing ? (
        <div className="read-mode">
          {/* Display all user data */}
          <p>BMI: {bmi || calculateBMI()}</p>
          <button onClick={() => setEditing(true)}>Edit Details</button>
        </div>
      ) : (
        <div className="edit-mode">
          {/* Editable fields */}
          <button onClick={() => setEditing(false)}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;



  