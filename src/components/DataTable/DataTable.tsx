import React from "react";
import {
  DataTable as MDataTable,
  DataTableProps as MDataTableProps,
} from "mantine-datatable";
import { useAccounts } from "../../hooks/useAccounts";

function DataTable<T extends any>({ ...otherProps }: MDataTableProps<T>) {
  const { data, error, isFetching } = useAccounts();
  return (
    <MDataTable<T>
      withBorder
      withColumnBorders
      striped
      highlightOnHover
      {...otherProps}
    />
  );
}

export default DataTable;
