import { useEffect } from "react";
import { onAuthStateChanged, auth } from "../config/firebase";
import { useAuthState } from "../utils/States/authState";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../utils/stackParamList";

export const useAuthentication = () => {
  const { setAuthState } = useAuthState();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    setAuthState((prev) => ({
      ...prev,
      isUserLoading: true,
      isAuthError: false,
    }));
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data: any = {
          email: user?.email,
          userId: user?.uid,
        };
        setAuthState((prev) => ({
          ...prev,
          loggedInUser: data,
          isAuthLoading: false,
        }));
        navigation.navigate("Home");
      } else {
        setAuthState((prev) => ({
          ...prev,
          loggedInUser: null,
          isAuthLoading: false,
          isAuthError: `User Signed Out`,
        }));
        navigation.navigate("Login");
      }
    });

    return unSubscribe;
  }, [setAuthState]);
};
