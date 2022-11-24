import { Group, Text, Anchor, Kbd } from "@mantine/core";
import React from "react";
import { getOS, Platform } from "../../utils/platform";

interface SpotlightActionsWrapperProps {
  children: React.ReactNode;
}

const SpotlightActionsWrapper: React.FC<SpotlightActionsWrapperProps> = ({
  children,
}) => {
  return (
    <div>
      {children}
      <Group
        position="apart"
        px={15}
        py="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        })}
      >
        <Text size="xs" color="dimmed">
          You can access this menu by pressing
          {getOS() === Platform.Mac ? (
            <>
              <Kbd ml="sm">⌘</Kbd> + <Kbd>K</Kbd>
            </>
          ) : (
            <>
              <Kbd ml="sm">Ctrl</Kbd> + <Kbd>K</Kbd>
            </>
          )}
        </Text>
      </Group>
    </div>
  );
};

export default SpotlightActionsWrapper;
