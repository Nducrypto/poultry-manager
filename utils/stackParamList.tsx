import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Expenses: undefined;
  Feeding: undefined;
  Utilities: undefined;
  Price: undefined;
  Forecast: undefined;
  Medication: undefined;
  Sales: undefined;
  Finance: undefined;
  EggPicks: undefined;
  Customers: undefined;
  Birds: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  CustomerDetail: undefined;
};

export default RootStackParamList;
export type NavigationProps = StackNavigationProp<RootStackParamList>;
