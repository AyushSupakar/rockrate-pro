// lib/mining/constants.ts

export type MiningParameter = {
  label: string;
  value: number;
  description?: string;
};

// A1: Strength of Intact Rock Material
export const RMR_STRENGTH: MiningParameter[] = [
  { label: "> 250 MPa", value: 15, description: "Extremely Strong" },
  { label: "100 - 250 MPa", value: 12, description: "Very Strong" },
  { label: "50 - 100 MPa", value: 7, description: "Strong" },
  { label: "25 - 50 MPa", value: 4, description: "Average" },
  { label: "5 - 25 MPa", value: 2, description: "Weak" },
  { label: "< 5 MPa", value: 0, description: "Very Weak" },
];

// A2: RQD (Rock Quality Designation)
// We will use a formula for exact calculation, but these are ranges for reference
export const RMR_RQD_RANGES = [
  { min: 90, max: 100, points: 20 },
  { min: 75, max: 90, points: 17 },
  { min: 50, max: 75, points: 13 },
  { min: 25, max: 50, points: 8 },
  { min: 0, max: 25, points: 3 },
];

// A3: Spacing of Discontinuities
export const RMR_SPACING: MiningParameter[] = [
  { label: "> 2 m", value: 20, description: "Very Wide" },
  { label: "0.6 - 2 m", value: 15, description: "Wide" },
  { label: "200 - 600 mm", value: 10, description: "Moderate" },
  { label: "60 - 200 mm", value: 8, description: "Close" },
  { label: "< 60 mm", value: 5, description: "Very Close" },
];

// A4: Condition of Discontinuities
export const RMR_CONDITION: MiningParameter[] = [
  { label: "Very Rough, Not Continuous", value: 30, description: "No separation, unweathered wall" },
  { label: "Slightly Rough", value: 25, description: "Separation < 1mm, slightly weathered" },
  { label: "Slightly Rough (Soft)", value: 20, description: "Separation < 1mm, highly weathered" },
  { label: "Slickensided / Gouge < 5mm", value: 10, description: "Separation 1-5mm, continuous" },
  { label: "Soft Gouge > 5mm", value: 0, description: "Separation > 5mm, continuous" },
];

// A5: Groundwater
export const RMR_WATER: MiningParameter[] = [
  { label: "Completely Dry", value: 15 },
  { label: "Damp", value: 10 },
  { label: "Wet", value: 7 },
  { label: "Dripping", value: 4 },
  { label: "Flowing", value: 0 },
];

// B: Adjustment for Joint Orientation (Tunneling)
export const RMR_ORIENTATION: MiningParameter[] = [
  { label: "Very Favorable", value: 0 },
  { label: "Favorable", value: -2 },
  { label: "Fair", value: -5 },
  { label: "Unfavorable", value: -10 },
  { label: "Very Unfavorable", value: -12 },
];

// lib/mining/constants.ts (APPEND TO BOTTOM)

// --- Q-SYSTEM PARAMETERS (Barton et al.) ---

// Jn: Joint Set Number
export const Q_JN: MiningParameter[] = [
  { label: "Massive, no or few joints", value: 0.5 },
  { label: "One joint set", value: 2 },
  { label: "One joint set + random", value: 3 },
  { label: "Two joint sets", value: 4 },
  { label: "Two joint sets + random", value: 6 },
  { label: "Three joint sets", value: 9 },
  { label: "Three joint sets + random", value: 12 },
  { label: "Four or more joint sets", value: 15 },
  { label: "Crushed rock, earthlike", value: 20 },
];

// Jr: Joint Roughness Number
export const Q_JR: MiningParameter[] = [
  { label: "Discontinuous joints", value: 4 },
  { label: "Rough or irregular, undulating", value: 3 },
  { label: "Smooth, undulating", value: 2 },
  { label: "Slickensided, undulating", value: 1.5 },
  { label: "Rough or irregular, planar", value: 1.5 },
  { label: "Smooth, planar", value: 1.0 },
  { label: "Slickensided, planar", value: 0.5 },
];

// Ja: Joint Alteration Number
export const Q_JA: MiningParameter[] = [
  { label: "Unaltered joint walls", value: 0.75 },
  { label: "Slightly altered walls", value: 1.0 },
  { label: "Silty or sandy coatings", value: 3.0 },
  { label: "Clay coatings", value: 4.0 },
];

// Jw: Joint Water Reduction Factor
export const Q_JW: MiningParameter[] = [
  { label: "Dry excavation", value: 1.0 },
  { label: "Medium inflow", value: 0.66 },
  { label: "Large inflow", value: 0.5 },
  { label: "High pressure inflow", value: 0.33 },
];

// SRF: Stress Reduction Factor
export const Q_SRF: MiningParameter[] = [
  { label: "Moderate stress", value: 1.0 },
  { label: "Low stress (near surface)", value: 2.5 },
  { label: "High stress (mild squeezing)", value: 5.0 },
  { label: "Heavy squeezing", value: 10.0 },
  { label: "Mild rock burst", value: 5.0 },
  { label: "Heavy rock burst", value: 20.0 },
];