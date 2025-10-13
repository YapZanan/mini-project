interface EvolutionChain {
  baby_trigger_item: null | {
    name: string;
    url: string;
  };
  chain: EvolutionChainLink;
  id: number;
}

interface EvolutionChainLink {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
  is_baby: boolean;
  species: NamedAPIResource;
}

interface EvolutionDetail {
  base_form_id: number | null;
  gender: number | null;
  held_item: NamedAPIResource | null;
  item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  region_id: number | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  trigger: NamedAPIResource;
  turn_upside_down: boolean;
}

interface NamedAPIResource {
  name: string;
  url: string;
}
