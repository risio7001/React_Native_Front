import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Drop from '../img/dropDownBox.svg'
import Notice from '../img/phoneMark.svg';
import Phone from '../img/noticeMark2.svg';
import FAQ from '../img/FAQMark.svg';
import { openNotice } from '../data/notice';

const Product_More_CS = ({ navigation }) => {

    const [viewMore, setViewMore] = React.useState(false);

    return <>
        <ScrollView>
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>고객센터</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            <View style={{ marginVertical: 10, backgroundColor: 'white', flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 5, justifyContent: 'space-between' }}>
                <View style={{ marginVertical: 10, marginHorizontal: 10, width: D_Height * 0.06, height: D_Height * 0.06, backgroundColor: 'grey', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                    <LocalSvg asset={Phone} width={25} height={25} fill={"#ffffff"} />
                </View>

                {/* <View style={{ marginVertical: 10, marginHorizontal: 10, width: D_Height * 0.05, height: D_Height * 0.05, backgroundColor: 'black', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                    
                </View> */}

                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'grey' }}>02-522-8200</Text>
                    <Text style={{ fontSize: 12, color: 'grey' }}>영업일 : 월 ~ 금요일 오전9시 ~ 오후 6시</Text>
                    <Text style={{ fontSize: 12, color: 'grey' }}>(점심시간: 오후 12시 ~ 1시)</Text>
                    <Text>휴무 : 토, 일, 공휴일은 휴무입니다.</Text>
                </View>
                <Text onPress={()=>navigation.navigate('csList')} style={{ backgroundColor: 'grey', paddingVertical: 20, paddingHorizontal: 10, alignSelf: 'center', fontWeight: 'bold', color: 'white' }}>1:1문의하기</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginVertical: 10, marginRight: 10, width: D_Height * 0.04, height: D_Height * 0.04, backgroundColor: 'grey', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <LocalSvg asset={Notice} width={15} height={15} fill={'#ffffff'} />
                    </View>
                    <Text style={{ paddingVertical: 20, fontSize: 14, fontWeight: 'bold' }}>공지사항</Text>

                </View>
                <Text onPress={()=>navigation.navigate('notice')} style={{ backgroundColor: 'green', alignSelf: 'center', fontSize: 14, paddingVertical: 10, paddingHorizontal: 10, fontWeight: 'bold', color: 'white' }}>전체보기</Text>
            </View>
            {/* 플랫 리스트 */}
            <Pressable onPress={() => setViewMore(!viewMore)} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                <View style={{ paddingVertical: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>플다 오픈 공지</Text>
                    <Text />
                    <Text style={{ fontSize: 12, color: 'grey' }}>2019.02.08</ Text>
                </View>
                <View style={{ alignSelf: 'center', transform: [{ rotate: viewMore === true ? '180deg' : '0deg' }] }}>
                    <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                </View>
            </Pressable>
            {viewMore === true ? openNotice() : null}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginVertical: 10, marginRight: 10, width: D_Height * 0.04, height: D_Height * 0.04, backgroundColor: 'grey', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <LocalSvg asset={FAQ} width={15} height={15} fill={'#ffffff'} />
                    </View>
                    <Text style={{ paddingVertical: 20, fontSize: 14, fontWeight: 'bold' }}>FAQ BEST</Text>

                </View>
                <Text onPress={()=>navigation.navigate('csFAQ')} style={{ backgroundColor: 'green', alignSelf: 'center', fontSize: 14, paddingVertical: 10, paddingHorizontal: 10, fontWeight: 'bold', color: 'white' }}>전체보기</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'grey' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginRight: 10, width: D_Height * 0.03, height: D_Height * 0.03, backgroundColor: 'orange', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Q</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold' }}>상품보다 배송지를 먼저 선택하는 이유가 뭔가요?</Text>
                </View>

                <View style={{ alignSelf: 'center', transform: [{ rotate: viewMore === true ? '180deg' : '0deg' }] }}>
                    <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'grey' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginRight: 10, width: D_Height * 0.03, height: D_Height * 0.03, backgroundColor: 'orange', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Q</Text>
                    </View>
                    <Text>플다에선 왜 무통장입금이 안되나요?</Text>
                </View>
                <View style={{ alignSelf: 'center', transform: [{ rotate: viewMore === true ? '180deg' : '0deg' }] }}>
                    <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'grey' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginRight: 10, width: D_Height * 0.03, height: D_Height * 0.03, backgroundColor: 'orange', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Q</Text>
                    </View>
                    <Text>가상계좌 주문을 취소한 경우 환불은 언제되나요?</Text>
                </View>
                <View style={{ alignSelf: 'center', transform: [{ rotate: viewMore === true ? '180deg' : '0deg' }] }}>
                    <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'grey' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginRight: 10, width: D_Height * 0.03, height: D_Height * 0.03, backgroundColor: 'orange', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Q</Text>
                    </View>
                    <Text>수주화원에서 수주승인을 안하면 주문은 어떻게 되나요?</Text>
                </View>
                <View style={{ alignSelf: 'center', transform: [{ rotate: viewMore === true ? '180deg' : '0deg' }] }}>
                    <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                </View>
            </View>
        </ScrollView>
    </>

}

export default Product_More_CS;