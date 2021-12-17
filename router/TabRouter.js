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
import SignUp from '../container/SignUp';
import * as ImagePicker from 'expo-image-picker';
import IdHelp from '../container/IdHelp';
import PassHelp from '../container/PassHelp';
import SignUpTerms from '../container/SignUp_Terms';
import Product_In_Detail from '../tabComponent/Product_In_Detail';
import Product_Out_Detail from '../tabComponent/Product_Out_Detail';
import Product_Out_Insert_Review from '../tabComponent/Product_Out_Insert_Review';
import Product_Review_Rewrite from '../tabComponent/Product_Review_Rewrite';
import Order_Input from '../container/Order_Input';
import Product_More_Deposit from '../tabComponent/Product_More_Deposit';
import Product_More_Event from '../tabComponent/Product_More_Event';
import Product_More_Notice from '../tabComponent/Product_More_Notice';
import Product_More_CS from '../tabComponent/Product_More_CS';
import Product_More_Member from '../tabComponent/Product_More_Member';
import Product_More_CS_List from '../tabComponent/Product_More_CS_List';
import Product_More_CS_Modify from '../tabComponent/Product_More_CS_Modify';
import Product_More_CS_FAQ from '../tabComponent/Product_More_CS_FAQ';
import Product_More_CS_Write from '../tabComponent/Product_More_CS_Write';
import TestTab from '../tabComponent/TestTab';
import TestTab_button from '../tabComponent/TestTab_button';

const TabRouter = () => {

    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    const MainStack = () => {
        return <>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
            {/* <Stack.Screen name="test" component={TestTab_button}/> */}
                {/* <Stack.Screen name="idHelp" component={IdHelp} /> */}
            
                {/* <Stack.Screen name="login" component={Login} /> */}
                <Stack.Screen name="order" component={Order_Input} />
                <Stack.Screen name="mainPage" component={MainPage} />
                <Stack.Screen name="productList" component={Product_1} />
                <Stack.Screen name="productDetail" component={Product_2} />
                <Stack.Screen name="signUpTerms" component={SignUpTerms} />
                <Stack.Screen name="signUpInput" component={SignUp} />
                <Stack.Screen name="idHelp" component={IdHelp} />
                <Stack.Screen name="pwHelp" component={PassHelp} />
            </Stack.Navigator>
        </>
    }

    const PullStack = () => {
        return<>
            <Stack.Navigator screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name="pullMain" component={Product_In}/>
                <Stack.Screen name="pullDetail" component={Product_In_Detail}/>
            </Stack.Navigator>
        </>
    }

    const PushStack = () => {
        return<>
            <Stack.Navigator screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name="pushMain" component={Product_Out}/>
                <Stack.Screen name="pushDetail" component={Product_Out_Detail}/>
                <Stack.Screen name="pushReview" component={Product_Out_Insert_Review}/>
            </Stack.Navigator>
        </>
    }

    const ReviewStack = () => {
        return<>
            <Stack.Navigator screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name="ReviewMain" component={Product_Review}/>
                <Stack.Screen name="ReviewRewrite" component={Product_Review_Rewrite}/>
            </Stack.Navigator>
        </>
    }
    const MoreStack = () => {
        return <>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="more" component={Product_More} />
                <Stack.Screen name="deposit" component={Product_More_Deposit} />
                <Stack.Screen name="event" component={Product_More_Event} />
                <Stack.Screen name="notice" component={Product_More_Notice}/>
                <Stack.Screen name="cs" component={Product_More_CS}/>
                <Stack.Screen name="csList" component={Product_More_CS_List}/>
                <Stack.Screen name="csModify" component={Product_More_CS_Modify}/>
                <Stack.Screen name="csFAQ" component={Product_More_CS_FAQ}/>
                <Stack.Screen name="csWrite" component={Product_More_CS_Write}/>
                <Stack.Screen name="member" component={Product_More_Member}/>
            </Stack.Navigator>
        </>
    }

    return <>
        <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            activeTintColor: 'black',
            inactiveTintColor: 'grey',
            tabBarInactiveBackgroundColor: 'black',
            tabBarActiveBackgroundColor: 'black',
        }}
        >
            <Tab.Screen name="Home" component={MainStack} options={{
                tabBarLabelStyle: styles.tabLabel,
                tabBarIcon: ({ size }) => {
                    size = 0
                }
            }} />
            <Tab.Screen name="수주관리" component={PullStack} options={{
                tabBarLabelStyle: styles.tabLabel,
                tabBarIcon: ({ size }) => {
                    size = 0
                }
            }} />
            <Tab.Screen name="발주관리" component={PushStack} options={{
                tabBarLabelStyle: styles.tabLabel,
                tabBarIcon: ({ size }) => {
                    size = 0
                }
            }} />
            <Tab.Screen name="리뷰관리" component={ReviewStack} options={{
                tabBarLabelStyle: styles.tabLabel,
                tabBarIcon: ({ size }) => {
                    size = 0
                }
            }} />
            <Tab.Screen name="더보기.." component={MoreStack} options={{
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
    tabLabel: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 45
    },
})

// const styles = StyleSheet.create({
//   screen: {
//     paddingTop:Constants.statusBarHeight
//   },
// });
