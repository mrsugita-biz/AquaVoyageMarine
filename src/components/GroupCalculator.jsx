import React, { useState } from 'react';

export default function GroupCalculator({ basePriceUsd, maxCapacity, affiliateUrl, addons = [] }) {
  const [guests, setGuests] = useState(6);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addonsCost = addons.reduce((total, addon) => {
    if (!selectedAddons.includes(addon.id)) return total;
    return total + (addon.pricing_type === 'per_person' ? addon.price_usd * guests : addon.price_usd);
  }, 0);

  const grandTotal = Number(basePriceUsd) + addonsCost;
  const pricePerPerson = (grandTotal / guests).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Starting Rate</span>
          <p className="text-2xl font-black text-slate-900">${basePriceUsd} <span className="text-xs font-normal text-slate-500">/ charter</span></p>
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200">
          ✓ Verified Rate
        </span>
      </div>

      <h3 className="font-bold text-slate-900 mb-4">Interactive Group Cost Estimator</h3>

      <div className="mb-5">
        <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
          <span>Select Group Size:</span>
          <span className="text-blue-600">{guests} Guests</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max={maxCapacity} 
          value={guests} 
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
        />
      </div>

      {addons.length > 0 && (
        <div className="mb-6 space-y-2">
          <span className="block text-xs font-bold text-slate-700 mb-1">Optional Catering & Add-ons:</span>
          {addons.map((addon) => (
            <label key={addon.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 text-xs">
              <span className="flex items-center space-x-2 text-slate-800">
                <input 
                  type="checkbox"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium">{addon.addon_name}</span>
              </span>
              <span className="font-bold text-slate-600">
                +${addon.price_usd} {addon.pricing_type === 'per_person' ? '/pax' : 'flat'}
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="bg-blue-50/70 p-4 rounded-xl mb-5 border border-blue-100">
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>Group Charter Total:</span>
          <span className="font-bold text-slate-900">${grandTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-blue-200/60">
          <span className="text-xs font-bold text-blue-900">Per Person Share:</span>
          <span className="text-2xl font-black text-blue-600">${pricePerPerson}</span>
        </div>
      </div>

      <a 
        href={affiliateUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-center rounded-xl transition shadow-md hover:shadow-lg text-sm"
      >
        Check Live Availability & Book
      </a>
      <p className="text-[10px] text-center text-slate-400 mt-2">
        🔒 Instant confirmation via official partner checkout
      </p>
    </div>
  );
}