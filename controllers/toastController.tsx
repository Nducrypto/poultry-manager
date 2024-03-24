import { atom, useRecoilState } from "recoil";

interface ToastState {
  text1: string;
  text2: string;
  type: string;
  isVisible: boolean;
}

export const toastState = atom<ToastState>({
  key: "snackbarKey",
  default: {
    text1: "",
    text2: "",
    isVisible: false,
    type: "",
  },
});

export const useToast = () => {
  const [toast, setToast] = useRecoilState(toastState);
  const { text1, text2, type, isVisible } = toast;
  return {
    setToast,
    text1,
    text2,
    type,
    isVisible,
  };
};

export const toastSuccess = (message: string, type: string, setToast: any) => {
  setToast((prev: ToastState) => ({
    ...prev,
    text2: message,
    type: type,
    isVisible: true,
  }));
};

export const toastFailure = (message: string, type: string, setToast: any) => {
  setToast((prev: ToastState) => ({
    ...prev,
    text2: message,
    type: type,
    isVisible: true,
  }));
};
