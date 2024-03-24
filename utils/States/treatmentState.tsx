import { atom, useRecoilState } from "recoil";

export interface TreatmentProps {
  name: string;
  duration: number | string;
  durationText: string;
  nextDueDate: any;
  lastDueDate: any;
  id?: string;
  timeStamp: number;
  userId: string;
}
interface TreatmentState {
  treatmentList: TreatmentProps[];
  loadingTreatment: boolean;
  errorMessage: string;
}
export const treatment = atom<TreatmentState>({
  key: "treatment",
  default: { treatmentList: [], loadingTreatment: false, errorMessage: "" },
});

export function useTreatmentState() {
  const [treatmentState, setTreatmentState] = useRecoilState(treatment);
  const { treatmentList, loadingTreatment, errorMessage } = treatmentState;
  return {
    treatmentList,
    loadingTreatment,
    errorMessage,
    setTreatmentState,
  };
}
