import { useAvanza } from "../useAvanza";

export function useAccounts() {
  const { client } = useAvanza();
  const data = "none"; // useCache(() => client.account.getPositions(), `AVANZA_ACCOUNTS`);
  return data;
}
