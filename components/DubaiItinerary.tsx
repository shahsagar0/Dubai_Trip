import React, { useState } from 'react';
import { 
  Plane, 
  Calendar, 
  Users, 
  Sun, 
  Camera, 
  Ticket, 
  ArrowRight,
  TrendingUp,
  Building,
  Star
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// --- Types ---
interface TripDetails {
  title: string;
  dates: string;
  travelers: string;
  grandTotal: number;
  airline: string;
}

interface CostItem {
  name: string;
  value: number;
  color: string;
}

interface FlightSegment {
  date: string;
  route: string;
  type: string;
  details: string;
}

interface Flights {
  outbound: FlightSegment;
  inbound: FlightSegment;
}

interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  cost: number;
  highlights: string[];
  notes: string;
}

const DubaiItinerary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'costs' | 'flights'>('timeline');

  // --- DATA ---
  const tripDetails: TripDetails = {
    title: "Dubai Family Extravaganza 2026",
    dates: "Jan 19 - Jan 24, 2026",
    travelers: "10 Travelers",
    grandTotal: 860490,
    airline: "IndiGo (Direct)"
  };

  const costBreakdown: CostItem[] = [
    { name: 'Flights (IndiGo)', value: 223790, color: '#3b82f6' }, // Blue
    { name: 'Hotel (Millennium Plaza)', value: 360000, color: '#eab308' }, // Yellow/Gold
    { name: 'Activities & Food', value: 276700, color: '#10b981' }, // Emerald
  ];

  const flights: Flights = {
    outbound: {
      date: "Mon, 19 Jan 2026",
      route: "Mumbai (BOM) → Dubai (DXB)",
      type: "Direct Flight",
      details: "IndiGo Round Trip Fare"
    },
    inbound: {
      date: "Sat, 24 Jan 2026",
      route: "Dubai (DXB) → Mumbai (BOM)",
      type: "Direct Flight",
      details: "Departs 12:15 PM"
    }
  };

  const itinerary: ItineraryDay[] = [
    {
      day: 1,
      date: "Jan 19",
      title: "Arrival Night",
      icon: <Plane className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
      cost: 13000,
      highlights: ["Arrive Dubai", "Check-in: Millennium Plaza Downtown", "Light Dinner"],
      notes: "Hotel cost excluded here (see breakdown)"
    },
    {
      day: 2,
      date: "Jan 20",
      title: "Iconic Views",
      icon: <Camera className="w-6 h-6 text-white" />,
      color: "bg-emerald-500",
      cost: 47700,
      highlights: ["Dubai Frame", "Miracle Garden", "Global Village"],
      notes: "Full day taxi included"
    },
    {
      day: 3,
      date: "Jan 21",
      title: "Downtown Dubai",
      icon: <Building className="w-6 h-6 text-white" />,
      color: "bg-purple-500",
      cost: 71000,
      highlights: ["Dubai Aquarium", "Burj Khalifa (Non-prime)", "Dubai Mall"],
      notes: "Lunch + Dinner included"
    },
    {
      day: 4,
      date: "Jan 22",
      title: "Desert Safari",
      icon: <Sun className="w-6 h-6 text-white" />,
      color: "bg-orange-500",
      cost: 52000,
      highlights: ["Morning Errands", "Premium Safari (Soft Ride)", "BBQ Dinner"],
      notes: "Morning taxi included"
    },
    {
      day: 5,
      date: "Jan 23",
      title: "Warner Bros World",
      icon: <Ticket className="w-6 h-6 text-white" />,
      color: "bg-red-500",
      cost: 91000,
      highlights: ["Warner Bros World Abu Dhabi", "AC Coach Transfer", "In-park Lunch"],
      notes: "Most expensive activity day"
    },
    {
      day: 6,
      date: "Jan 24",
      title: "Departure",
      icon: <ArrowRight className="w-6 h-6 text-white" />,
      color: "bg-slate-600",
      cost: 2000,
      highlights: ["Breakfast at Hotel", "Checkout", "Airport Transfer"],
      notes: "Flight at 12:15 PM"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* Header Section */}
      <div className="bg-slate-900 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <Plane size={400} />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 text-yellow-400 font-semibold tracking-wider text-sm uppercase mb-2">
                <Calendar size={16} />
                {tripDetails.dates}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{tripDetails.title}</h1>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="flex items-center gap-2">
                   <Users size={18} />
                   <span>{tripDetails.travelers}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Building size={18} />
                   <span>Millennium Plaza Downtown</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-right min-w-[200px]">
              <p className="text-sm text-slate-300 uppercase tracking-wide">Grand Total</p>
              <p className="text-4xl font-bold text-yellow-400">{formatCurrency(tripDetails.grandTotal)}</p>
              <p className="text-xs text-slate-400 mt-1">Approx ±10%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-100 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 min-w-[120px] py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'timeline' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Calendar size={18} /> Itinerary
            </button>
            <button 
              onClick={() => setActiveTab('costs')}
              className={`flex-1 min-w-[120px] py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'costs' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <TrendingUp size={18} /> Budget
            </button>
            <button 
              onClick={() => setActiveTab('flights')}
              className={`flex-1 min-w-[120px] py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'flights' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Plane size={18} /> Logistics
            </button>
          </div>

          <div className="p-6 md:p-8 bg-slate-50/50 min-h-[500px]">
            
            {/* TIMELINE TAB */}
            {activeTab === 'timeline' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itinerary.map((day, index) => (
                  <div key={index} className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${day.color} shadow-lg`}>
                          {day.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Day {day.day}</p>
                          <p className="text-sm font-semibold text-slate-600">{day.date}</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-800 mb-3">{day.title}</h3>
                    
                    <ul className="space-y-2 mb-6 flex-grow">
                      {day.highlights.map((item, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Day Cost</span>
                        <span className="font-bold text-slate-700">{formatCurrency(day.cost)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* COST BREAKDOWN TAB */}
            {activeTab === 'costs' && (
              <div className="flex flex-col lg:flex-row items-center gap-12 h-full justify-center py-8">
                <div className="w-full lg:w-1/2 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800">Budget Distribution</h3>
                  <div className="space-y-4">
                    {costBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="font-medium text-slate-700">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">{formatCurrency(item.value)}</p>
                          <p className="text-xs text-slate-400">{Math.round((item.value / tripDetails.grandTotal) * 100)}% of total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-6">
                    <p className="text-sm text-blue-800 flex gap-2">
                      <TrendingUp size={18} />
                      <span className="font-bold">Summary:</span> 
                      Most of the budget (~42%) is allocated to 5★ Accommodation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FLIGHTS TAB */}
            {activeTab === 'flights' && (
              <div className="max-w-3xl mx-auto space-y-6 py-4">
                {/* Outbound */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">OUTBOUND</span>
                      <h3 className="text-lg font-bold text-slate-800">{flights.outbound.date}</h3>
                      <p className="text-sm text-slate-500">{tripDetails.airline}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-800">BOM</p>
                      <p className="text-xs text-slate-500 font-bold">Mumbai</p>
                    </div>
                    <div className="flex-1 px-4 flex flex-col items-center">
                      <div className="w-full h-px bg-slate-300 relative flex items-center justify-center">
                        <Plane className="w-4 h-4 text-slate-400 absolute bg-slate-50 px-1" />
                      </div>
                      <p className="text-xs text-slate-400 mt-2 text-center">{flights.outbound.type}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-800">DXB</p>
                      <p className="text-xs text-slate-500 font-bold">Dubai</p>
                    </div>
                  </div>
                </div>

                {/* Inbound */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-slate-600"></div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">RETURN</span>
                      <h3 className="text-lg font-bold text-slate-800">{flights.inbound.date}</h3>
                      <p className="text-sm text-slate-500">{tripDetails.airline} • {flights.inbound.details}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-800">DXB</p>
                      <p className="text-xs text-slate-500 font-bold">Dubai</p>
                    </div>
                    <div className="flex-1 px-4 flex flex-col items-center">
                      <div className="w-full h-px bg-slate-300 relative flex items-center justify-center">
                        <Plane className="w-4 h-4 text-slate-400 absolute bg-slate-50 px-1 transform rotate-180" />
                      </div>
                      <p className="text-xs text-slate-400 mt-2 text-center">{flights.inbound.type}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-800">BOM</p>
                      <p className="text-xs text-slate-500 font-bold">Mumbai</p>
                    </div>
                  </div>
                </div>

                {/* Hotel Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden mt-8">
                  <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400"></div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">ACCOMMODATION</span>
                      <h3 className="text-lg font-bold text-slate-800">Millennium Plaza Downtown</h3>
                      <p className="text-sm text-slate-500">3 Rooms • 5 Nights • 5★ Property</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                       <p className="text-2xl font-bold text-slate-800">{formatCurrency(360000)}</p>
                       <p className="text-xs text-slate-400">Total Cost</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
      
      {/* Footer / Highlights Strip */}
      <div className="max-w-5xl mx-auto mt-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
             <div className="text-yellow-500 font-bold text-2xl mb-1 flex justify-center"><Star className="fill-current" /></div>
             <div className="text-xs text-slate-500 uppercase tracking-wide">5★ Hotel Stay</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
             <div className="text-blue-500 font-bold text-2xl mb-1 flex justify-center"><Plane className="fill-current" /></div>
             <div className="text-xs text-slate-500 uppercase tracking-wide">Direct Flights</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
             <div className="text-emerald-500 font-bold text-2xl mb-1 flex justify-center"><Users className="fill-current" /></div>
             <div className="text-xs text-slate-500 uppercase tracking-wide">10 Travelers</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
             <div className="text-purple-500 font-bold text-2xl mb-1 flex justify-center"><Ticket className="fill-current" /></div>
             <div className="text-xs text-slate-500 uppercase tracking-wide">Premium Activities</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DubaiItinerary;