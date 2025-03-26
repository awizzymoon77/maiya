import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import BloodWorkForm from '../components/BloodWorkForm';

function ChatOnboarding() {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [tempUnits, setTempUnits] = useState({
    system: 'Metric',
    height: { cm: '', feet: '', inches: '' },
    weight: { kg: '', lbs: '' }
  });
  const [tempDOB, setTempDOB] = useState({ year: '', month: '', day: '' });

  const steps = [
    {
      id: 'firstName',
      botMessage: "Hello! I'm Maiya. Let's get started. What's your first name?",
      type: 'text',
    },
    {
      id: 'lastName',
      botMessage: "Great! What's your last name?",
      type: 'text',
    },
    {
      id: 'dateOfBirth',
      botMessage: 'What is your date of birth?',
      type: 'dob',
    },
    {
      id: 'gender',
      botMessage: 'What is your gender?',
      type: 'dropdown',
      options: ['Male', 'Female', 'Other'],
    },
    {
      id: 'trackMenstruation',
      botMessage: 'Would you like to track your menstrual cycle?',
      type: 'dropdown',
      options: ['Yes', 'No'],
      conditional: (ans) => ans.gender === 'Female',
    },
    {
      id: 'menstruationBleeding',
      botMessage: 'How heavy is the bleeding? (Light, Medium, Heavy)',
      type: 'dropdown',
      options: ['Light', 'Medium', 'Heavy'],
      conditional: (ans) => ans.gender === 'Female' && ans.trackMenstruation === 'Yes',
    },
    {
      id: 'menstruationCramps',
      botMessage: 'Cramp intensity? (None, Mild, Moderate, Severe)',
      type: 'dropdown',
      options: ['None', 'Mild', 'Moderate', 'Severe'],
      conditional: (ans) => ans.gender === 'Female' && ans.trackMenstruation === 'Yes',
    },
    {
      id: 'menstruationMood',
      botMessage: 'Typical mood during cycle?',
      type: 'dropdown',
      options: ['Stable', 'Irritable', 'Sad', 'Anxious', 'Energetic'],
      conditional: (ans) => ans.gender === 'Female' && ans.trackMenstruation === 'Yes',
    },
    {
      id: 'menstruationDates',
      botMessage: 'Last two menstruation dates (comma separated, YYYY-MM-DD)',
      type: 'text',
      conditional: (ans) => ans.gender === 'Female' && ans.trackMenstruation === 'Yes',
    },
    {
      id: 'unitMeasurement',
      botMessage: 'Please provide your height and weight:',
      type: 'unitConverter',
    },
    {
      id: 'ethnicity',
      botMessage: 'What is your ethnicity?',
      type: 'dropdown',
      options: ['Asian', 'Black/African', 'Caucasian', 'Hispanic', 'Other'],
    },
    {
      id: 'goal',
      botMessage: 'Primary health goal?',
      type: 'dropdown',
      options: ['Lose weight', 'Maintain', 'Gain weight', 'Optimize health'],
    },
    {
      id: 'activityLevel',
      botMessage: 'Activity level?',
      type: 'dropdown',
      options: ['Sedentary', 'Light', 'Moderate', 'Active'],
    },
    {
      id: 'waterIntake',
      botMessage: 'Daily water intake (liters)?',
      type: 'dropdown',
      options: ['<1', '1-2', '2-3', '3-4', '4+'],
    },
    {
      id: 'sleep',
      botMessage: 'Average nightly sleep?',
      type: 'dropdown',
      options: ['<5', '5-6', '6-7', '7-8', '8+'],
    },
    {
      id: 'teaCoffee',
      botMessage: 'Do you drink tea/coffee?',
      type: 'dropdown',
      options: ['Yes', 'No'],
    },
    {
      id: 'teaCoffeeCups',
      botMessage: 'How many cups daily?',
      type: 'dropdown',
      options: ['1-2', '3-4', '5+'],
      conditional: (ans) => ans.teaCoffee === 'Yes',
    },
    {
      id: 'foodPreference',
      botMessage: 'Dietary preferences?',
      type: 'dropdown',
      options: ['None', 'Vegetarian', 'Vegan', 'Custom'],
    },
    {
      id: 'customFoodDislikes',
      botMessage: 'List disliked foods (comma separated)',
      type: 'text',
      conditional: (ans) => ans.foodPreference === 'Custom',
    },
    {
      id: 'allergies',
      botMessage: 'Any food allergies?',
      type: 'dropdown',
      options: ['Yes', 'No'],
    },
    {
      id: 'allergyDetails',
      botMessage: 'List allergies (comma separated)',
      type: 'text',
      conditional: (ans) => ans.allergies === 'Yes',
    },
    {
      id: 'bloodWork',
      botMessage: 'Have recent blood work?',
      type: 'dropdown',
      options: ['Yes', 'No'],
    },
    {
      id: 'bloodWorkAll',
      botMessage: 'Please provide blood work details:',
      type: 'multi-bloodwork',
      conditional: (ans) => ans.bloodWork === 'Yes',
    },
    {
      id: 'confirm',
      botMessage: "Review your information:",
      type: 'confirmation',
    },
  ];

  const skipConditionals = (startIndex) => {
    let idx = startIndex;
    while (idx < steps.length) {
      const step = steps[idx];
      if (!step.conditional || step.conditional(answers)) break;
      idx++;
    }
    return idx;
  };

  const handleSend = () => {
    const currentQuestion = steps[currentStep];
    
    // Handle special inputs
    if (currentQuestion.type === 'unitConverter') {
      setAnswers(prev => ({
        ...prev,
        height: tempUnits.system === 'Metric' 
          ? `${tempUnits.height.cm}cm` 
          : `${tempUnits.height.feet}ft ${tempUnits.height.inches}in`,
        weight: tempUnits.system === 'Metric'
          ? `${tempUnits.weight.kg}kg`
          : `${tempUnits.weight.lbs}lbs`
      }));
    }
    
    // Move to next step
    let nextStep = skipConditionals(currentStep + 1);
    
    if (nextStep >= steps.length) {
      setUserData(answers);
      navigate('/confirm');
    } else {
      setCurrentStep(nextStep);
    }
  };

  // Render logic for different input types
  const renderInput = () => {
    const currentQuestion = steps[currentStep];
    
    switch(currentQuestion.type) {
      case 'text':
        return <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />;
      case 'dropdown':
        return (
          <select value={inputValue} onChange={(e) => setInputValue(e.target.value)}>
            {currentQuestion.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'dob':
        return (
          <div className="dob-inputs">
            {/* Date input implementation */}
          </div>
        );
      case 'unitConverter':
        return (
          <div className="unit-converter">
            {/* Height/weight input implementation */}
          </div>
        );
      case 'multi-bloodwork':
        return <BloodWorkForm onSubmit={(data) => {
          setAnswers(prev => ({ ...prev, ...data }));
          handleSend();
        }} />;
      case 'confirmation':
        return <button onClick={() => navigate('/confirm')}>Review Details</button>;
      default:
        return null;
    }
  };

  return (
    <div className="chat-container">
      <div className="bot-message">
        {steps[currentStep]?.botMessage}
      </div>
      <div className="user-input">
        {renderInput()}
        <button onClick={handleSend}>Next</button>
      </div>
    </div>
  );
}

export default ChatOnboarding;