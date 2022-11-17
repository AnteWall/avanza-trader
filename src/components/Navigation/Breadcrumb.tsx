import { Text, Anchor } from "@mantine/core";
import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  title: string;
  href?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, href }) => {
  if (!href) {
    return <Text>{title}</Text>;
  }
  return (
    <Link href={href}>
      <Anchor>{title}</Anchor>
    </Link>
  );
};

export default Breadcrumb;
