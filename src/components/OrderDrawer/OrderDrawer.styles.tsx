import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  root: {
    height: "calc(100% - 58px)",
  },
  progressOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
    background: theme.colors.green[7],
  },
  rotate180: {
    transform: "rotate(180deg)",
  },
}));
