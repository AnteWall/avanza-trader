import { NextRouter, useRouter } from "next/router";
import { useCallback } from "react";
import { isUnauthorized, parseErrorMessage } from "../../utils/error";
import { loginPath } from "../../utils/routes";
import { useAvanza } from "../useAvanza";
import { useCache } from "../useCache";
import { showNotification } from "@mantine/notifications";
import { errorNotification } from "../../utils/notifications";
import { AccountsOverviewResponse, AvanzaClient } from "avanza-ts";

export function useAccounts() {
  const { client } = useAvanza();
  const { replace } = useRouter();

  const onError = useCallback((error: Error) => {
    onAvanzaUnauthorized(error, client, replace);
  }, []);

  const data = useCache<AccountsOverviewResponse>(
    () => {
      return client.account.getOverview();
    },
    `AVANZA_ACCOUNTS`,
    {
      onError,
    }
  );
  return data;
}
function onAvanzaUnauthorized(
  error: Error,
  client: AvanzaClient,
  replace: NextRouter["replace"]
) {
  const err = parseErrorMessage(error);
  if (isUnauthorized(err)) {
    client.disconnect();
    replace(loginPath());
    showNotification({
      ...errorNotification(err, {
        title: "Unauthorized",
      }),
    });
  }
}
