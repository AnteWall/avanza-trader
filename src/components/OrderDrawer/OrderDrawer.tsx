import {
  Drawer,
  Title,
  Text,
  Button,
  Box,
  Flex,
  Progress,
  useMantineTheme,
  Loader,
  Stack,
  TextInput,
  Group,
  Grid,
  Collapse,
} from "@mantine/core";
import { useState } from "react";
import OrderCompleteInfo from "./OrderCompleteInfo";
import OrderActiveInfo from "./OrderActiveInfo";
import OrderProgress from "./OrderProgress";
import { useStyles } from "./OrderDrawer.styles";
import CurrencyInput from "../CurrencyInput";

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
  const [quantity] = useState(42);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const isComplete = orderState === OrderState.Completed;
  const isPending = orderState === OrderState.Pending;
  const isActive = orderState === OrderState.Active;
  const isCreating = orderState === OrderState.Creating;

  return (
    <Drawer
      size="lg"
      position="right"
      opened={true}
      onClose={function (): void {}}
    >
      <Flex className={classes.root} direction="column">
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
                  className={classes.rotate180}
                  color="red"
                  value={73}
                />
                <Group position="apart">
                  <Text fz="xs">$127.32</Text>
                  <Text fz="xs">124</Text>
                </Group>
                <Progress
                  className={classes.rotate180}
                  color="red"
                  value={23}
                />
              </Stack>
            </Grid.Col>
          </Grid>
        </Box>
        <Box p="md">
          <CurrencyInput label="Amount" currency="USD" />
          <Group mt="sm" grow>
            <TextInput label="Antal" placeholder="100" />
            <CurrencyInput label="Kurs" placeholder="123.32 " currency="USD" />
          </Group>
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
            className={classes.progressOverlay}
            sx={{
              transform: `translate(0%, ${isCreating ? "100%" : "0px"})`,
            }}
          >
            <Flex
              sx={{ height: "100%", width: "100%" }}
              justify="center"
              align="center"
              onClick={() => {
                setOrderState(OrderState.Creating);
                setFilledQuantity(0);
              }}
            >
              <Stack align="center" color="white">
                <Collapse in={isPending}>
                  <Loader size={94} color="white" />
                </Collapse>
                <Collapse in={isActive || isComplete}>
                  <OrderProgress
                    filledQuantity={filledQuantity}
                    quantity={quantity}
                    isComplete={isComplete}
                  />
                </Collapse>
                <Collapse sx={{ textAlign: "center" }} in={isActive}>
                  <OrderActiveInfo />
                </Collapse>
                <Collapse sx={{ textAlign: "center" }} in={isComplete}>
                  <OrderCompleteInfo quantity={quantity} />
                </Collapse>
              </Stack>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Drawer>
  );
};

export default OrderDrawer;
