import React, { useState } from 'react';

function BloodWorkForm({ onSubmit }) {
  const [bloodValues, setBloodValues] = useState({
    vitaminA: '',
    vitaminB1: '',
    vitaminB2: '',
    vitaminB3: '',
    vitaminB5: '',
    vitaminB6: '',
    vitaminB7: '',
    vitaminB9: '',
    vitaminC: '',
    vitaminE: '',
    vitaminK1: '',
    protein: '',
    calcium: '',
    magnesium: '',
    potassium: '',
    sodium: '',
    selenium: '',
    copper: '',
    manganese: '',
    phosphorus: '',
    chromium: '',
    molybdenum: '',
    luteinZeaxanthin: '',
    lLysine: '',
    silica: '',
    mct: '',
    mufa: '',
    vitaminD3: '',
    vitaminB12: '',
    omega3: '',
    cholesterol: '',
    tsh: '',
    kidneyTest: '',
  });

  const handleChange = (field, value) => {
    setBloodValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bloodValues);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <p>
        Please fill out your blood work (leave blank if unknown). <br />
        <em>(Numbers, short text, or “skip” is fine.)</em>
      </p>

      <label>Vitamin A:</label>
      <input
        type="text"
        value={bloodValues.vitaminA}
        onChange={(e) => handleChange('vitaminA', e.target.value)}
      />
      <br />

      <label>Vitamin B1 (Thiamine):</label>
      <input
        type="text"
        value={bloodValues.vitaminB1}
        onChange={(e) => handleChange('vitaminB1', e.target.value)}
      />
      <br />

      {/* etc. for all fields, skipping for brevity... */}

      <label>Cholesterol:</label>
      <input
        type="text"
        value={bloodValues.cholesterol}
        onChange={(e) => handleChange('cholesterol', e.target.value)}
      />
      <br />

      <label>TSH:</label>
      <input
        type="text"
        value={bloodValues.tsh}
        onChange={(e) => handleChange('tsh', e.target.value)}
      />
      <br />

      <label>Kidney Test:</label>
      <input
        type="text"
        value={bloodValues.kidneyTest}
        onChange={(e) => handleChange('kidneyTest', e.target.value)}
      />
      <br />

      <button type="submit" style={{ marginTop: '10px' }}>
        Submit Blood Work
      </button>
    </form>
  );
}

export default BloodWorkForm;

