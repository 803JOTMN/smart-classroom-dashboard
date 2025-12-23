import React from 'react';
import { Thermometer, Droplets, Wind, Lightbulb, AirVent, Maximize2, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Progress } from '../ui/progress.jsx';

export default function EnvironmentalCard({ temperature, humidity, pm25, lightsOn, acOn, windowsOpen, sprinklerActive, alarmActive }) {
  const tempStatus = temperature >= 50 ? 'Critical' : temperature >= 35 ? 'Very High' : temperature > 28 ? 'High' : temperature < 20 ? 'Low' : 'Normal';
  const tempColor = temperature >= 50 ? 'bg-red-600' : temperature >= 35 ? 'bg-orange-500' : temperature > 28 ? 'bg-yellow-500' : 'bg-green-500';
  const tempProgress = Math.min((temperature / 60) * 100, 100);
  
  const humidityStatus = humidity >= 80 ? 'Very High' : humidity > 70 ? 'High' : humidity < 20 ? 'Very Low' : humidity < 30 ? 'Low' : 'Normal';
  const humidityColor = humidity >= 80 ? 'bg-red-500' : humidity > 70 ? 'bg-yellow-500' : humidity < 20 ? 'bg-red-500' : humidity < 30 ? 'bg-orange-500' : 'bg-green-500';
  const humidityProgress = humidity;
  
  const pm25Status = pm25 > 50 ? 'Poor' : pm25 > 25 ? 'Moderate' : 'Good';
  const pm25Progress = (pm25 / 100) * 100;

  return (
    <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Environment</CardTitle>
          <div className="p-2 bg-slate-100 rounded-xl">
            <Thermometer className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Temperature</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{temperature}°C</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all ${tempColor}`}
              style={{ transform: `translateX(-${100 - tempProgress}%)` }}
            />
          </div>
          <p className="text-xs text-slate-500">Status: {tempStatus}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Humidity</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{humidity}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all ${humidityColor}`}
              style={{ transform: `translateX(-${100 - humidityProgress}%)` }}
            />
          </div>
          <p className="text-xs text-slate-500">Status: {humidityStatus}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Air Quality (PM2.5)</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{pm25} μg/m³</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all ${pm25 > 50 ? 'bg-red-500' : pm25 > 25 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ transform: `translateX(-${100 - pm25Progress}%)` }}
            />
          </div>
          <p className="text-xs text-slate-500">Status: {pm25Status}</p>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl border-2 transition-all text-center ${lightsOn ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-50 border-slate-200'}`}>
              <Lightbulb className={`w-5 h-5 mb-2 mx-auto ${lightsOn ? 'text-yellow-600' : 'text-slate-400'}`} />
              <p className="text-xs font-medium text-slate-700 mb-1">Lights</p>
              <div className="flex items-center justify-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${lightsOn ? 'bg-green-500' : 'bg-red-500'}`} />
                <p className={`text-xs font-bold ${lightsOn ? 'text-yellow-700' : 'text-slate-500'}`}>
                  {lightsOn ? 'ON' : 'OFF'}
                </p>
              </div>
            </div>
            <div className={`p-3 rounded-xl border-2 transition-all text-center ${acOn ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
              <AirVent className={`w-5 h-5 mb-2 mx-auto ${acOn ? 'text-blue-600' : 'text-slate-400'}`} />
              <p className="text-xs font-medium text-slate-700 mb-1">A/C</p>
              <div className="flex items-center justify-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${acOn ? 'bg-green-500' : 'bg-red-500'}`} />
                <p className={`text-xs font-bold ${acOn ? 'text-blue-700' : 'text-slate-500'}`}>
                  {acOn ? 'ON' : 'OFF'}
                </p>
              </div>
            </div>
            <div className={`p-3 rounded-xl border-2 transition-all text-center ${windowsOpen ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
              <Maximize2 className={`w-5 h-5 mb-2 mx-auto ${windowsOpen ? 'text-green-600' : 'text-slate-400'}`} />
              <p className="text-xs font-medium text-slate-700 mb-1">Windows</p>
              <div className="flex items-center justify-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${windowsOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                <p className={`text-xs font-bold ${windowsOpen ? 'text-green-700' : 'text-slate-500'}`}>
                  {windowsOpen ? 'OPEN' : 'CLOSED'}
                </p>
              </div>
            </div>
            <div className={`p-3 rounded-xl border-2 transition-all text-center ${sprinklerActive ? 'bg-cyan-50 border-cyan-200' : 'bg-slate-50 border-slate-200'}`}>
              <Droplets className={`w-5 h-5 mb-2 mx-auto ${sprinklerActive ? 'text-cyan-600' : 'text-slate-400'}`} />
              <p className="text-xs font-medium text-slate-700 mb-1">Sprinkler</p>
              <div className="flex items-center justify-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${sprinklerActive ? 'bg-green-500' : 'bg-red-500'}`} />
                <p className={`text-xs font-bold ${sprinklerActive ? 'text-cyan-700' : 'text-slate-500'}`}>
                  {sprinklerActive ? 'ACTIVE' : 'OFF'}
                </p>
              </div>
            </div>
            <div className={`p-3 rounded-xl border-2 transition-all text-center ${alarmActive ? 'bg-red-50 border-red-200 animate-pulse' : 'bg-slate-50 border-slate-200'}`}>
              <Bell className={`w-5 h-5 mb-2 mx-auto ${alarmActive ? 'text-red-600' : 'text-slate-400'}`} />
              <p className="text-xs font-medium text-slate-700 mb-1">Alarm</p>
              <div className="flex items-center justify-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${alarmActive ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                <p className={`text-xs font-bold ${alarmActive ? 'text-red-700' : 'text-slate-500'}`}>
                  {alarmActive ? 'ACTIVE' : 'OFF'}
                </p>
              </div>
            </div>
            </div>
            </div>
      </CardContent>
    </Card>
  );
}