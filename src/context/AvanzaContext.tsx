import React, { createContext, useState } from "react";
import { AvanzaClient } from "avanza-ts";
import { HttpVerb } from "@tauri-apps/api/http";
interface AvanaContextData {
  client: AvanzaClient;
}

export const AvanzaContext = createContext<AvanaContextData>({
  client: undefined as unknown as AvanzaClient,
});

export async function fetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const { fetch } = await import("@tauri-apps/api/http");
  console.log("fetch", input, init);
  const res = await fetch(input.toString(), {
    ...init,
    method: init?.method as HttpVerb,
    body: init?.body
      ? {
          type: "Text",
          payload: init?.body,
        }
      : undefined,
  });

  return new Response(JSON.stringify(res.data) as BodyInit, res);
}

export const AvanzaContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log(fetch);
  const [client] = useState(new AvanzaClient({ fetch: fetch }));

  return (
    <AvanzaContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </AvanzaContext.Provider>
  );
};
