import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import EggManager from "./Components/Eggs/Eggs";
// import Treatment from "./Components/Treatment/Treatment";
// import Sales from "./Components/Sales/Sales";
// import EggPicks from "./Components/EggPicks/EggPicks";
// import Login from "./Components/Authentication/Login/Login";
// import SignUp from "./Components/Authentication/SignUp/SignUp";
import Home from "./Components/Home/Home";
// import BirdsManagement from "./Components/Costs/Birds/BirdsManagement";
// import CustomerList from "./Components/CustomerList/CustomerList";
// import Finance from "./Components/Finance/Finance";
// import ExpenseDetails from "./Components/Costs/ExpenseDetail/Expenses";
// import FeedManager from "./Components/Costs/Feeding/Feeding";
// import UtilityBill from "./Components/Costs/UtilityBill/UtilityBill";
import { RecoilRoot } from "recoil";
// import CustomToast from "./Components/CustomToast/CustomToast";
// import ForgotPassword from "./Components/Authentication/ForgotPassword/ForgotPassword";
// import CustomerDetail from "./Components/CustomerList/CustomerDetail";
// // import { LogBox } from "react-native";
// // LogBox.ignoreLogs([]);
import { enableScreens } from "react-native-screens";
enableScreens();

const Stack = createStackNavigator();

import { Text, View } from "react-native";

export default function App() {
  // const [utilityTitle, setUtilityTitle] = useState<string>("");

  return (
    <RecoilRoot>
      {/* <View>
        <Text>hhhhhhs</Text>
      </View> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          {/* <View style={{ marginTop: 100 }}>
            <Text>heaaaaaaaaad</Text>
          </View> */}
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>

    // <RecoilRoot>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen
    //         name="Home"
    //         options={{ headerShown: false }}
    //         component={Home}
    //       />

    //       <Stack.Screen name="Expenses">
    //         {(props: any) => (
    //           <ExpenseDetails {...props} setUtilityTitle={setUtilityTitle} />
    //         )}
    //       </Stack.Screen>
    //       <Stack.Screen
    //         name="Feeding"
    //         options={{ title: utilityTitle }}
    //         component={FeedManager}
    //       />
    //       <Stack.Screen
    //         name="UtilityBill"
    //         options={{ title: utilityTitle }}
    //         component={UtilityBill}
    //       />
    //       <Stack.Screen name="Eggs" component={EggManager} />
    //       <Stack.Screen name="Treatment" component={Treatment} />
    //       <Stack.Screen name="Sales" component={Sales} />
    //       <Stack.Screen name="Finance" component={Finance} />
    //       <Stack.Screen
    //         name="EggPicks"
    //         options={{ title: "Egg Picks" }}
    //         component={EggPicks}
    //       />
    //       <Stack.Screen name="Customers" component={CustomerList} />
    //       <Stack.Screen
    //         name="CustomerDetail"
    //         options={{ title: "Customer Detail" }}
    //         component={CustomerDetail}
    //       />
    //       <Stack.Screen name="Birds" component={BirdsManagement} />
    //       <Stack.Screen
    //         name="Login"
    //         options={{ headerShown: false }}
    //         component={Login}
    //       />

    //       <Stack.Screen
    //         name="ForgotPassword"
    //         options={{ headerShown: false }}
    //         component={ForgotPassword}
    //       />

    //       <Stack.Screen
    //         name="SignUp"
    //         options={{ headerShown: false }}
    //         component={SignUp}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    //   <CustomToast />
    // </RecoilRoot>
  );
}
