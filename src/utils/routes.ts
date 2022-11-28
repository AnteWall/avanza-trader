export const loginPath = () => "/login";
export const homePath = () => "/";

export const orderBookPath = (instrument: string, orderbookId: string) =>
  `/instrument/${instrument}/${orderbookId}`;
