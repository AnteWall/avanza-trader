import {
  AppShell,
  Flex,
  Box,
  Header,
  useMantineTheme,
  Title,
  Breadcrumbs,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";
import React from "react";
import { BarChart, Search } from "react-feather";
import SessionMenu from "../SessionMenu";
import Breadcrumb from "./Breadcrumb";

interface NavigationProps {
  title: string;
  breadcrumbs?: Array<{ title: string; href?: string }>;
  children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({
  title,
  breadcrumbs = [],
  children,
}) => {
  const { openSpotlight } = useSpotlight();
  const theme = useMantineTheme();
  return (
    <AppShell
      header={
        <Header height={80}>
          <Flex sx={{ height: "100%" }} align="center" justify="space-between">
            <Flex
              px="md"
              justify="center"
              align="center"
              sx={{ height: "100%" }}
            >
              <BarChart color={theme.colors.green[6]} size={48} />
              <Box ml="md">
                <Title order={4}>{title}</Title>
                <Box>
                  <Breadcrumbs>
                    {breadcrumbs.map((breadcrumb, index) => (
                      <Breadcrumb
                        key={`${index}-${breadcrumb.title}`}
                        title={breadcrumb.title}
                        href={breadcrumb.href}
                      />
                    ))}
                  </Breadcrumbs>
                </Box>
              </Box>
            </Flex>
            <Flex justify="center" align="center">
              <ActionIcon
                onClick={openSpotlight}
                mx="md"
                size="lg"
                title="Search"
              >
                <Search />
              </ActionIcon>

              <SessionMenu />
            </Flex>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Navigation;
