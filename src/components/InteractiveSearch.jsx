import React, { useState, useMemo } from 'react';

export default function InteractiveSearch({ initialVessels = [] }) {
  const [port, setPort] = useState('All');
  const [vesselType, setVesselType] = useState('All');
  const [groupSize, setGroupSize] = useState('All');

  const [openBar, setOpenBar] = useState(false);
  const [vegMenu, setVegMenu] = useState(false);
  const [snorkeling, setSnorkeling] = useState(false);
  const [aircon, setAircon] = useState(false);

  const filteredVessels = useMemo(() => {
    return initialVessels.filter((item) => {
      if (port !== 'All' && item.departure_port !== port) return false;
      if (vesselType !== 'All' && item.vessel_type !== vesselType) return false;
      
      if (groupSize === 'small' && item.max_capacity > 6) return false;
      if (groupSize === 'medium' && (item.max_capacity < 7 || item.max_capacity > 12)) return false;
      if (groupSize === 'large' && item.max_capacity < 13) return false;

      if (openBar && !item.has_open_bar) return false;
      if (vegMenu && !item.has_vegetarian_menu) return false;
      if (snorkeling && !item.has_snorkeling_gear) return false;
      if (aircon && !item.has_aircon_cabins) return false;

      return true;
    });
  }, [initialVessels, port, vesselType, groupSize, openBar, vegMenu, snorkeling, aircon]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 h-fit space-y-6">
        <h3 className="font-bold text-slate-900 text-lg border-b pb-3">Refine Search</h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Departure Port</label>
          <select value={port} onChange={(e) => setPort(e.target.value)} className="w-full border rounded-xl p-2.5 text-xs bg-slate-50">
            <option value="All">All Departure Ports</option>
            <option value="Sanur Harbor">Sanur Harbor</option>
            <option value="Nusa Dua">Nusa Dua</option>
            <option value="Labuan Bajo">Labuan Bajo</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Vessel Type</label>
          <select value={vesselType} onChange={(e) => setVesselType(e.target.value)} className="w-full border rounded-xl p-2.5 text-xs bg-slate-50">
            <option value="All">All Vessel Types</option>
            <option value="Catamaran">Catamaran</option>
            <option value="Luxury Speedboat">Luxury Speedboat</option>
            <option value="Phinisi">Phinisi</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">Group Capacity</label>
          <select value={groupSize} onChange={(e) => setGroupSize(e.target.value)} className="w-full border rounded-xl p-2.5 text-xs bg-slate-50">
            <option value="All">Any Group Size</option>
            <option value="small">2 – 6 Guests</option>
            <option value="medium">7 – 12 Guests</option>
            <option value="large">13+ Guests</option>
          </select>
        </div>

        <div className="space-y-2 border-t pt-4">
          <label className="block text-xs font-bold text-slate-700 mb-2">Inclusions & Comfort</label>
          <label className="flex items-center space-x-2 text-xs">
            <input type="checkbox" checked={openBar} onChange={(e) => setOpenBar(e.target.checked)} className="rounded text-blue-600" />
            <span>Open Bar / Drinks</span>
          </label>
          <label className="flex items-center space-x-2 text-xs">
            <input type="checkbox" checked={vegMenu} onChange={(e) => setVegMenu(e.target.checked)} className="rounded text-blue-600" />
            <span>Vegetarian Options</span>
          </label>
          <label className="flex items-center space-x-2 text-xs">
            <input type="checkbox" checked={snorkeling} onChange={(e) => setSnorkeling(e.target.checked)} className="rounded text-blue-600" />
            <span>Snorkeling Equipment</span>
          </label>
          <label className="flex items-center space-x-2 text-xs">
            <input type="checkbox" checked={aircon} onChange={(e) => setAircon(e.target.checked)} className="rounded text-blue-600" />
            <span>Air-Conditioned Saloon</span>
          </label>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-xs font-semibold text-slate-500">Showing {filteredVessels.length} verified charters</p>
        </div>

        {filteredVessels.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium text-sm">No vessels match your active filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVessels.map((vessel) => (
              <div key={vessel.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <img src={vessel.image_urls[0]} alt={vessel.title} className="aspect-video w-full object-cover" />
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">{vessel.vessel_type}</span>
                    <h3 className="font-bold text-slate-900 mt-2">{vessel.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">📍 {vessel.departure_port} • Max {vessel.max_capacity} Guests</p>
                  </div>
                </div>
                <div className="p-5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">From</span>
                    <span className="text-lg font-black text-blue-600">${vessel.base_price_usd}</span>
                  </div>
                  <a href={`/charters/${vessel.slug}`} className="bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
                    View & Estimate
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}