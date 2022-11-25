import { NotificationProps } from "@mantine/notifications";
import { XCircle } from "react-feather";
import { extractErrorMessage } from "./error";

export const errorNotification = (
  error: any | object,
  opts: Partial<NotificationProps> = {}
): NotificationProps => {
  return {
    color: "red",
    icon: <XCircle />,
    title: "Error requesting data",
    autoClose: false,
    message: extractErrorMessage(error),
    ...opts,
  };
};
