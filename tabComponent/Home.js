import * as React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';

const Home = () => {
    const deviceHeight = Dimensions.get('window').height;



    return<>
        <View style={{height:deviceHeight*0.05}}></View>
        <ScrollView>
            <Text>
            Home  
            </Text>
        </ScrollView>
    </>
}
export default Home