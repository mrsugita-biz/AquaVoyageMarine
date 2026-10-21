import mockVesselsData from '../data/mockVessels.json';
import { supabase } from './supabase';

const USE_LIVE_API = import.meta.env.PUBLIC_USE_LIVE_API === 'true';

export interface Addon {
  id: string;
  addon_name: string;
  price_usd: number;
  pricing_type: 'per_person' | 'flat_rate';
}

export interface ItineraryItem {
  time: string;
  activity: string;
}

export interface Vessel {
  id: string;
  slug: string;
  title: string;
  vessel_type: string;
  departure_port: string;
  category_tag: string;
  max_capacity: number;
  length_ft: number;
  base_price_usd: number;
  duration_hours: number;
  description: string;
  image_urls: string[];
  inclusions: string[];
  has_open_bar: boolean;
  has_catering: boolean;
  has_vegetarian_menu: boolean;
  has_snorkeling_gear: boolean;
  has_sup_paddleboards: boolean;
  has_aircon_cabins: boolean;
  has_toilet_shower: boolean;
  has_bluetooth_sound: boolean;
  itinerary_timeline: ItineraryItem[];
  addons: Addon[];
  affiliate_partner: string;
  affiliate_url: string;
}

export async function getAllVessels(): Promise<Vessel[]> {
  if (USE_LIVE_API) {
    const { data, error } = await supabase.from('vessels').select('*, vessel_addons(*)');
    if (error) return [];
    return data as Vessel[];
  }
  return mockVesselsData as Vessel[];
}

export async function getVesselBySlug(slug: string): Promise<Vessel | null> {
  if (USE_LIVE_API) {
    const { data, error } = await supabase.from('vessels').select('*, vessel_addons(*)').eq('slug', slug).single();
    if (error || !data) return null;
    return data as Vessel;
  }
  return (mockVesselsData as Vessel[]).find((v) => v.slug === slug) || null;
}