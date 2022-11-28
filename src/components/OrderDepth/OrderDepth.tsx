import { Text, Group, Grid, Stack, Progress, Paper } from "@mantine/core";
import { OrderDepthLevel } from "avanza-ts";
import React from "react";
import { useStyles } from "./OrderDepth.styles";

interface OrderDepthProps {
  orderDepth?: OrderDepthLevel[];
}

const Depth: React.FC<{
  depth: OrderDepthLevel;
  totalSellVolume?: number;
  totalBuyVolume?: number;
}> = ({ depth, totalBuyVolume = 0, totalSellVolume = 0 }) => {
  const { classes } = useStyles();

  return (
    <Grid>
      <Grid.Col span={6}>
        <Group position="apart">
          <Text fz="xs">{depth.buySide.volume}</Text>
          <Text fz="xs">{depth.buySide.priceString}</Text>
        </Group>
        <Progress
          color="blue"
          value={(depth.buySide.volume / totalBuyVolume) * 100}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Group position="apart">
          <Text fz="xs">{depth.sellSide.priceString}</Text>
          <Text fz="xs">{depth.sellSide.volume}</Text>
        </Group>
        <Progress
          className={classes.rotate180}
          color="red"
          value={(depth.sellSide.volume / totalSellVolume) * 100}
        />
      </Grid.Col>
    </Grid>
  );
};

const OrderDepth: React.FC<OrderDepthProps> = ({ orderDepth }) => {
  const totalSellVolume = orderDepth?.reduce(
    (acc, depth) => acc + depth.sellSide.volume,
    0
  );

  const totalBuyVolume = orderDepth?.reduce(
    (acc, depth) => acc + depth.buySide.volume,
    0
  );

  return (
    <Paper withBorder shadow="md">
      <Grid pb="md">
        <Grid.Col span={12}>
          <Grid pt="md" px="md">
            <Grid.Col span={6}>
              <Group position="apart">
                <Text fz="sm">Quantity</Text>
                <Text fz="sm">Buy</Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group position="apart">
                <Text fz="sm">Sell</Text>
                <Text fz="sm">Quantity</Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={12} px="xl">
          {((orderDepth ?? []).length > 0
            ? orderDepth ?? []
            : [
                {
                  buySide: {
                    priceString: "0",
                    volume: 0,
                    price: 0,
                  },
                  sellSide: {
                    price: 0,
                    priceString: "0",
                    volume: 0,
                  },
                },
              ]
          ).map((depth, index) => (
            <Depth
              depth={depth}
              totalBuyVolume={totalBuyVolume}
              totalSellVolume={totalSellVolume}
              key={`order-depth-${index}`}
            />
          ))}
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default OrderDepth;
