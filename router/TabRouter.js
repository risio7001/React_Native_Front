import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const TabRouter = () => {
    const Tab = createBottomTabNavigator();
    
    return<>
        <Tab.Navigator>
            <Tab.Screen name=""></Tab.Screen>
        </Tab.Navigator>
    </>

}
export default TabRouter