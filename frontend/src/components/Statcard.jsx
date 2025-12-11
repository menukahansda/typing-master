import React from 'react';

export default function Statcard({ title, value , icon}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">{icon}</div>
      
      <div>
        <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
        <h2 className="text-2xl font-bold text-slate-800">{value}</h2>
      </div>
      
    </div>
  );
}