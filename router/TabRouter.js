import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Product_In from '../tabComponent/Product_In';
import Product_Out from '../tabComponent/Product_Out';
import Product_More from '../tabComponent/Product_More';
import Product_Review from '../tabComponent/Product_Review';
import { createStackNavigator } from '@react-navigation/stack';
import Product_1 from '../container/Product_1';
import Product_2 from '../container/Product_2';
import { StyleSheet } from 'react-native';
import MainPage from '../container/MainPage';
import Login from '../container/Login';
import SignUp_Terms from '../container/SignUp_Terms';
import SignUp from '../container/SignUp';

const TabRouter = () => {

    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    
    const StackNavi = () => {
        return <>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="product0" component={MainPage} />
                <Stack.Screen name="product1" component={Product_1} />
                <Stack.Screen name="product2" component={Product_2} />
                <Stack.Screen name="signUpTerms" component={SignUp_Terms} />
                <Stack.Screen name="signUpInput" component={SignUp}/>
                
            </Stack.Navigator>
        </>
    }
    
    return<>
        <Tab.Navigator screenOptions={{
                headerShown:false,
                activeTintColor:'black',
                inactiveTintColor:'grey',
                tabBarInactiveBackgroundColor:'black',
                tabBarActiveBackgroundColor:'black',
                }}>

            <Tab.Screen name="Home" component={StackNavi} options={{
                tabBarLabelStyle: styles.tabLabel,
                tabBarIcon: ({ size }) => {
                    size = 0
                }
            }} />
            <Tab.Screen name="수주관리" component={Product_In} options={{
                tabBarLabelStyle:styles.tabLabel,
                tabBarIcon:({size})=>{
                    size=0
                }
            }}/>
            <Tab.Screen name="발주관리" component={Product_Out} options={{
                tabBarLabelStyle:styles.tabLabel,
                tabBarIcon:({size})=>{
                    size=0
                }
            }}/>
            <Tab.Screen name="리뷰관리" component={Product_Review} options={{
                tabBarLabelStyle:styles.tabLabel,
                tabBarIcon:({size})=>{
                    size=0
                }
            }} />
            <Tab.Screen name="더보기.." component={Product_More} options={{
                tabBarLabelStyle: styles.tabLabel,
                tabBarIcon: ({ size }) => {
                    size = 0
                }
            }} />
        </Tab.Navigator>
    </>

}
export default TabRouter

const styles = StyleSheet.create({
    tabLabel:{
        fontSize:15,
        textAlign:'center',
        lineHeight:45
    },
})

// const styles = StyleSheet.create({
//   screen: {
//     paddingTop:Constants.statusBarHeight
//   },
// });
