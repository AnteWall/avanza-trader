import { Title, Text } from "@mantine/core";
import Navigation from "../components/Navigation";
import OrderDrawer from "../components/OrderDrawer";

export default function Home() {
  return (
    <Navigation
      title="Dashboard"
      breadcrumbs={[{ title: "hello" }, { title: "test", href: "/test" }]}
    >
      Hello
      <Text>Hello</Text>
      <Title>Hello</Title>
      <OrderDrawer />
    </Navigation>
  );
}
