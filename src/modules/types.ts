export type T_Baggage = {
    id: number;
    image?: string | null | undefined;
    number: string;
    weight: number;
    status?: boolean | undefined;
    description: string;
    active_add: boolean;
  };
  
  
  export type T_Transfer = {
    id: string
    status: string
    creation_date: string
    formation_date: string
    completion_date: string
    owner_name: string
    flight: string
    transfer_date: string
    moderator: string
    user: string
    heaviest_baggage: number
    baggages: T_Baggage[]
  }
  
  export type T_User = {
    id: number
    username: string
    email: string
    password: string,
    is_authenticated: boolean
    is_staff: boolean;
    validation_error: boolean
    validation_success: boolean
    checked: boolean
    first_name: string
    last_name: string
  }
  
  export type T_LoginCredentials = {
    username: string
    password: string
  }
  
  export type T_RegisterCredentials = {
    username: string
    first_name: string
    last_name: string
    email: string
    password: string
  }
  
  export type T_BaggagesListResponse = {
    baggages: T_Baggage[],
    draft_transfer: number,
    baggages_to_transfer: number
  }