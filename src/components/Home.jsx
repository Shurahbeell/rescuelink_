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
import { Link } from 'react-router-dom';
const Home = () =>{
  return(
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <AlertTriangle className="h-24 w-24 text-red-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Emergency Response System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Fast, reliable emergency reporting and response coordination
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Link to="/citizen"
          className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer border-l-4 border-blue-500"
        >
          <div className="text-center">
            <User className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Citizen Portal</h2>
            <p className="text-gray-600 mb-6">
              Report emergencies, track incident status, and get immediate assistance
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center text-sm text-gray-700">
                <Phone className="h-4 w-4 mr-2 text-blue-500" />
                Report incidents with location
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                Real-time status updates
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Camera className="h-4 w-4 mr-2 text-blue-500" />
                Upload photos/videos
              </div>
            </div>
          </div>
        </Link>
        <Link to="/worker"
          className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer border-l-4 border-green-500"
        >
          <div className="text-center">
            <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Worker</h2>
            <p className="text-gray-600 mb-6">
              Manage active incidents, coordinate responses, and update citizens
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center text-sm text-gray-700">
                <AlertCircle className="h-4 w-4 mr-2 text-green-500" />
                View active incidents
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Timer className="h-4 w-4 mr-2 text-green-500" />
                Update response status
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Users className="h-4 w-4 mr-2 text-green-500" />
                Team coordination
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-12 bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Emergency Notice</h3>
            <p className="text-red-700 mt-2">
              For life-threatening emergencies, call your local emergency number (911, 112, etc.) immediately. 
              This system is for non-critical incident reporting and coordination.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home