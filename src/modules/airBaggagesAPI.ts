export interface Baggage {
    id: number;
    weight: number;
    number: string;
    description: string;
    image: string;
  }

  
  export interface BaggageResult {
    baggages: Baggage[];
  }

  export const getBaggagesByWeight = async (weight = ''): Promise<BaggageResult> => {
    const url = `/api/baggages/?baggage_weight=${encodeURIComponent(weight)}`;
    return fetch(url)
        .then((response) => response.json())
        .then((data) => ({
            baggages: Array.isArray(data.baggages) ? data.baggages : [],
        }));
};

  export const getBaggageById = async (baggageId: number | string): Promise<Baggage> => {
    const url = `/api/baggages/${encodeURIComponent(baggageId)}`;
    return fetch(url)
      .then((response) => response.json());
  };