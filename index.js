/**
 * Debugging Guide
 * 1. Make the code more readable
 * 2. Pick up calculation errors
 * 3. Make these calculations robust such that the calculation does not give an incorrect result, it throws an error to the user if something has gone wrong (parameter used with an incorrect unit of measurement, etc)
 */

// Given Parameters
const vel = 10000; // velocity (km/h)
const acc = 3; // acceleration (m/s^2)
const time = 3600; // seconds (1 hour)
const d = 0; // distance (km)
const fuel = 5000; // remaining fuel (kg)
const fbr = 0.5; // fuel burn rate (kg/s)


// Utility function to convert km/h to m/s
const kmhToMs = (velocityKmh) => velocityKmh * (1000 / 3600);

// Utility function to convert m/s to km/h
const msToKmh = (velocityMs) => velocityMs * (3600 / 1000);


// Robust function to calculate new velocity
const calcNewVel = (vel, acc, time) => { 
  if (typeof vel !== 'number' || typeof acc !== 'number' || typeof time !== 'number') {
    throw new Error("All inputs must be numbers.");
  }

  if (vel < 0 || acc < 0 || time < 0) {
    throw new Error("Negative values for velocity, acceleration, or time are not allowed.");
  }

  // Convert velocity from km/h to m/s for the calculation
  const velMs = kmhToMs(vel);

  // Calculate new velocity in m/s
  const newVelMs = velMs + (acc * time);

  // Convert the new velocity back to km/h
  return msToKmh(newVelMs);
};

// Calculate the new distance traveled in kilometers
// Convert time from seconds to hours for correct distance calculation
const timeHours = time / 3600;
const d2 = d + (vel * timeHours); // Corrected calculation

// Calculate the remaining fuel after the time period
const rf = fuel - (fbr * time); // Corrected to subtract the burned fuel

// Calculate the new velocity using the robust function
let vel2;
try {
  vel2 = calcNewVel(vel, acc, time);
} catch (error) {
  console.error("Error in velocity calculation:", error.message);
  vel2 = "Invalid"; // Fallback value in case of error
}

// Output the corrected results
console.log(`Corrected New Velocity: ${vel2 !== "Invalid" ? vel2.toFixed(2) : "N/A"} km/h`);
console.log(`Corrected New Distance: ${d2.toFixed(2)} km`);
console.log(`Corrected Remaining Fuel: ${rf.toFixed(2)} kg`);