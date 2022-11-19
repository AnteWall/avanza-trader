import { Text, TextInput, Divider, TextInputProps } from "@mantine/core";
import React from "react";
import { Noto_Emoji } from "@next/font/google";

const notoEmoji = Noto_Emoji({});

interface CurrencyInputProps extends TextInputProps {
  label: string;
  currency: string;
}
const data = [{ value: "eur", label: "🇪🇺 EUR" }];
const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  currency,
  ...otherProps
}) => {
  return (
    <Text ff={notoEmoji.style.fontFamily}>
      <TextInput
        type="number"
        placeholder="1000"
        label={label}
        rightSection={
          <>
            <Divider mr="md" orientation="vertical" />
            <Text align="center" fz="sm">
              {currency}
            </Text>
          </>
        }
        rightSectionWidth={92}
        {...otherProps}
      />
    </Text>
  );
};

export default CurrencyInput;
