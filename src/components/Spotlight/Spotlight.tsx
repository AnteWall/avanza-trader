import { useDebouncedState } from "@mantine/hooks";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Home, LogOut } from "react-feather";
import { useAvanza } from "../../hooks/useAvanza";
import { useGlobalSearch } from "../../hooks/useGlobalSearch";
import { homePath, loginPath, orderBookPath } from "../../utils/routes";
import SpotlightActionsWrapper from "../SpotlightActionsWrapper";

interface SpotlightProps {
  children: React.ReactNode;
}

const Spotlight: React.FC<SpotlightProps> = ({ children }) => {
  const router = useRouter();
  const { client } = useAvanza();

  const [query, setQuery] = useDebouncedState("", 200);
  const { data, error, isFetching } = useGlobalSearch(query);
  const [actions, setActions] = useState<SpotlightAction[]>([]);
  useEffect(() => {
    if (data) {
      const actions = data.resultGroups.map((group) => {
        return group.hits.map((item) => {
          return {
            group: group.instrumentType,
            title: item.link.linkDisplay,
            description: item.link.shortLinkDisplay,
            // icon: item.lastPrice,
            onTrigger: () => {
              console.log(group.instrumentType, item.link.orderbookId);
              router.push(
                orderBookPath(group.instrumentType, item.link.orderbookId)
              );
            },
          };
        });
      });
      const flattenActions = actions.reduce(
        (accumulator: SpotlightAction[], value: SpotlightAction[]) =>
          accumulator.concat(value),
        []
      );
      setActions(flattenActions);
    }
  }, [data]);

  return (
    <SpotlightProvider
      highlightColor="teal"
      highlightQuery
      onQueryChange={(value) => setQuery(value)}
      actions={[
        ...actions,
        {
          title: "Dashboard",
          group: "Navigation",
          description: "Go to dashboard page",
          onTrigger: () => {
            router.push(homePath());
          },
          icon: <Home />,
        },
        {
          title: "Sign out",
          group: "Navigation",
          description: "Sign out of your account",
          onTrigger: () => {
            client.disconnect();
            router.replace(loginPath());
          },
          icon: <LogOut />,
        },
      ]}
      actionsWrapperComponent={SpotlightActionsWrapper}
    >
      {children}
    </SpotlightProvider>
  );
};

export default Spotlight;
