import { useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { Center, Loader } from "@mantine/core";

const WithAuth = (Component) => {
  return (props) => {
    const { loading, checkAuthstatus } = useAuthStore();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const verifyAuth = async () => {
        await checkAuthstatus();
        setChecking(false);
      };

      verifyAuth();
    }, [checkAuthstatus]);

    if (checking || loading) {
      return (
        <Center h={200}>
          <Loader size="sm" />
        </Center>
      );
    }

    return <Component {...props} />;
  };
};

export default WithAuth;