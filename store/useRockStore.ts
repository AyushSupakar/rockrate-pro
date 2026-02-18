// store/useRockStore.ts
import { create } from 'zustand';
import { calculateRMR, calculateRQDPoints, calculateQ } from '@/lib/mining/formulas';

// 1. Define the Shape of the Store (Interface)
interface RockState {
  inputs: {
    // RMR Inputs
    strength: number;
    rqd: number;
    spacing: number;
    condition: number;
    water: number;
    orientation: number;
    // Q-System Inputs
    jn: number;
    jr: number;
    ja: number;
    jw: number;
    srf: number;
  };

  results: {
    rmrScore: number;
    rqdPoints: number;
    qValue: number;
    gsi: number;
  };

  // Actions (Setters)
  setStrength: (val: number) => void;
  setRQD: (val: number) => void;
  setSpacing: (val: number) => void;
  setCondition: (val: number) => void;
  setWater: (val: number) => void;
  setOrientation: (val: number) => void;

  // Q Setters
  setJn: (val: number) => void;
  setJr: (val: number) => void;
  setJa: (val: number) => void;
  setJw: (val: number) => void;
  setSrf: (val: number) => void;

  // INTERNAL HELPER (This was missing in the interface!)
  recalc: (newInputs: RockState['inputs']) => Partial<RockState>;
}

// 2. The Implementation
export const useRockStore = create<RockState>((set, get) => ({
  inputs: {
    strength: 15,
    rqd: 95,
    spacing: 20,
    condition: 30,
    water: 15,
    orientation: 0,
    jn: 2,
    jr: 3,
    ja: 1.0,
    jw: 1.0,
    srf: 1.0
  },

  results: {
    rmrScore: 80,
    rqdPoints: 20,
    qValue: 10,
    gsi: 75
  },

  // The Helper Logic
  recalc: (newInputs) => {
    // Convert RQD % to Points (0-20) for RMR
    const rqdPoints = calculateRQDPoints(newInputs.rqd);
    
    // 1. Calculate RMR
    const rmr = calculateRMR(
      newInputs.strength, 
      rqdPoints, 
      newInputs.spacing, 
      newInputs.condition, 
      newInputs.water, 
      newInputs.orientation
    );

    // 2. Calculate Q
    const q = calculateQ(
      newInputs.rqd, // Use raw % for Q
      newInputs.jn,
      newInputs.jr,
      newInputs.ja,
      newInputs.jw,
      newInputs.srf
    );

    // 3. Calculate GSI (Approx RMR - 5)
    const gsi = rmr > 23 ? rmr - 5 : rmr;

    return { inputs: newInputs, results: { rmrScore: rmr, rqdPoints, qValue: q, gsi } };
  },

  // The Actions (Now calling the helper correctly)
  setStrength: (val) => set((state) => state.recalc({ ...state.inputs, strength: val })),
  setRQD: (val) => set((state) => state.recalc({ ...state.inputs, rqd: val })),
  setSpacing: (val) => set((state) => state.recalc({ ...state.inputs, spacing: val })),
  setCondition: (val) => set((state) => state.recalc({ ...state.inputs, condition: val })),
  setWater: (val) => set((state) => state.recalc({ ...state.inputs, water: val })),
  setOrientation: (val) => set((state) => state.recalc({ ...state.inputs, orientation: val })),
  
  setJn: (val) => set((state) => state.recalc({ ...state.inputs, jn: val })),
  setJr: (val) => set((state) => state.recalc({ ...state.inputs, jr: val })),
  setJa: (val) => set((state) => state.recalc({ ...state.inputs, ja: val })),
  setJw: (val) => set((state) => state.recalc({ ...state.inputs, jw: val })),
  setSrf: (val) => set((state) => state.recalc({ ...state.inputs, srf: val })),
}));