// lib/mining/formulas.ts
import { RMR_RQD_RANGES } from "./constants";

// 1. Calculate RQD Points based on Percentage
export const calculateRQDPoints = (rqdPercentage: number): number => {
  // Find the range that includes the current RQD percentage
  const range = RMR_RQD_RANGES.find(
    (r) => rqdPercentage >= r.min && rqdPercentage <= r.max
  );
  return range ? range.points : 3; // Default to lowest if something goes wrong
};

// 2. Calculate Total RMR
export const calculateRMR = (
  strength: number, // A1
  rqdPoints: number, // A2 (We pass the points, not the raw %)
  spacing: number, // A3
  condition: number, // A4
  water: number, // A5
  orientation: number // B
): number => {
  // Simple summation for RMR 89
  let score = strength + rqdPoints + spacing + condition + water + orientation;
  
  // RMR cannot be negative or > 100 effectively (though theoretically possible)
  return Math.max(0, Math.min(100, score));
};

// 3. Get Rock Class (I to V)
export const getRockClass = (rmr: number): { class: string; description: string; color: string } => {
  if (rmr >= 81) return { class: "I", description: "Very Good Rock", color: "bg-green-500" };
  if (rmr >= 61) return { class: "II", description: "Good Rock", color: "bg-blue-500" };
  if (rmr >= 41) return { class: "III", description: "Fair Rock", color: "bg-yellow-500" };
  if (rmr >= 21) return { class: "IV", description: "Poor Rock", color: "bg-orange-500" };
  return { class: "V", description: "Very Poor Rock", color: "bg-red-500" };
};

// 4. Calculate Stand-up Time (in Hours)
// Formula: Log(Time) = (RMR - 50) / roughly linear correlation
// Used for the graph later.
export const calculateStandUpTime = (rmr: number): number => {
    // This is an approximation for the chart
    // RMR 60 ~ 1000 hours
    // RMR 40 ~ 10 hours
    // Base formula log10(T) ≈ (RMR - 25) / 5 (Simplified)
    return Math.pow(10, (rmr - 25) / 5); 
};

// lib/mining/formulas.ts (ADD THIS FUNCTION)

export const calculateQ = (
  rqd: number, // Use raw RQD % here (e.g. 90)
  jn: number,
  jr: number,
  ja: number,
  jw: number,
  srf: number
): number => {
  // Prevent division by zero
  const safeJn = jn === 0 ? 0.1 : jn;
  const safeJa = ja === 0 ? 0.1 : ja;
  const safeSrf = srf === 0 ? 0.1 : srf;

  const blockSize = rqd / safeJn;
  const shearStrength = jr / safeJa;
  const activeStress = jw / safeSrf;

  return parseFloat((blockSize * shearStrength * activeStress).toFixed(3));
};