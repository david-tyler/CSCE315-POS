import { useAuth } from "../Auth";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Unauthorized } from "../Unauthorized";

type ProtectedRouteProps = {
    element: ReactNode;
    auths: string[];
};

export const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({ element, auths }) => {
    const { role } = useAuth();
    if (!auths.includes(role)) {
        // user is not authenticated
        return <Unauthorized />;
    }
    return element;
};