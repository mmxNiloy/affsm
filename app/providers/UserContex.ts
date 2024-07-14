import React from "react";
import { User } from "../../util/types";

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = React.createContext<Props>({
  user: undefined,
  setUser: () => undefined,
});

export default UserContext;
