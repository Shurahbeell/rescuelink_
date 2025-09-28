

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  User, 
  Shield, 
  FileText, 
  Camera,
  Send,
  RefreshCw,
  AlertCircle,
  Timer,
  Users
} from 'lucide-react';
const CitizenDashboard = () => {
const API_CONFIG = {
  REPORT_INCIDENT: 'https://ak1to.app.n8n.cloud/webhook/incident-report',
  GET_ACTIVE_INCIDENTS: 'https://ak1to.app.n8n.cloud/webhook/incidents/active',
  WORKER_RESPONSE: 'https://ak1to.app.n8n.cloud/webhook/incident/respond',
  CHECK_STATUS: 'https://ak1to.app.n8n.cloud/webhook/incident/status'
};
  const [activeTab, setActiveTab] = useState('report');
  const [formData, setFormData] = useState({
    description: '',
    type: 'general',
    phone: '',
    citizen_name: '',
    media_urls: []
  });
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);
  const [reportedIncident, setReportedIncident] = useState(null);
  const [statusCheck, setStatusCheck] = useState({ incidentId: '', status: null });

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      });
    }
  }, []);

  const submitIncident = async () => {
    if (!formData.description.trim()) {
      alert('Please describe the incident');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_CONFIG.REPORT_INCIDENT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lat: location.lat,
          lon: location.lon
        })
      });

      const result = await response.json();
      if (result.status === 'success') {
        setReportedIncident(result);
        setActiveTab('status');
      }
    } catch (error) {
      console.error('Error submitting incident:', error);
      alert('Error submitting incident. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkIncidentStatus = async () => {
    if (!statusCheck.incidentId.trim()) {
      alert('Please enter an incident ID');
      return;
    }

    try {
      const response = await fetch(`${API_CONFIG.CHECK_STATUS}?incident_id=${statusCheck.incidentId}`);
      const result = await response.json();
      setStatusCheck({ ...statusCheck, status: result });
    } catch (error) {
      console.error('Error checking status:', error);
      setStatusCheck({ ...statusCheck, status: { status: 'error', message: 'Unable to fetch status' } });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">Citizen Emergency Portal</h1>
          <p className="text-blue-100">Report incidents and track response status</p>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('report')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'report'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="inline h-5 w-5 mr-2" />
              Report Incident
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'status'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Clock className="inline h-5 w-5 mr-2" />
              Check Status
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'report' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.citizen_name}
                    onChange={(e) => setFormData({ ...formData, citizen_name: e.target.value })}
                    placeholder="Enter your name (optional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your contact number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="medical">Medical Emergency</option>
                  <option value="fire">Fire</option>
                  <option value="crime">Crime</option>
                  <option value="accident">Accident</option>
                  <option value="natural-disaster">Natural Disaster</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what happened, where, and any other relevant details..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {location.lat ? 'Location detected' : 'Getting location...'}
                  </span>
                </div>
                {location.lat && (
                  <span className="text-xs text-gray-500">
                    {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                  </span>
                )}
              </div>

              <button
                onClick={submitIncident}
                disabled={loading || !location.lat}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Send className="h-5 w-5 mr-2" />
                )}
                {loading ? 'Submitting...' : 'Submit Incident Report'}
              </button>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="space-y-6">
              {reportedIncident && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-green-800">Incident Reported Successfully</h3>
                      <p className="text-green-700 text-sm mt-1">
                        Incident ID: <span className="font-mono font-bold">{reportedIncident.incident_id}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Incident ID to Check Status
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={statusCheck.incidentId}
                    onChange={(e) => setStatusCheck({ ...statusCheck, incidentId: e.target.value })}
                    placeholder="e.g., INC-1234567890-abc123"
                    className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={checkIncidentStatus}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Check Status
                  </button>
                </div>
              </div>

              {statusCheck.status && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  {statusCheck.status.status === 'success' ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Incident Status</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Status:</span>
                          <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {statusCheck.status.incident.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Type:</span>
                          <span className="ml-2 font-medium">{statusCheck.status.incident.type}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Severity:</span>
                          <span className="ml-2 font-medium">{statusCheck.status.incident.severity}</span>
                        </div>
                        {statusCheck.status.incident.assigned_worker && (
                          <div>
                            <span className="text-sm text-gray-600">Assigned Worker:</span>
                            <span className="ml-2 font-medium">{statusCheck.status.incident.assigned_worker}</span>
                          </div>
                        )}
                      </div>
                      {statusCheck.status.incident.worker_response && (
                        <div>
                          <span className="text-sm text-gray-600 block mb-1">Latest Update:</span>
                          <p className="bg-gray-50 p-3 rounded-lg text-sm">
                            {statusCheck.status.incident.worker_response}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-red-600">
                      <AlertCircle className="h-12 w-12 mx-auto mb-3" />
                      <p>{statusCheck.status.message || 'Incident not found'}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CitizenDashboard;