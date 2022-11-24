import { useRouter } from "next/router";
import { useEffect } from "react";
import { loginPath } from "../../utils/routes";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const isConnected = true;
  const router = useRouter();
  useEffect(() => {
    if (!isConnected) {
      router.replace(loginPath());
    }
  }, [isConnected]);
  return <>{children}</>;
};

export default AuthWrapper;
