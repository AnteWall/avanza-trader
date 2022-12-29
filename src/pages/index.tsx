import { Title, Text, Table, ActionIcon } from "@mantine/core";
import dynamic from "next/dynamic";
import { Plus } from "react-feather";
import AccountsList from "../components/AccountsList";
import AuthWrapper from "../components/AuthWrapper";
import DataTable from "../components/DataTable";
import Navigation from "../components/Navigation";
import OrderDrawer from "../components/OrderDrawer";
import { useAccounts } from "../hooks/useAccounts";
import { useOrdersContext } from "../hooks/useOrdersContext";

const elements = [
  { securityId: "AAPL", name: "Apple Inc." },
  { securityId: "MSFT", name: "Microsoft" },
  { securityId: "TSLA", name: "Tesla Inc." },
];

function Home() {
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
  const isSSR = () => typeof window === "undefined";

  if (isSSR()) {
    return null;
  }
  return (
    <AuthWrapper>
      <Navigation
        title="Dashboard"
        // breadcrumbs={[{ title: "Dashboard" }, { title: "test", href: "/test" }]}
      >
        <AccountsList />
        <Text>Hello</Text>
        <Title>Hello</Title>
        <DataTable
          columns={[
            {
              title: "Name",
              accessor: "name",
            },
            {
              title: "ID",
              accessor: "id",
            },
          ]}
          records={[
            {
              id: "1",
              name: "test",
              securityId: "test",
            },
          ]}
        />
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
    </AuthWrapper>
  );
}
export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
