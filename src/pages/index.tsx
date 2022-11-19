import { Title, Text, Table, ActionIcon } from "@mantine/core";
import { Plus } from "react-feather";
import Navigation from "../components/Navigation";
import OrderDrawer from "../components/OrderDrawer";
import { useOrdersContext } from "../hooks/useOrdersContext";

const elements = [
  { securityId: "AAPL", name: "Apple Inc." },
  { securityId: "MSFT", name: "Microsoft" },
  { securityId: "TSLA", name: "Tesla Inc." },
];

export default function Home() {
  const { openPlaceOrder } = useOrdersContext();

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.securityId}</td>
      <td align="right">
        <ActionIcon onClick={() => openPlaceOrder(element.securityId)}>
          <Plus />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <Navigation
      title="Dashboard"
      breadcrumbs={[{ title: "hello" }, { title: "test", href: "/test" }]}
    >
      Hello
      <Text>Hello</Text>
      <Title>Hello</Title>
      <Table>
        <thead>
          <tr>
            <th>Company</th>
            <th>SecurityID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Navigation>
  );
}
