// components/dashboard/InputPanel.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRockStore } from "@/store/useRockStore";
import {
  RMR_STRENGTH,
  RMR_SPACING,
  RMR_CONDITION,
  RMR_WATER,
  RMR_ORIENTATION,
  Q_JN,
  Q_JR,
  Q_JA,
  Q_JW,
  Q_SRF
} from "@/lib/mining/constants";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function InputPanel() {
  const store = useRockStore();
  const { inputs } = store;

  return (
    <Card className="h-full border-r rounded-none shadow-none overflow-y-auto">
      <CardHeader className="pb-4">
  <div className="flex items-center gap-3 mb-2">
    <div className="relative w-10 h-10">
      {/* Ensure logo.png is in your 'public' folder */}
      <Image 
        src="/logo.png" 
        alt="RockRate Pro Logo" 
        fill 
        className="object-contain"
      />
    </div>
    <CardTitle className="text-xl font-bold text-slate-900">
      RockRate<span className="text-orange-600">Pro</span>
    </CardTitle>
  </div>
  <CardDescription>
    Advanced Geotechnical Analysis Suite
  </CardDescription>
</CardHeader>
      <CardContent className="space-y-6">
        
        <Tabs defaultValue="rmr" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rmr">RMR (89)</TabsTrigger>
            <TabsTrigger value="qsystem">Q-System</TabsTrigger>
          </TabsList>

          {/* === RMR TAB === */}
          <TabsContent value="rmr" className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label>A1. Strength (UCS)</Label>
              <Select onValueChange={(v) => store.setStrength(Number(v))} defaultValue={String(inputs.strength)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {RMR_STRENGTH.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>A2. RQD (%)</Label>
                <span className="font-bold text-blue-600">{inputs.rqd}%</span>
              </div>
              <Slider defaultValue={[inputs.rqd]} max={100} step={1} onValueChange={(v) => store.setRQD(v[0])} />
            </div>

            <div className="space-y-2">
              <Label>A3. Spacing</Label>
              <Select onValueChange={(v) => store.setSpacing(Number(v))} defaultValue={String(inputs.spacing)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {RMR_SPACING.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>A4. Condition</Label>
              <Select onValueChange={(v) => store.setCondition(Number(v))} defaultValue={String(inputs.condition)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {RMR_CONDITION.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>A5. Groundwater</Label>
              <Select onValueChange={(v) => store.setWater(Number(v))} defaultValue={String(inputs.water)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {RMR_WATER.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-red-600">B. Orientation Adj.</Label>
              <Select onValueChange={(v) => store.setOrientation(Number(v))} defaultValue={String(inputs.orientation)}>
                <SelectTrigger className="border-red-200"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {RMR_ORIENTATION.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* === Q-SYSTEM TAB (NEW) === */}
          <TabsContent value="qsystem" className="space-y-5 mt-4">
            
            <div className="p-3 bg-blue-50 rounded text-xs text-blue-700 mb-4">
              Note: RQD is shared between RMR and Q-System. Change it in the RMR tab.
            </div>

            <div className="space-y-2">
              <Label>Jn (Joint Set Number)</Label>
              <Select onValueChange={(v) => store.setJn(Number(v))} defaultValue={String(inputs.jn)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Q_JN.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label} ({i.value})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Jr (Joint Roughness)</Label>
              <Select onValueChange={(v) => store.setJr(Number(v))} defaultValue={String(inputs.jr)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Q_JR.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label} ({i.value})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ja (Joint Alteration)</Label>
              <Select onValueChange={(v) => store.setJa(Number(v))} defaultValue={String(inputs.ja)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Q_JA.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label} ({i.value})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Jw (Joint Water Reduction)</Label>
              <Select onValueChange={(v) => store.setJw(Number(v))} defaultValue={String(inputs.jw)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Q_JW.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label} ({i.value})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>SRF (Stress Reduction Factor)</Label>
              <Select onValueChange={(v) => store.setSrf(Number(v))} defaultValue={String(inputs.srf)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Q_SRF.map((i, idx) => <SelectItem key={idx} value={String(i.value)}>{i.label} ({i.value})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

          </TabsContent>
        </Tabs>

       

<div className="mt-8 pt-6 border-t border-slate-100">
  <div className="space-y-3">
    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Developer
    </h4>

    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
        AS
      </div>
      <div className="text-sm">
        <p className="font-medium text-slate-900">Ayush Supakar</p>
        <p className="text-xs text-slate-500">Mining Engineer & Dev</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" size="sm" className="w-full text-xs" asChild>
        <a href="https://www.linkedin.com/in/ayush-anshuman-supakar-4b71681b8/" target="_blank" rel="noreferrer">
          <Linkedin className="mr-2 h-3 w-3" />
          LinkedIn
        </a>
      </Button>
      <Button variant="outline" size="sm" className="w-full text-xs" asChild>
        <a href="https://github.com/AyushSupakar" target="_blank" rel="noreferrer">
          <Github className="mr-2 h-3 w-3" />
          GitHub
        </a>
      </Button>
    </div>

    <Button variant="ghost" size="sm" className="w-full text-xs text-slate-500" asChild>
      <a href="https://www.ayushsupakar.in" target="_blank" rel="noreferrer">
        <ExternalLink className="mr-2 h-3 w-3" />
        Portfolio Website
      </a>
    </Button>
  </div>
</div>
      </CardContent>
    </Card>
  );
}