import React from 'react';
import { Shield, Lock, Bell, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';

export default function SecurityCard({ 
  doorLocked, 
  doorLastAction, 
  alarmActive,
  alarmType = 'fire',
  cameraRecording, 
  cameraCount,
  storageAvailable 
}) {
  return (
    <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Security Status</CardTitle>
          <div className="p-2 bg-slate-100 rounded-xl">
            <Shield className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Lock className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900 text-sm">Door Lock</p>
              <p className="text-xs text-slate-500">Main entrance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${doorLocked ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className={`text-sm font-medium ${doorLocked ? 'text-emerald-600' : 'text-amber-600'}`}>
              {doorLocked ? 'Secured' : 'Unlocked'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 -mt-2 pl-11">Last action: {doorLastAction}</p>

        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Bell className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900 text-sm">Alarm System</p>
              <p className="text-xs text-slate-500">
                {alarmActive ? (alarmType === 'fire' ? '🔥 Fire alarm' : '🚨 Intrusion detected') : 'Fire & intrusion'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${alarmActive ? 'bg-red-500' : 'bg-slate-300'}`} />
            <span className={`text-sm font-medium ${alarmActive ? 'text-red-600' : 'text-slate-500'}`}>
              {alarmActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 -mt-2 pl-11">Status: Normal</p>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Video className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900 text-sm">Camera Feed</p>
              <p className="text-xs text-slate-500">{cameraCount} cameras active</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${cameraRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
            <span className={`text-sm font-medium ${cameraRecording ? 'text-red-600' : 'text-slate-500'}`}>
              {cameraRecording ? 'Recording' : 'Offline'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 -mt-2 pl-11">Storage: {storageAvailable}% available</p>
      </CardContent>
    </Card>
  );
}