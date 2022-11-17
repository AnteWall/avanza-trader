import {
  Drawer,
  Title,
  Text,
  Button,
  Box,
  Flex,
  RingProgress,
  Progress,
  useMantineTheme,
  Loader,
  Center,
  ThemeIcon,
  Stack,
  TextInput,
  Group,
  Grid,
} from "@mantine/core";
import { useState } from "react";
import { Check, CheckCircle } from "react-feather";

interface OrderDrawerProps {}

enum OrderState {
  Creating = "Creating",
  Pending = "Pending",
  Active = "Active",
  Completed = "Completed",
}

const OrderDrawer: React.FC<OrderDrawerProps> = ({}) => {
  const [orderState, setOrderState] = useState<OrderState>(OrderState.Creating);
  const [filledQuantity, setFilledQuantity] = useState(0);
  const [quantity, setQuantity] = useState(42);
  const theme = useMantineTheme();
  return (
    <Drawer
      size="lg"
      position="right"
      opened={true}
      onClose={function (): void {}}
    >
      <Flex sx={{ height: "calc(100% - 44px)" }} direction="column">
        <Box p="md" sx={{ flex: 2 }}>
          <Title order={3}>Apple Inc.</Title>
          <Text fz="sm">AAPL</Text>
        </Box>
        <Box>
          <Grid>
            <Grid.Col span={6}>
              <Stack spacing="xs" p="md">
                <Group position="apart">
                  <Text fz="sm">Quantity</Text>
                  <Text fz="sm">Buy</Text>
                </Group>
                <Group position="apart">
                  <Text fz="xs">124</Text>
                  <Text fz="xs">$127.32</Text>
                </Group>
                <Progress color="blue" value={73} />
                <Group position="apart">
                  <Text fz="xs">124</Text>
                  <Text fz="xs">$127.32</Text>
                </Group>
                <Progress color="blue" value={23} />
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack spacing="xs" p="md">
                <Group position="apart">
                  <Text fz="sm">Sell</Text>
                  <Text fz="sm">Quantity</Text>
                </Group>
                <Group position="apart">
                  <Text fz="xs">$128.32</Text>
                  <Text fz="xs">1245</Text>
                </Group>
                <Progress
                  sx={{ transform: "rotate(180deg)" }}
                  color="red"
                  value={73}
                />
                <Group position="apart">
                  <Text fz="xs">$127.32</Text>
                  <Text fz="xs">124</Text>
                </Group>
                <Progress
                  sx={{ transform: "rotate(180deg)" }}
                  color="red"
                  value={23}
                />
              </Stack>
            </Grid.Col>
          </Grid>
        </Box>
        <Box p="md">
          <TextInput label="Belopp" />
          <TextInput label="Antal" />
          <TextInput label="Kurs" />
        </Box>
        <Box sx={{ maxHeight: 60, flex: "auto" }}>
          <Button
            onClick={() => {
              setOrderState(OrderState.Pending);

              setTimeout(() => {
                setOrderState(OrderState.Active);
              }, 2000);
              setTimeout(() => {
                setFilledQuantity(quantity / 4);
              }, 3000);
              setTimeout(() => {
                setFilledQuantity(quantity / 3);
              }, 3500);
              setTimeout(() => {
                setFilledQuantity(quantity / 2);
              }, 4000);
              setTimeout(() => {
                setFilledQuantity(quantity);
                setOrderState(OrderState.Completed);
              }, 6000);
            }}
            sx={{ borderRadius: 0 }}
            fullWidth
            size="xl"
          >
            Place order
          </Button>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              transform: `translate(0%, ${
                orderState === OrderState.Creating ? "100%" : "0px"
              })`,
              background: theme.colors.green[7],
            }}
          >
            <Flex
              sx={{ height: "100%", width: "100%" }}
              justify="center"
              align="center"
              onClick={() => {
                setOrderState(OrderState.Creating);
              }}
            >
              {orderState === OrderState.Pending && (
                <Loader size={94} color="white" />
              )}
              {(orderState === OrderState.Active ||
                orderState === OrderState.Completed) && (
                <Stack align="center" color="white">
                  <Text mt={-40} color="#FFF">
                    {filledQuantity} of {quantity} filled
                  </Text>
                  <RingProgress
                    sections={[
                      {
                        value:
                          filledQuantity === 0
                            ? 0
                            : (filledQuantity / quantity) * 100,
                        color: "white",
                      },
                    ]}
                    thickness={11}
                    size={116}
                    label={
                      <Center>
                        {orderState === OrderState.Completed ? (
                          <ThemeIcon
                            color="white"
                            variant="filled"
                            radius={90}
                            size={40}
                          >
                            <Check size={22} color="green" />
                          </ThemeIcon>
                        ) : (
                          <Text color="#FFF">
                            {((filledQuantity / quantity) * 100).toFixed(0)}%
                          </Text>
                        )}
                      </Center>
                    }
                  />
                </Stack>
              )}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Drawer>
  );
};

export default OrderDrawer;
