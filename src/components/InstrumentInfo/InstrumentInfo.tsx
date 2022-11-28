import {
  Box,
  Divider,
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { InstrumentDetailsResponse } from "avanza-ts";
import React from "react";

interface InstrumentInfoProps {
  details?: InstrumentDetailsResponse | null;
  loading?: boolean;
}

const InstrumentInfo: React.FC<InstrumentInfoProps> = ({ details }) => {
  return (
    <Paper withBorder shadow="md" p="md">
      <Title order={4}>About</Title>
      <Text color="dimmed" size="xs">
        {details?.company.description}
      </Text>
      <Divider my="md" />
      <Stack>
        <SimpleGrid cols={2}>
          <Flex justify="space-between">
            <Text>CEO</Text>
            <Text weight="bold" align="right">
              {details?.company.ceo}
            </Text>
          </Flex>
          <Flex justify="space-between">
            <Text size="sm">Chairman</Text>
            <Text size="sm" weight="bold" align="right">
              {details?.company.chairman}
            </Text>
          </Flex>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};

export default InstrumentInfo;
