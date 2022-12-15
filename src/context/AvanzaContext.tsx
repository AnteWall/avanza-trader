import React, { createContext, useEffect, useRef, useState } from "react";
import { AvanzaClient } from "avanza-ts";
import { HttpVerb } from "@tauri-apps/api/http";
import { useLocalStorage } from "@mantine/hooks";
import { Session } from "avanza-ts/dist/client/AuthClient";

interface AvanaContextData {
  client: AvanzaClient;
  isConnected: boolean;
}

export const AvanzaContext = createContext<AvanaContextData>({
  client: undefined as unknown as AvanzaClient,
  isConnected: false,
});

export async function fetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  // console.log(input);
  const { fetch } = await import("@tauri-apps/api/http");
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
  // console.log(res);
  return new Response(JSON.stringify(res.data) as BodyInit, res);
}

export const AvanzaContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useLocalStorage<Session | undefined>({
    key: "avanza-session",
    getInitialValueInEffect: false,
  });
  const client = useRef<AvanzaClient>(
    new AvanzaClient({
      fetch: fetch,
      onSessionChange: (session) => {
        setSession(session);
      },
    })
  );

  const isConnected = !!session && session.securityToken !== undefined;
  return (
    <AvanzaContext.Provider
      value={{
        client: client.current,
        isConnected,
      }}
    >
      {children}
    </AvanzaContext.Provider>
  );
};
