import {
  AppShell,
  Flex,
  Box,
  Header,
  useMantineTheme,
  Title,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import React from "react";
import { BarChart } from "react-feather";
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
                        key={breadcrumb.title}
                        title={breadcrumb.title}
                        href={breadcrumb.href}
                      />
                    ))}
                  </Breadcrumbs>
                </Box>
              </Box>
            </Flex>
            <Box>
              <SessionMenu />
            </Box>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Navigation;
