# RockRate Pro 🪨

**Advanced Geotechnical Analysis Suite for Underground Mining**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)

## 🚀 Overview

**RockRate Pro** is a dual-engine geotechnical analysis tool designed to streamline the rock mass classification process for mining engineers. Unlike traditional Excel sheets or manual lookup tables, RockRate Pro provides **real-time, reactive calculations** for RMR (Bieniawski '89) and Q-System (Barton et al.), instantly visualizing support requirements and failure modes.

**Live Demo:** [Insert your Vercel Link Here]

## ✨ Key Features

- **🧮 Dual-Engine Calculation:** Simultaneously computes **RMR (Rock Mass Rating)** and **Q-Value** based on shared input parameters (e.g., RQD).
- **📉 Dynamic Support Design:** Automatically recommends **Rock Bolt Length**, **Spacing**, and **Shotcrete Thickness** based on Tunnel Span and Rock Quality (using Barton's empirical formulas).
- **📊 Interactive Visualization:**
  - Real-time **GSI (Geological Strength Index)** gauge for Hoek-Brown analysis.
  - **Parameter Contribution Charts** (built with Recharts) to identify critical rock mass weaknesses.
  - **Stand-up Time Estimation** graph.
- **⚡ Reactive UI:** Built with **Zustand** for global state management, ensuring that a change in one parameter (e.g., Groundwater) instantly updates all safety factors and design outputs without page reloads.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **State Management:** Zustand
- **Styling:** Tailwind CSS + shadcn/ui
- **Visualization:** Recharts
- **Icons:** Lucide React
- **Deployment:** Vercel

## 🏗️ Engineering Logic

This application implements industry-standard empirical formulations:

### 1. Rock Mass Rating (RMR89)
Calculates the summation of 5 parameters + adjustment:
$$RMR = A1 + A2 + A3 + A4 + A5 + B$$
*Where A1=Strength, A2=RQD, A3=Spacing, A4=Condition, A5=Water, B=Orientation Adjustment.*

### 2. Q-System (NGI)
Calculates rock mass quality for tunneling support:
$$Q = \frac{RQD}{J_n} \times \frac{J_r}{J_a} \times \frac{J_w}{SRF}$$
*Where $J_n$=Joint Set Number, $J_r$=Roughness, $J_a$=Alteration, $J_w$=Water Reduction, $SRF$=Stress Reduction Factor.*

### 3. Support Design Formulas
- **Bolt Length ($L$):** $L = 2 + (0.15 \times Span) / ESR$
- **Stand-up Time:** Derived from RMR using Bieniawski's 1989 correlation curves.

## 📦 Local Installation

To run this project locally:

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/ayush-anshuman-supakar/rockrate-pro.git](https://github.com/ayush-anshuman-supakar/rockrate-pro.git)
   cd rockrate-pro

   Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

👤 Author
Ayush Anshuman Supakar
Mining Engineer & Full Stack Developer

LinkedIn

GitHub

Portfolio

Built with ❤️ for the Mining Industry.


### 