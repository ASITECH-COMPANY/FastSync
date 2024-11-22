export interface User {
  name: string;
  email: string;
  imageUrl?: string;
}

export interface Contact {
  etag: any;
  resourceName: string;
  phoneNumbers: Array<{
    value: string;
    metadata: {
      primary: boolean;
    };
  }>;
  names?: Array<{
    displayName: string;
  }>;
}