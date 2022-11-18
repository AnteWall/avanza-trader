import { Button } from "@mantine/core";
import React from "react";

const OrderActiveInfo: React.FC = () => {
  return (
    <>
      <Button mt="sm" fullWidth variant="white">
        Place order in background
      </Button>
      <Button mt="sm" fullWidth color="red" variant="subtle">
        Cancel order
      </Button>
    </>
  );
};

export default OrderActiveInfo;
