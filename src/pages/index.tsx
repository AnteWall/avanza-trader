import { Title, Text } from "@mantine/core";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <Navigation
      title="Dashboard"
      breadcrumbs={[{ title: "hello" }, { title: "test", href: "/test" }]}
    >
      Hello
      <Text>Hello</Text>
      <Title>Hello</Title>
    </Navigation>
  );
}
