

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
const WorkerDashboard = () => {
const API_CONFIG = {
 REPORT_INCIDENT: 'https://ak1to.app.n8n.cloud/webhook/incident-report',
  GET_ACTIVE_INCIDENTS: 'https://ak1to.app.n8n.cloud/webhook/incidents/active',
  WORKER_RESPONSE: 'https://ak1to.app.n8n.cloud/webhook/incident/respond',
  CHECK_STATUS: 'https://ak1to.app.n8n.cloud/webhook/incident/status'
};
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [responseForm, setResponseForm] = useState({
    response_type: 'acknowledge',
    response_message: '',
    status: 'acknowledged',
    eta_minutes: '',
    worker_id: 'WORKER001',
    worker_name: 'Emergency Responder'
  });

  useEffect(() => {
    fetchActiveIncidents();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchActiveIncidents, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchActiveIncidents = async () => {
    try {
      const response = await fetch(API_CONFIG.GET_ACTIVE_INCIDENTS);
      const data = await response.json();
      setIncidents(data || []);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitResponse = async () => {
    if (!selectedIncident || !responseForm.response_message.trim()) {
      alert('Please select an incident and enter a response message');
      return;
    }

    try {
      const response = await fetch(API_CONFIG.WORKER_RESPONSE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...responseForm,
          incident_id: selectedIncident.incident_id
        })
      });

      const result = await response.json();
      if (result.status === 'success') {
        alert('Response submitted successfully');
        setSelectedIncident(null);
        setResponseForm({
          ...responseForm,
          response_message: '',
          eta_minutes: ''
        });
        fetchActiveIncidents();
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Error submitting response. Please try again.');
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'responding': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Emergency Worker Dashboard</h1>
              <p className="text-green-100">Manage active incidents and coordinate responses</p>
            </div>
            <button
              onClick={fetchActiveIncidents}
              className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-12 w-12 animate-spin mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Loading active incidents...</p>
            </div>
          ) : incidents.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No active incidents at this time</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Active Incidents ({incidents.length})
                </h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {incidents.map((incident) => (
                    <div
                      key={incident.incident_id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedIncident?.incident_id === incident.incident_id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedIncident(incident)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                            {incident.severity}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                            {incident.status}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">#{incident.incident_id?.slice(-6)}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{incident.type}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{incident.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="h-3 w-3 mr-1" />
                        {incident.citizen_name || 'Anonymous'}
                        <Clock className="h-3 w-3 ml-3 mr-1" />
                        {new Date(incident.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Incident Response</h2>
                {selectedIncident ? (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{selectedIncident.type}</h3>
                        <span className="text-sm text-gray-500">#{selectedIncident.incident_id?.slice(-6)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-600">Severity:</span>
                          <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedIncident.severity)}`}>
                            {selectedIncident.severity}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Priority Score:</span>
                          <span className="ml-2 font-medium">{selectedIncident.priority_score}/9</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-600 block mb-1">Description:</span>
                        <p className="text-sm bg-white p-3 rounded border">{selectedIncident.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Citizen:</span>
                          <span className="ml-2 font-medium">{selectedIncident.citizen_name || 'Anonymous'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Phone:</span>
                          <span className="ml-2 font-medium">{selectedIncident.phone || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Response Type</label>
                        <select
                          value={responseForm.response_type}
                          onChange={(e) => setResponseForm({
                            ...responseForm,
                            response_type: e.target.value,
                            status: e.target.value === 'acknowledge' ? 'acknowledged' : 'responding'
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        >
                          <option value="acknowledge">Acknowledge Incident</option>
                          <option value="respond">Respond to Scene</option>
                          <option value="update">Status Update</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Response Message</label>
                        <textarea
                          value={responseForm.response_message}
                          onChange={(e) => setResponseForm({ ...responseForm, response_message: e.target.value })}
                          placeholder="Enter your response message to the citizen..."
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      {responseForm.response_type === 'respond' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ETA (minutes)</label>
                          <input
                            type="number"
                            value={responseForm.eta_minutes}
                            onChange={(e) => setResponseForm({ ...responseForm, eta_minutes: e.target.value })}
                            placeholder="Expected arrival time in minutes"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      )}

                      <button
                        onClick={submitResponse}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Response
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Select an incident to respond</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Panel */}
      <div className="mt-8 grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Active</h3>
              <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-gray-900">
                {incidents.filter(i => i.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Responding</h3>
              <p className="text-2xl font-bold text-gray-900">
                {incidents.filter(i => i.status === 'responding').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Critical</h3>
              <p className="text-2xl font-bold text-gray-900">
                {incidents.filter(i => i.severity === 'Critical').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;