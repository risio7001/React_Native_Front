import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import NumberFormat from 'react-number-format';
import Note from '../img/note.svg';
import Delivery from '../img/delivery.svg';
import Deposit from '../img/deposit.svg';

const Order_Check = ({navigation}) => {

    

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>결제 확인</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <ScrollView style={{ paddingHorizontal: 10, backgroundColor: 'white' }}>
            <Text style={styles.title_box}>
                <Text style={styles.font_top}>주문번호</Text>
                <Text style={{ color: 'rgb(222,165,111)', fontWeight: 'bold' }}>{" "}A2132454216587{" "}</Text>

                <Text style={styles.font_top}>의 상세내역입니다.</Text>
            </Text>
            <Text />
            <View style={styles.title_box}>
                <View style={{ paddingHorizontal: D_Width * 0.02 }}>
                    <LocalSvg asset={Deposit} width={25} height={25} fill={'#000000'} />
                </View>
                <Text style={styles.font_top}>주문/결제 정보</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>주문금액</Text>
                <Text style={styles.font_right}>상품금액 <Text style={{ color: 'rgb(222,165,111)' }}>1,000원</Text></Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>할인금액</Text>
                <Text style={[styles.font_right, { color: 'rgb(222,165,111)' }]}>1000원</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>배송비</Text>
                <Text style={[styles.font_right, { color: 'rgb(222,165,111)' }]}>0원</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>결제방법</Text>
                <Text style={styles.font_right}>충전금</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>결제금액</Text>
                <Text style={[styles.font_right, { color: 'rgb(222,165,111)' }]}>0원</Text>
            </View>
{/*  */}
            <View style={styles.title_box}>
                <View style={{ paddingHorizontal: D_Width * 0.02 }}>
                    <LocalSvg asset={Delivery} width={25} height={25} fill={'#000000'} />
                </View>
                <Text style={styles.font_top}>배송정보</Text>
            </View>
{/*  */}
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>주문자</Text>
                <Text style={styles.font_right}>플로드</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>주문자 연락처</Text>
                <Text style={styles.font_right}></Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>주문자 이메일</Text>
                <Text style={styles.font_right}></Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>받으시는분</Text>
                <Text style={styles.font_right}>플로드</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>연락처</Text>
                <Text style={styles.font_right}>010-1234-5678</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>배송지주소</Text>
                <Text style={styles.font_right}>서울 영등포구 가마산로 311 (대림동)</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>요청사항</Text>
                <Text style={styles.font_right}></Text>
            </View>
            {/*  */}
            <View style={styles.title_box}>
                <View style={{ paddingHorizontal: D_Width * 0.02 }}>
                    <LocalSvg asset={Note} width={25} height={25} fill={'#000000'} />
                </View>
                <Text style={styles.font_top}>주문상품정보</Text>
            </View>

            {/*  */}

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>상품명</Text>
                <Text style={styles.font_right}>충전금</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>가격</Text>
                <Text style={[styles.font_right, { color: 'rgb(222,165,111)' }]}>1000원</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.font_left}>수량</Text>
                <Text style={styles.font_right}>1개</Text>
            </View>

            <Text onPress={()=>navigation.navigate('mainPage')} style={styles.check_btn}>확인</Text>

        </ScrollView>
    </>

}

export default Order_Check;

const styles = StyleSheet.create({

    font_top: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf:'center'
    },
    font_left: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        flex: 1,
        fontWeight: 'bold',
        backgroundColor: 'rgb(249,248,253)',
        fontSize: 13
    },
    font_right: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        flex: 2,
        fontSize: 13
    },
    title_box: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginVertical:5,
        justifyContent: 'flex-start'
    },
    check_btn:{
        alignSelf:'center',
        marginVertical:20,
        paddingVertical:10,
        backgroundColor:'orange',
        color:'white',
        paddingHorizontal:35
    }

})