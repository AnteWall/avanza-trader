import { SpotlightProvider } from "@mantine/spotlight";
import { useRouter } from "next/router";
import React from "react";
import { Home, LogOut } from "react-feather";
import { useAvanza } from "../../hooks/useAvanza";
import { homePath, loginPath } from "../../utils/routes";
import SpotlightActionsWrapper from "../SpotlightActionsWrapper";

interface SpotlightProps {
  children: React.ReactNode;
}

const Spotlight: React.FC<SpotlightProps> = ({ children }) => {
  const router = useRouter();
  const { client } = useAvanza();
  return (
    <SpotlightProvider
      highlightColor="teal"
      highlightQuery
      actions={[
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
