import * as React from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import Arrow from '../img/arrow.svg';

const Product_In = () => {

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    return <>
        <View style={{ width: deviceWidth, height: (deviceHeight * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (deviceWidth * 0.95), height: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </View>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>수주관리</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <View style={{width:deviceWidth, height:deviceHeight*0.06, backgroundColor:'red', flexDirection:'row', justifyContent:'space-around'}}>
            <Text style={{backgroundColor:'blue', flex:1}}>접수대기</Text>
            <Text style={{backgroundColor:'red', flex:1}}>입금확인중</Text>
            <Text style={{backgroundColor:'black', flex:1}}>처리중</Text>
            <Text style={{backgroundColor:'grey', flex:1}}>완료</Text>
            <Text style={{backgroundColor:'blue', flex:1}}>취소 내역</Text>
        </View>
        <View>
            <Text>

            </Text>
        </View>

    </>
}
export default Product_In