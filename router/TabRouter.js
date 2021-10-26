import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Product_In from '../tabComponent/Product_In';
import Product_Out from '../tabComponent/Product_Out';
import Product_More from '../tabComponent/Product_More';
import Product_Review from '../tabComponent/Product_Review';
import Home from '../tabComponent/Home';
import { createStackNavigator } from '@react-navigation/stack';
import Product_1 from '../component/Product_1';
import Product_2 from '../component/Product_2';

const TabRouter = () => {

    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    
    const StackNavi = () => {
        return <>
            <Stack.Navigator screenOptions={{
                headerShown:false,
            }}>
                <Stack.Screen name="product1" component={Product_1}/>
                <Stack.Screen name="product2" component={Product_2}/>
            </Stack.Navigator>
        </>
    }
    
    return<>
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name="home" component={StackNavi}></Tab.Screen>
            <Tab.Screen name="product_in" component={Product_In}></Tab.Screen>
            <Tab.Screen name="product_out" component={Product_Out}></Tab.Screen>
            <Tab.Screen name="product_review" component={Product_Review}></Tab.Screen>
            <Tab.Screen name="product_more" component={Product_More}></Tab.Screen>
        </Tab.Navigator>
    </>

}
export default TabRouter