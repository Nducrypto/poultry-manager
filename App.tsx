import React, { useState } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs([""]);
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Price from "./Components/Price/Price";
import EggManager from "./Components/EggManager/EggManager";
import Medication from "./Components/Medication/Medication";
import Sales from "./Components/Sales/Sales";
import EggPicks from "./Components/EggPicks/EggPicks";
import Login from "./Components/Authentication/Login/Login";
import SignUp from "./Components/Authentication/SignUp/SignUp";
import Home from "./Components/Home/Home";
import BirdsManagement from "./Components/Costs/Birds/BirdsManagement";
import CustomerList from "./Components/CustomerList/CustomerList";
import Finance from "./Components/Finance/Finance";

import ExpenseDetails from "./Components/Costs/ExpenseDetail/Expenses";
import FeedManager from "./Components/Costs/Feeding/Feeding";
import UtilityBill from "./Components/Costs/UtilityBill/UtilityBill";
import { RecoilRoot } from "recoil";
import CustomToast from "./Components/CustomToast/CustomToast";

const Stack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState<boolean>(false);
  const [utilityTitle, setUtilityTitle] = useState<string>("");

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
            }}
            component={Home}
          />

          <Stack.Screen name="Expenses">
            {(props: any) => (
              <ExpenseDetails {...props} setUtilityTitle={setUtilityTitle} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Feeding" component={FeedManager} />
          <Stack.Screen
            name="UtilityBill"
            options={{
              title: utilityTitle,
            }}
            component={UtilityBill}
          />
          <Stack.Screen name="Price" component={Price} />
          <Stack.Screen name="Egg" component={EggManager} />
          <Stack.Screen name="Medication" component={Medication} />
          <Stack.Screen name="Sales" component={Sales} />
          <Stack.Screen name="Finance" component={Finance} />
          <Stack.Screen
            name="EggPicks"
            options={{
              title: "Egg Picks",
            }}
            component={EggPicks}
          />
          <Stack.Screen name="Customers" component={CustomerList} />
          <Stack.Screen name="Birds" component={BirdsManagement} />
          <Stack.Screen
            name="Login"
            options={{
              title: "",
            }}
          >
            {(props: any) => (
              <Login {...props} setCurrentUser={setCurrentUser} />
            )}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
      <CustomToast />
    </RecoilRoot>
  );
}
