import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AlertBanner from '../components/dashboard/AlertBanner';
import EnvironmentalCard from '../components/dashboard/EnvironmentalCard';
import AttendanceCard from '../components/dashboard/AttendanceCard';
import SecurityCard from '../components/dashboard/SecurityCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import QuickActionsCard from '../components/dashboard/QuickActionsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Switch } from '../components/ui/switch.jsx';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

export default function TeacherDashboard() {
  const [alertAcknowledged, setAlertAcknowledged] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(moment().format('h:mm:ss A'));
  const [showSimulator, setShowSimulator] = useState(false);

  const [room, setRoom] = useState({
    room_id: 'Room 301',
    building: 'Engineering Building',
    temperature: 28.5,
    humidity: 62,
    pm25: 45,
    lecturer_name: 'Dr. Sarah Johnson',
    lecturer_present: true,
    lecturer_checkin_time: '10:15 AM',
    student_count: 28,
    expected_students: 32,
    session_start: '10:00 AM',
    session_end: '12:00 PM',
    door_locked: true,
    door_last_action: '10:14 AM',
    alarm_active: false,
    alarm_type: 'fire',
    camera_recording: true,
    camera_count: 2,
    storage_available: 78,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(moment().format('h:mm:ss A'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [activityList, setActivityList] = useState([
    { event_type: 'alert', title: 'High temperature alert triggered', description: '10:42 AM - Room 301' },
    { event_type: 'checkin', title: 'Lecturer checked in successfully', description: '10:15 AM - Dr. Sarah Johnson' },
    { event_type: 'security', title: 'Door secured automatically', description: '10:14 AM - Main entrance' },
    { event_type: 'attendance', title: 'Student attendance updated', description: '10:10 AM - 28 students present' },
  ]);

  const addActivity = (type, title, description) => {
    const newActivity = {
      event_type: type,
      title,
      description: `${moment().format('h:mm A')} - ${description}`
    };
    setActivityList([newActivity, ...activityList.slice(0, 3)]);
  };

  const showAlert = room.temperature > 28 && !alertAcknowledged;

  return (
    <div className="min-h-screen bg-slate-100">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DashboardHeader 
          roomId={room.room_id} 
          building={room.building} 
          lastUpdated={lastUpdated} 
        />

        <AlertBanner 
          show={showAlert}
          temperature={room.temperature}
          triggeredTime="10:42:15 AM"
          roomId={room.room_id}
          onAcknowledge={() => setAlertAcknowledged(true)}
        />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <EnvironmentalCard 
            temperature={room.temperature}
            humidity={room.humidity}
            pm25={room.pm25}
          />
          <AttendanceCard 
            lecturerName={room.lecturer_name}
            lecturerPresent={room.lecturer_present}
            lecturerCheckinTime={room.lecturer_checkin_time}
            studentCount={room.student_count}
            expectedStudents={room.expected_students}
            sessionStart={room.session_start}
            sessionEnd={room.session_end}
          />
          <SecurityCard 
            doorLocked={room.door_locked}
            doorLastAction={room.door_last_action}
            alarmActive={room.alarm_active}
            alarmType={room.alarm_type}
            cameraRecording={room.camera_recording}
            cameraCount={room.camera_count}
            storageAvailable={room.storage_available}
          />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RecentActivityCard activities={activityList} />
          <QuickActionsCard systemOnline={true} />
        </div>

        {/* Simulator Section */}
        <div className="mt-5">
          <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader 
              className="cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => setShowSimulator(!showSimulator)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-xl">
                    <Settings className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900">Data Simulator</CardTitle>
                    <p className="text-sm text-slate-500 mt-0.5">Test dashboard with simulated sensor data</p>
                  </div>
                </div>
                {showSimulator ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </CardHeader>

            {showSimulator && (
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Environmental Controls */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 text-sm mb-3">Environmental Sensors</h3>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        Temperature (°C): {room.temperature}
                      </label>
                      <Input
                        type="number"
                        value={room.temperature}
                        onChange={(e) => setRoom({...room, temperature: Number(e.target.value)})}
                        className="mb-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        Humidity (%): {room.humidity}
                      </label>
                      <Input
                        type="number"
                        value={room.humidity}
                        onChange={(e) => setRoom({...room, humidity: Number(e.target.value)})}
                        className="mb-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        PM2.5 (μg/m³): {room.pm25}
                      </label>
                      <Input
                        type="number"
                        value={room.pm25}
                        onChange={(e) => setRoom({...room, pm25: Number(e.target.value)})}
                        className="mb-1"
                      />
                    </div>
                  </div>

                  {/* Attendance Controls */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 text-sm mb-3">Attendance</h3>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs font-medium text-slate-700">Lecturer Present</span>
                      <Switch
                        checked={room.lecturer_present}
                        onCheckedChange={(checked) => setRoom({...room, lecturer_present: checked})}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        Student Count: {room.student_count}
                      </label>
                      <Input
                        type="number"
                        value={room.student_count}
                        onChange={(e) => setRoom({...room, student_count: Number(e.target.value)})}
                        className="mb-1"
                      />
                    </div>
                  </div>

                  {/* Security Controls */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 text-sm mb-3">Security Status</h3>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs font-medium text-slate-700">Door Locked</span>
                      <Switch
                        checked={room.door_locked}
                        onCheckedChange={(checked) => setRoom({...room, door_locked: checked})}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-xs font-medium text-slate-700">Alarm Active</span>
                        <Switch
                          checked={room.alarm_active}
                          onCheckedChange={(checked) => {
                            const newDoorState = checked ? (room.alarm_type === 'fire' ? false : true) : room.door_locked;
                            setRoom({...room, alarm_active: checked, door_locked: newDoorState});
                          }}
                        />
                      </div>
                      {room.alarm_active && (
                        <div className="flex gap-2 ml-3">
                          <Button
                            size="sm"
                            variant={room.alarm_type === 'fire' ? 'default' : 'outline'}
                            onClick={() => setRoom({...room, alarm_type: 'fire', door_locked: false})}
                            className="text-xs"
                          >
                            🔥 Fire
                          </Button>
                          <Button
                            size="sm"
                            variant={room.alarm_type === 'intrusion' ? 'default' : 'outline'}
                            onClick={() => setRoom({...room, alarm_type: 'intrusion', door_locked: true})}
                            className="text-xs"
                          >
                            🚨 Intrusion
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs font-medium text-slate-700">Camera Recording</span>
                      <Switch
                        checked={room.camera_recording}
                        onCheckedChange={(checked) => setRoom({...room, camera_recording: checked})}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Scenarios */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-900 text-sm mb-3">Quick Scenarios</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => {
                        setRoom({...room, temperature: 32});
                        setAlertAcknowledged(false);
                        addActivity('alert', 'High temperature alert triggered', 'Room 301');
                      }}
                      variant="destructive"
                      size="sm"
                    >
                      🔥 High Temp (32°C)
                    </Button>
                    <Button
                      onClick={() => {
                        setRoom({...room, student_count: 32});
                        addActivity('attendance', 'Student attendance updated', '32 students present');
                      }}
                      variant="outline"
                      size="sm"
                    >
                      👥 Full Class
                    </Button>
                    <Button
                      onClick={() => {
                        setRoom({...room, door_locked: false, alarm_active: true, alarm_type: 'fire'});
                        addActivity('security', 'Fire alarm activated', 'Door unlocked for evacuation');
                        toast.error('🔥 Fire Alarm Activated');
                      }}
                      variant="outline"
                      size="sm"
                    >
                      🔥 Fire Alarm
                    </Button>
                    <Button
                      onClick={() => {
                        setRoom({...room, door_locked: true, alarm_active: true, alarm_type: 'intrusion'});
                        addActivity('security', 'Intrusion detected', 'Door locked, authorities notified');
                        toast.error('🚨 Intrusion Alert');
                      }}
                      variant="outline"
                      size="sm"
                    >
                      🚨 Intrusion Alert
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}