import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
  Container,
  Flex,
  Collapse,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import Image from "next/image";
import { useState } from "react";
import BankID from "../../public/bankid-vector-logo.svg";
import { useAvanza } from "../hooks/useAvanza";
import { toDataURL } from "qrcode";
import { useRouter } from "next/router";
import { homePath } from "../utils/routes";

enum LoginState {
  SSN = "SSN",
  QRCODE = "QRCODE",
}

const LoginPage = () => {
  const router = useRouter();
  const [currentState, setCurrentState] = useState(LoginState.SSN);
  const [ssn, setSSN] = useInputState("");
  const [qrString, setQrString] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { client } = useAvanza();

  const login = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await client.authenticateWithBankID(ssn, async (qrCode) => {
        const dataUrl = await toDataURL(qrCode);
        setQrString(dataUrl);
        setCurrentState(LoginState.QRCODE);
        setLoading(false);
      });
      setCurrentState(LoginState.SSN);
      router.replace(homePath());
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" sx={{ height: "100%" }}>
      {error && <>{JSON.stringify(error)}</>}
      <Flex align="center" justify="center" sx={{ height: "100%" }}>
        <Paper radius="md" p="xl" withBorder sx={{ width: "400px" }}>
          <Text align="center" size="lg" weight={500}>
            Welcome to Avanza Trader
          </Text>

          <Divider label="Sign in with BankID" labelPosition="center" my="lg" />

          <Collapse in={currentState === LoginState.SSN}>
            <Stack>
              <TextInput
                label="Social security number"
                placeholder="19900101-1234"
                value={ssn}
                onChange={setSSN}
              />
            </Stack>
            <Group position="apart" mt="xl">
              <Button
                fullWidth
                size="lg"
                type="submit"
                loading={loading}
                disabled={loading || !ssn}
                variant="outline"
                color="teal"
                onClick={() => login()}
              >
                <Text component="span">Sign in</Text>
                <Image alt="Bankid logo" src={BankID} height={32} width={64} />
              </Button>
            </Group>
          </Collapse>
          <Collapse in={currentState === LoginState.QRCODE}>
            <Text align="center" size="sm" weight={500}>
              Start your BankID application and scan the QR code to continue
            </Text>
            <Group position="center" mt="xl">
              {qrString && (
                <Image alt="QRCode" src={qrString} width={180} height={180} />
              )}
            </Group>
          </Collapse>
        </Paper>
      </Flex>
    </Container>
  );
};

export default LoginPage;
