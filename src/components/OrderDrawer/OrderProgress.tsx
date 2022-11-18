import { Text, Center, RingProgress, ThemeIcon } from "@mantine/core";
import { Check } from "react-feather";

interface OrderProgressProps {
  filledQuantity: number;
  quantity: number;
  isComplete: boolean;
}

const OrderProgress: React.FC<OrderProgressProps> = ({
  filledQuantity,
  quantity,
  isComplete,
}) => {
  return (
    <RingProgress
      sections={[
        {
          value: filledQuantity === 0 ? 0 : (filledQuantity / quantity) * 100,
          color: "white",
        },
      ]}
      thickness={4}
      size={116}
      label={
        <Center>
          {isComplete ? (
            <ThemeIcon color="white" variant="filled" radius={90} size={40}>
              <Check size={22} color="green" />
            </ThemeIcon>
          ) : (
            <Text fz="lg" fw="bold" color="#FFF">
              {((filledQuantity / quantity) * 100).toFixed(0)}%
            </Text>
          )}
        </Center>
      }
    />
  );
};

export default OrderProgress;
