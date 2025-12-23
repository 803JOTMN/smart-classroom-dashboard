import React from 'react';
import { Users, UserCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Progress } from '../ui/progress.jsx';

export default function AttendanceCard({ 
  lecturerName, 
  lecturerPresent, 
  lecturerCheckinTime, 
  studentCount, 
  expectedStudents, 
  sessionStart, 
  sessionEnd 
}) {
  const attendancePercentage = (studentCount / expectedStudents) * 100;
  const absentCount = expectedStudents - studentCount;

  return (
    <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Attendance</CardTitle>
          <div className="p-2 bg-slate-100 rounded-xl">
            <Users className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <UserCheck className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900 text-sm">{lecturerName}</p>
              <p className="text-xs text-slate-500">Lecturer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${lecturerPresent ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span className={`text-sm font-medium ${lecturerPresent ? 'text-emerald-600' : 'text-slate-500'}`}>
              {lecturerPresent ? 'Present' : 'Absent'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 -mt-2">Check-in: {lecturerCheckinTime}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Students Present</span>
            <span className="text-sm font-semibold text-slate-900">{studentCount}/{expectedStudents}</span>
          </div>
          <Progress value={attendancePercentage} className="h-2" />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{attendancePercentage.toFixed(0)}% attendance</span>
            <span>{absentCount} absent</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Session: {sessionStart} - {sessionEnd}</span>
        </div>
      </CardContent>
    </Card>
  );
}