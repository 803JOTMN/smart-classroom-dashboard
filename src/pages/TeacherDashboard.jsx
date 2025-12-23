import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import AlertBanner from '../components/dashboard/AlertBanner';
import EnvironmentalCard from '../components/dashboard/EnvironmentalCard';
import AttendanceCard from '../components/dashboard/AttendanceCard';
import SecurityCard from '../components/dashboard/SecurityCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Switch } from '../components/ui/switch.jsx';
import { Settings, CheckCircle2, AlertTriangle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

export default function TeacherDashboard() {
  const [alertAcknowledged, setAlertAcknowledged] = useState(false);
  const [sessionStartedBanner, setSessionStartedBanner] = useState(false);
  const [hotWeatherBanner, setHotWeatherBanner] = useState(false);
  const [freezingBanner, setFreezingBanner] = useState(false);
  const [normalizedBanner, setNormalizedBanner] = useState(false);
  const [fireAlarmBanner, setFireAlarmBanner] = useState(false);
  const [intrusionAlarmBanner, setIntrusionAlarmBanner] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(moment().format('h:mm:ss A'));
  const [mqttConnected, setMqttConnected] = useState(true);
  const [simulationRunning, setSimulationRunning] = useState(false);

  const [room, setRoom] = useState({
    room_id: 'Room 301',
    building: 'Engineering Building',
    temperature: 24,
    humidity: 50,
    pm25: 15,
    lecturer_name: 'Dr. Sarah Johnson',
    lecturer_present: false,
    lecturer_checkin_time: '',
    student_count: 0,
    expected_students: 32,
    session_start: '7:00 PM',
    session_end: '9:00 PM',
    door_locked: true,
    door_last_action: '10:14 AM',
    alarm_active: false,
    alarm_type: 'fire',
    sprinkler_active: false,
    camera_recording: true,
    camera_count: 2,
    storage_available: 78,
    lights_on: false,
    ac_on: false,
    windows_open: false,
  });

  const [activityList, setActivityList] = useState([]);



  const updateRoomData = (updates) => {
    setRoom(prev => ({ ...prev, ...updates }));
    setLastUpdated(moment().format('h:mm:ss A'));
    toast.success('Data updated');
  };

  const addActivityLog = (activity) => {
    setActivityList(prev => [
      {
        ...activity,
        timestamp: moment().format('h:mm:ss A')
      },
      ...prev
    ].slice(0, 50));
  };

  const startClassSession = async () => {
    if (simulationRunning) return;
    
    setSimulationRunning(true);
    setSessionStartedBanner(true);
    
    // Set teacher as present
    updateRoomData({ 
      lecturer_present: true,
      lecturer_checkin_time: moment().format('h:mm A'),
      student_count: 0,
      lights_on: true,
      ac_on: true,
      windows_open: false
    });
    
    addActivityLog({
      room_id: 'Room 301',
      event_type: 'checkin',
      title: 'Lecturer Check-in',
      description: 'Dr. Sarah Johnson checked in'
    });

    // Add system activities for classroom setup
    const setupActivities = [
      { title: 'Air Conditioning Activated', description: 'AC set to 24°C' },
      { title: 'Fan System Started', description: 'Ceiling fans running at medium speed' },
      { title: 'Lights Turned On', description: 'All classroom lights activated' },
      { title: 'Windows Secured', description: 'All windows closed and locked' }
    ];

    for (const activity of setupActivities) {
      addActivityLog({
        room_id: 'Room 301',
        event_type: 'system',
        title: activity.title,
        description: activity.description
      });
    }

    const unauthorizedStudents = [
      'Michael Chen',
      'Sofia Rodriguez',
      'David Kim',
      'Emma Thompson',
      'Alex Martinez'
    ];

    const studentNames = [
      'Ahmed Ali', 'Fatima Hassan', 'Omar Khan', 'Layla Ibrahim', 'Yusuf Malik',
      'Amira Saleh', 'Zayd Farooq', 'Noor Ahmed', 'Bilal Rashid', 'Hana Mahmoud',
      'Tariq Abdullah', 'Sara Youssef', 'Karim Nasser', 'Aisha Hamza', 'Imran Siddiq',
      'Maryam Zahir', 'Hassan Farid', 'Zainab Amin', 'Ali Mustafa', 'Leena Saad',
      'Ibrahim Khalil', 'Noura Aziz', 'Rami Kamal', 'Dina Fouad', 'Sami Hussain',
      'Yasmin Sharif', 'Faisal Rahman', 'Lina Qasim', 'Khalid Mansour', 'Jana Fawzi',
      'Majid Tawfiq', 'Rana Zaki'
    ];

    let currentCount = 0;
    let unauthorizedIndex = 0;
    const expectedStudents = room.expected_students;
    const interval = setInterval(async () => {
      // Randomly add unauthorized student attempts
      if (unauthorizedIndex < unauthorizedStudents.length && Math.random() > 0.65) {
        addActivityLog({
          room_id: 'Room 301',
          event_type: 'security',
          title: 'Access Denied',
          description: `${unauthorizedStudents[unauthorizedIndex]} - Unauthorized: Not enrolled in this course`
        });
        unauthorizedIndex++;
      }
      if (currentCount >= expectedStudents) {
        clearInterval(interval);
        setSimulationRunning(false);

        // Add attendance completion log
        addActivityLog({
          room_id: 'Room 301',
          event_type: 'attendance',
          title: 'Student Attendance Updated',
          description: `All ${expectedStudents} students present - Attendance record complete`
        });

        toast.success('Class is full - All students present');
        return;
      }

      // Unlock door
      setRoom(prev => ({ ...prev, door_locked: false, door_last_action: moment().format('h:mm A') }));
      
      setTimeout(() => {
        currentCount++;
        const studentName = studentNames[currentCount - 1];
        
        // Lock door and update student count
        setRoom(prev => ({ 
          ...prev, 
          door_locked: true, 
          student_count: currentCount,
          door_last_action: moment().format('h:mm A')
        }));
        
        // Add activity log
        addActivityLog({
          room_id: 'Room 301',
          event_type: 'attendance',
          title: 'Student Entry',
          description: `${studentName} entered the classroom`
        });
      }, 500);
    }, 2000);
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
          mqttConnected={mqttConnected}
        />

        <AlertBanner 
          show={showAlert}
          temperature={room.temperature}
          triggeredTime="10:42:15 AM"
          roomId={room.room_id}
          onAcknowledge={() => setAlertAcknowledged(true)}
        />

        {sessionStartedBanner && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Class Session Started</h3>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Classroom systems activated and ready for teaching
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-600">
                    <span className="px-2 py-1 bg-white rounded-lg">❄️ AC ON (24°C)</span>
                    <span className="px-2 py-1 bg-white rounded-lg">💡 Lights ON</span>
                    <span className="px-2 py-1 bg-white rounded-lg">🪟 Windows Closed</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setSessionStartedBanner(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 h-11 font-medium transition-all duration-200 hover:scale-[1.02]"
              >
                Acknowledge
              </Button>
            </div>
          </div>
        )}

        {hotWeatherBanner && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Hot Weather Conditions Detected</h3>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Climate control systems adjusted for extreme heat
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-600">
                    <span className="px-2 py-1 bg-white rounded-lg">❄️ AC Lowered (18°C)</span>
                    <span className="px-2 py-1 bg-white rounded-lg">🪟 Windows Closed</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setHotWeatherBanner(false)}
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 h-11 font-medium transition-all duration-200 hover:scale-[1.02]"
              >
                Acknowledge
              </Button>
            </div>
          </div>
        )}

        {freezingBanner && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Freezing Temp Conditions Detected</h3>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Climate control systems adjusted for cold temperature
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-600">
                    <span className="px-2 py-1 bg-white rounded-lg">🔥 AC Increased (26°C)</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setFreezingBanner(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-11 font-medium transition-all duration-200 hover:scale-[1.02]"
              >
                Acknowledge
              </Button>
            </div>
          </div>
        )}

        {normalizedBanner && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Environment Adjusted to Normal</h3>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Temperature, humidity and air quality have returned to optimal levels
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-600">
                    <span className="px-2 py-1 bg-white rounded-lg">🌡️ Temp: 24°C</span>
                    <span className="px-2 py-1 bg-white rounded-lg">💧 Humidity: 50%</span>
                    <span className="px-2 py-1 bg-white rounded-lg">💨 PM2.5: 15 μg/m³</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setNormalizedBanner(false)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 h-11 font-medium transition-all duration-200 hover:scale-[1.02]"
              >
                Acknowledge
              </Button>
            </div>
          </div>
        )}

        {fireAlarmBanner && (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-300 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-xl animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">🔥 Fire Detected - Emergency Protocol Active</h3>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Immediate evacuation required - Emergency services notified
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-600">
                    <span className="px-2 py-1 bg-white rounded-lg">🚨 Alarm Active</span>
                    <span className="px-2 py-1 bg-white rounded-lg">💧 Sprinklers Active</span>
                    <span className="px-2 py-1 bg-white rounded-lg">🚪 Door Unlocked</span>
                    <span className="px-2 py-1 bg-white rounded-lg">🪟 Windows Opened</span>
                    <span className="px-2 py-1 bg-white rounded-lg">💡 Lights ON</span>
                    <span className="px-2 py-1 bg-white rounded-lg">❌ AC OFF</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setFireAlarmBanner(false)}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 h-11 font-medium transition-all duration-200 hover:scale-[1.02]"
              >
                Acknowledge
              </Button>
            </div>
          </div>
        )}

        {intrusionAlarmBanner && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-xl animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">🚨 Intruder Detected - Security Protocol Active</h3>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Unauthorized access detected - Security team notified
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-600">
                    <span className="px-2 py-1 bg-white rounded-lg">🚨 Alarm Active</span>
                    <span className="px-2 py-1 bg-white rounded-lg">🔒 Doors Secured</span>
                    <span className="px-2 py-1 bg-white rounded-lg">💡 Lights OFF</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setIntrusionAlarmBanner(false)}
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl px-6 h-11 font-medium transition-all duration-200 hover:scale-[1.02]"
              >
                Acknowledge
              </Button>
            </div>
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <EnvironmentalCard 
            temperature={room.temperature}
            humidity={room.humidity}
            pm25={room.pm25}
            lightsOn={room.lights_on}
            acOn={room.ac_on}
            windowsOpen={room.windows_open}
            sprinklerActive={room.sprinkler_active}
            alarmActive={room.alarm_active}
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

        {/* Recent Activity & Data Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <RecentActivityCard activities={activityList} />
          </div>

        <Card className="border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-xl">
                  <Settings className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900">Data Simulator</CardTitle>
                  <p className="text-sm text-slate-500 mt-0.5">Test dashboard with simulated sensor data</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Quick Scenarios */}
                <div className="mt-0">
                  <h3 className="font-semibold text-slate-900 text-sm mb-3">Quick Scenarios</h3>

                  {/* Standard Scenarios */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-500 mb-2">Standard</p>
                    <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      updateRoomData({ 
                        temperature: 24, 
                        humidity: 50, 
                        pm25: 15, 
                        lecturer_present: false,
                        lecturer_checkin_time: '',
                        student_count: 0,
                        door_locked: true,
                        alarm_active: false,
                        sprinkler_active: false,
                        camera_recording: true,
                        lights_on: false,
                        ac_on: false,
                        windows_open: true
                      });
                      setAlertAcknowledged(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    ✅ Normal
                  </Button>
                  <Button
                    onClick={startClassSession}
                    disabled={simulationRunning}
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    {simulationRunning ? '⏳ Class Starting...' : '📚 Class in Session'}
                  </Button>
                  <Button
                    onClick={() => {
                      updateRoomData({ 
                        lecturer_present: true,
                        lecturer_checkin_time: moment().format('h:mm A'),
                        student_count: room.expected_students,
                        lights_on: true,
                        ac_on: true,
                        windows_open: false,
                        door_locked: true,
                        temperature: 24,
                        humidity: 50,
                        pm25: 15
                      });

                      addActivityLog({
                        room_id: 'Room 301',
                        event_type: 'attendance',
                        title: 'Full Class Session Active',
                        description: `Lecturer and all ${room.expected_students} students present`
                      });

                      toast.success('Full class session activated');
                    }}
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    👥 Full Class
                    </Button>
                    </div>
                    </div>

                    {/* Environmental Scenarios */}
                    <div className="mb-4">
                    <p className="text-xs font-medium text-slate-500 mb-2">Environmental</p>
                    <div className="flex flex-wrap gap-2">
                    <Button
                    onClick={async () => {
                      updateRoomData({ 
                        temperature: 35, 
                        humidity: 80, 
                        pm25: 85, 
                        lights_on: true,
                        ac_on: true, 
                        windows_open: false 
                      });
                      setAlertAcknowledged(false);
                      setHotWeatherBanner(true);

                      const weatherActions = [
                        { title: 'AC Temperature Lowered', description: 'AC adjusted to 18°C for cooling' },
                        { title: 'Lights Turned On', description: 'All classroom lights activated' },
                        { title: 'Windows Secured', description: 'All windows closed to maintain cooling' }
                      ];

                      for (const action of weatherActions) {
                        addActivityLog({
                          room_id: 'Room 301',
                          event_type: 'system',
                          title: action.title,
                          description: action.description
                        });
                      }

                      // Gradually lower temperature, humidity, and pm25 to normal range
                      const interval = setInterval(() => {
                        setRoom(current => {
                          const newTemp = Math.max(24, current.temperature - 1);
                          const newHumidity = Math.max(50, current.humidity - 3);
                          const newPm25 = Math.max(15, current.pm25 - 7);

                          if (newTemp === 24 && newHumidity === 50 && newPm25 === 15) {
                            clearInterval(interval);
                            setNormalizedBanner(true);
                            addActivityLog({
                              room_id: 'Room 301',
                              event_type: 'system',
                              title: 'Climate Normalized',
                              description: 'Temperature, humidity and air quality returned to normal levels'
                            });
                          }

                          return {
                            ...current,
                            temperature: newTemp,
                            humidity: newHumidity,
                            pm25: newPm25
                          };
                        });
                      }, 2000);
                    }}
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    ☀️ Hot Weather
                  </Button>
                  <Button
                    onClick={async () => {
                      updateRoomData({ 
                        temperature: 16, 
                        humidity: 30, 
                        pm25: 10, 
                        lights_on: true,
                        ac_on: true, 
                        windows_open: false 
                      });
                      setAlertAcknowledged(false);
                      setFreezingBanner(true);

                      const freezingActions = [
                        { title: 'AC Temperature Increased', description: 'AC adjusted to 26°C for heating' },
                        { title: 'Lights Turned On', description: 'All classroom lights activated' },
                        { title: 'Windows Secured', description: 'All windows closed to maintain heating' }
                      ];

                      for (const action of freezingActions) {
                        addActivityLog({
                          room_id: 'Room 301',
                          event_type: 'system',
                          title: action.title,
                          description: action.description
                        });
                      }

                      // Gradually raise temperature, humidity, and pm25 to normal range
                      const interval = setInterval(() => {
                        setRoom(current => {
                          const newTemp = Math.min(24, current.temperature + 1);
                          const newHumidity = Math.min(50, current.humidity + 2);
                          const newPm25 = Math.min(15, current.pm25 + 1);

                          if (newTemp === 24 && newHumidity === 50 && newPm25 === 15) {
                            clearInterval(interval);
                            setNormalizedBanner(true);
                            addActivityLog({
                              room_id: 'Room 301',
                              event_type: 'system',
                              title: 'Climate Normalized',
                              description: 'Temperature, humidity and air quality returned to normal levels'
                            });
                          }

                          return {
                            ...current,
                            temperature: newTemp,
                            humidity: newHumidity,
                            pm25: newPm25
                          };
                        });
                      }, 2000);
                    }}
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    ❄️ Freezing
                    </Button>
                    </div>
                    </div>

                    {/* Emergency Scenarios */}
                    <div className="mb-4">
                    <p className="text-xs font-medium text-slate-500 mb-2">Emergency</p>
                    <div className="flex flex-wrap gap-2">
                    <Button
                    onClick={() => {
                      updateRoomData({ 
                        alarm_active: true, 
                        alarm_type: 'fire', 
                        door_locked: false,
                        temperature: 45,
                        humidity: 85,
                        pm25: 150,
                        lights_on: true,
                        ac_on: false,
                        windows_open: true,
                        sprinkler_active: true
                      });
                      setFireAlarmBanner(true);
                      
                      addActivityLog({
                        room_id: 'Room 301',
                        event_type: 'alert',
                        title: 'Fire Activated',
                        description: 'Emergency evacuation protocol initiated - Sprinklers activated'
                      });
                    }}
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    🔥 Fire
                  </Button>
                  <Button
                    onClick={() => {
                      updateRoomData({ 
                        alarm_active: true, 
                        alarm_type: 'intrusion', 
                        door_locked: true,
                        lights_on: false
                      });
                      setIntrusionAlarmBanner(true);

                      const securityLogs = [
                        { title: 'Intruder Alarm Activated', description: 'Security breach detected - Emergency protocol initiated' },
                        { title: 'Doors Secured', description: 'All doors locked to prevent unauthorized access' }
                      ];

                      for (const log of securityLogs) {
                        addActivityLog({
                          room_id: 'Room 301',
                          event_type: 'alert',
                          title: log.title,
                          description: log.description
                        });
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    🚨 Intruder
                    </Button>
                    </div>
                    </div>
                    </div>
                  </CardContent>
                  </Card>
                  </div>
                  </div>
                  </div>
                  );
                  }