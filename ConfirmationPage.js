import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function ConfirmationPage() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Calculate BMI here if needed
    navigate('/dashboard');
  };

  return (
    <div className="confirmation-page">
      <h2>Confirm Your Details</h2>
      <div className="details-list">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key} className="detail-item">
            <strong>{key}:</strong> {value}
            <button onClick={() => navigate('/', { state: { editField: key } })}>
              Edit
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleConfirm}>Confirm and Continue</button>
    </div>
  );
}

export default ConfirmationPage;