import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const AuthComponent: React.FC<P> = (props) => {
    const { loading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }
    }, [loading, router, user]);
    if (loading) {
      return <div>loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
