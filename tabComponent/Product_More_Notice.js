import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Notice from '../img/noticeMark.svg';
import Drop from '../img/dropDownBox.svg';
import { openNotice } from '../data/notice';

const Product_More_Notice = ({navigation}) => {

    const [viewMore, setViewMore] = React.useState(false);

    return <>
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>공지사항</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            <View style={{flexDirection:'row', marginVertical:10}}>
                <View style={{marginHorizontal:10, justifyContent:'center'}}>
                <LocalSvg asset={Notice} width={25} height={25} fill={"#000000"} />
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold'}}>(주)플로드 공지사항 입니다.</Text>
                    <Text style={{fontWeight:'bold'}}>(주)플로드 에서 전해드리는 소식들을 꼭 읽어주세요.</Text>
                </View>
            </View>
            <Pressable onPress={() => setViewMore(!viewMore)} style={{ flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:10 }}>
                <View >
                    <Text style={{ fontWeight: 'bold' }}>플다 오픈 공지</Text>
                    <Text style={{ paddingVertical: 10, color: 'grey' }}>2019.02.08</Text>
                </View>

                <View style={{ alignSelf: 'center', transform:[{rotate:viewMore === true ? '180deg' : '0deg'}] }}>
                    <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                </View>
            </Pressable>

            {viewMore === true ?
            openNotice()
             :
                null}
        </ScrollView>
    </>

}

export default Product_More_Notice;