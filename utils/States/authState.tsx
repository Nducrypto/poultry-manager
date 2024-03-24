import { atom, useRecoilState } from "recoil";

export interface UserProps {
  email: string;
  userId: string;
}

interface AllUserState {
  loggedInUser: UserProps | null;
  isAuthLoading: boolean;
  isAuthError: boolean | string;
}

export const userState = atom<AllUserState>({
  key: "userState",
  default: {
    loggedInUser: null,
    isAuthLoading: false,
    isAuthError: false,
  },
});

export const useAuthState = () => {
  const [authState, setAuthState] = useRecoilState(userState);
  const { loggedInUser, isAuthLoading, isAuthError } = authState;

  return {
    loggedInUser,
    isAuthLoading,
    isAuthError,
    setAuthState,
  };
};
