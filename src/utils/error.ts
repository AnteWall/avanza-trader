export const parseErrorMessage = (error: Error) => {
  try {
    return JSON.parse(error.message);
  } catch (e) {
    return error;
  }
};

export const isUnauthorized = (error: any | object) => {
  if (typeof error === "string") {
    return (
      error.toLowerCase().includes("unauthorized") ||
      error.toLowerCase().includes("access denied")
    );
  }
  if (typeof error === "object") {
    return error.statusCode === 401;
  }
  return false;
};

export const extractErrorMessage = (error: any | object): string => {
  if (typeof error === "object") {
    return `${error.message}${
      error?.errors.lenght > 0 ? ":" : ""
    } ${error?.errors.join("\n")}`;
  }
  return error.message;
};
