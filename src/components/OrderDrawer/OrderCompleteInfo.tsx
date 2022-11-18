import { Title, Text, Button, Flex } from "@mantine/core";
import Confetti from "react-confetti";

interface OrderCompleteInfoProps {
  quantity: number;
}

const OrderCompleteInfo: React.FC<OrderCompleteInfoProps> = ({ quantity }) => {
  return (
    <>
      <Confetti colors={["#FFF"]} numberOfPieces={50} opacity={0.3} />
      <Title order={4} weight="bold" color="#FFF">
        Congratulations!
      </Title>
      <Text mb="md" color="#FFF">
        You have purchased stock in AAPL
      </Text>

      <Flex
        py="md"
        mb="md"
        justify="space-between"
        sx={(theme) => ({
          borderBottom: `1px solid rgba(255,255,255,.3)`,
        })}
      >
        <Text fw="bold" fz="sm" color="#FFF">
          Amount invested
        </Text>
        <Text fz="sm" color="#FFF">
          123.32 SEK
        </Text>
      </Flex>
      <Flex
        py="md"
        mb="md"
        justify="space-between"
        sx={(theme) => ({
          borderBottom: `1px solid rgba(255,255,255,.3)`,
        })}
      >
        <Text fw="bold" fz="sm" color="#FFF">
          Quantity
        </Text>
        <Text fz="sm" color="#FFF">
          {quantity}
        </Text>
      </Flex>
      <Button fullWidth variant="white">
        Done
      </Button>
      <Button mt="sm" fullWidth variant="subtle">
        View order
      </Button>
    </>
  );
};

export default OrderCompleteInfo;
