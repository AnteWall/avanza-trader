import { Box, Card, Flex, Text, Title } from "@mantine/core";
import React from "react";
import { useAccounts } from "../../hooks/useAccounts";

interface AccountsListProps {}

const AccountsList: React.FC<AccountsListProps> = ({}) => {
  const { data, isFetching, error } = useAccounts();
  if (isFetching || !data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Title order={3} mb="md">
        Accounts
      </Title>
      {data.accounts.map((account) => {
        return (
          <Card mb="md" key={account.accountId}>
            <Flex justify="space-between" align="center">
              <Box>
                <Text>{account.name}</Text>
                <Text size="sm" color="dimmed">
                  {account.accountType} ({account.accountId})
                </Text>
              </Box>
              <Box>
                <Text weight="bold" color="green">
                  {account.performancePercent.toFixed(2)}%
                </Text>
              </Box>
            </Flex>
          </Card>
        );
      })}
    </div>
  );
};

export default AccountsList;
