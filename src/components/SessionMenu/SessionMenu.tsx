import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import React from "react";
import { ChevronDown, LogOut } from "react-feather";
import { useStyles } from "./SessionMenu.styles";

interface SessionMenuProps {}

const SessionMenu: React.FC<SessionMenuProps> = ({}) => {
  const { classes } = useStyles();
  const name = "John Doe";
  const email = "johndoe@doe.com";
  return (
    <Menu withArrow width={180}>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar alt={name} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>

              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </div>

            {<ChevronDown size={14} />}
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<LogOut size={14} />}>Sign out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SessionMenu;
