export function calculateBMI(user) {
    if (!user.height || !user.weight) return null;
    
    // Extract numerical values
    const heightMatch = user.height.match(/(\d+\.?\d*)/);
    const weightMatch = user.weight.match(/(\d+\.?\d*)/);
    
    if (!heightMatch || !weightMatch) return null;
    
    let height = parseFloat(heightMatch[1]);
    let weight = parseFloat(weightMatch[1]);
  
    // Convert imperial to metric if needed
    if (user.unitSystem === 'Imperial') {
      // Convert feet/inches to meters
      const totalInches = height * 12; // If using feet format
      height = totalInches * 0.0254;
      // Convert lbs to kg
      weight = weight * 0.453592;
    } else {
      height = height / 100; // Convert cm to meters
    }
  
    return (weight / (height * height)).toFixed(1);
  }