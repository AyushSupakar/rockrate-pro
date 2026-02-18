// components/dashboard/ResultPanel.tsx
"use client";

import React, { useState } from "react";
import { useRockStore } from "@/store/useRockStore";
import { getRockClass, calculateStandUpTime } from "@/lib/mining/formulas";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Anchor, Activity, Layers } from "lucide-react";

export function ResultPanel() {
  const { results, inputs } = useRockStore();
  const rockClass = getRockClass(results.rmrScore);
  
  const [span, setSpan] = useState<number>(5);

  const boltLength = (2 + (0.15 * span) / 1.0).toFixed(2);
  const standUpHours = calculateStandUpTime(results.rmrScore).toFixed(1);
  
  // Q-System Support Logic (Simplified NGI chart)
  const getSupportSuggestion = (q: number) => {
    if (q < 0.1) return "Cast Concrete Liner (Severe Squeezing)";
    if (q < 1) return "Systematic Bolting + 100mm Fibercrete";
    if (q < 4) return "Pattern Bolting + 50mm Shotcrete";
    if (q < 10) return "Spot Bolting + 50mm Shotcrete (if needed)";
    if (q < 40) return "Spot Bolting";
    return "Unsupported / Minimal Scaling";
  };

  const supportText = getSupportSuggestion(results.qValue);

  const data = [
    { name: "Strength", value: inputs.strength, full: 15 },
    { name: "RQD", value: results.rqdPoints, full: 20 },
    { name: "Spacing", value: inputs.spacing, full: 20 },
    { name: "Condition", value: inputs.condition, full: 30 },
    { name: "Water", value: inputs.water, full: 15 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* 1. PRIMARY SCORES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* RMR CARD */}
        <Card className={`border-l-4 ${rockClass.color.replace("bg-", "border-")}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">RMR (Bieniawski)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold tracking-tight">
              {results.rmrScore.toFixed(0)}
            </div>
            <Badge className={`mt-2 ${rockClass.color} hover:${rockClass.color}`}>
              Class {rockClass.class}
            </Badge>
          </CardContent>
        </Card>

        {/* Q-SYSTEM CARD */}
        <Card className="border-l-4 border-slate-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Q-Value (Barton)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold tracking-tight text-slate-800">
              {results.qValue}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {results.qValue < 1 ? "Very Poor" : results.qValue > 10 ? "Good" : "Fair"} Rock
            </p>
          </CardContent>
        </Card>

        {/* GSI CARD */}
        <Card className="border-l-4 border-indigo-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">GSI (Hoek)</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold tracking-tight text-indigo-700">
              {results.gsi.toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Hoek-Brown Criterion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. TUNNEL DESIGN & SUPPORT */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Anchor className="h-5 w-5" />
            Support Design Guidelines
          </CardTitle>
          <CardDescription>
            Based on Q-Value ({results.qValue}) and Tunnel Span.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Tunnel Span (Width)</span>
              <span className="font-bold text-blue-600">{span} meters</span>
            </div>
            <Slider defaultValue={[5]} max={20} step={0.5} onValueChange={(v) => setSpan(v[0])} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold text-sm mb-1 text-slate-700">Rec. Bolt Length</h4>
              <p className="text-2xl font-bold text-slate-900">{boltLength} m</p>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold text-sm mb-1 text-slate-700">Support Strategy (Q-System)</h4>
              <p className="text-sm font-medium text-slate-800">
                {supportText}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. CHART */}
      <Card className="h-[300px]">
        <CardHeader className="pb-0">
          <CardTitle>RMR Parameter Contribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[220px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={70} tick={{fontSize: 12}} axisLine={false}/>
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value < (entry.full * 0.5) ? '#ef4444' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}