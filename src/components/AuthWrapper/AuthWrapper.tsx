import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAvanza } from "../../hooks/useAvanza";
import { loginPath } from "../../utils/routes";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { client, isConnected } = useAvanza();
  const router = useRouter();
  useEffect(() => {
    if (!isConnected) {
      router.replace(loginPath());
    }
  }, [isConnected]);

  if (!isConnected) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
