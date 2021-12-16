import * as React from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { ScrollView, Text, Modal, SafeAreaView } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import XMark from '../img/xMark.svg'

const Product_Out = ({ navigation }) => {

    const [toggle, setToggle] = React.useState(1);
    const [isVisible, setIsVisible] = React.useState(false);

    const setView = () => {
        return <>
            {toggle === 1 || toggle === 2 || toggle === 3 ?
                <View>
                    <View style={{ width: D_Width, justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Text style={styles.text_top}>2021-10-12 오후 1:10:34</Text>
                        <Text></Text>
                        <Text style={styles.text_top}>A132487542424575</Text>
                    </View>

                    <Pressable onPress={() => toggle === 3 ? null : navigation.navigate('pushDetail')} style={{ width: D_Width, flexDirection: 'column' }}>
                        <View style={{ marginHorizontal: 15, borderBottomWidth: 1, borderColor: 'grey' }}>
                            <Text style={styles.text_big}>배송일시 2021.10.12 오후7시10분</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세 오후7시10분</Text>
                            <Text style={styles.text_small}>상품명 테스트</Text>
                            <Text style={styles.text_small}>배송지 서울 영등포구 가마산로 311 (대림동)</Text>
                            <Text style={styles.text_small}>수주화원 플다테스트{"\n"}</Text>
                            {toggle === 1 ?
                                <View>
                                    <Pressable onPress={() => Alert.alert("알림", "주문을 취소할까요?", [{ text: "취소" }, { text: "확인", onPress: () => alert("주문 취소되었습니다.") }])} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>발주취소</Text></Pressable>
                                    <Text></Text>
                                </View>
                                :
                                null
                            }
                        </View>
                    </Pressable>
                </View>
                :
                <View>
                    <View style={{ width: D_Width, justifyContent: 'space-around', flexDirection: 'row' }}>
                    <Text style={styles.text_top}>2021-10-12 오후 1:10:34</Text>
                        <Text></Text>
                        <Text style={styles.text_top}>A132487542424575</Text>
                    </View>

                    <View style={{ width: D_Width, flexDirection: 'column' }}>
                        <View style={{ marginHorizontal: 15, borderBottomWidth: 1, borderColor: 'grey' }}>
                        <Text style={styles.text_big}>배송일시 2021.10.12 오후7시10분</Text>
                            {toggle === 4 ? <Text style={{ fontSize: 15, color: 'grey' }}>완료일시 2021.10.12 오후7시10분</Text> : null}
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세 오후7시10분</Text>
                            <Text style={styles.text_small}>상품명 테스트</Text>
                            <Text style={styles.text_small}>배송지 서울 영등포구 가마산로 311 (대림동)</Text>
                            <Text style={styles.text_small}>수주화원 플다테스</Text>
                            <Text style={styles.text_small}>인수자 김봉인{"\n"}</Text>
                            {toggle === 4 ?
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Pressable onPress={() => setIsVisible(true)} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 보기</Text></Pressable>
                                        <Text>{"  "}</Text>
                                        <Modal visible={isVisible} transparent>
                                            <SafeAreaView />
                                            <View style={{ width: D_Width, height: D_Height * 0.9, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                                                <Pressable onPress={() => setIsVisible(false)} style={{ marginHorizontal: 50, marginBottom: 20, flexDirection: 'row-reverse' }}>
                                                    <LocalSvg asset={XMark} width={25} height={25} fill={"#ffffff"} />
                                                </Pressable>
                                                <Image source={{ uri: 'https://source.unsplash.com/random' }} style={{ alignSelf: 'center', width: 250, height: 250 }}></Image>
                                            </View>
                                        </Modal>
                                        {/* <Pressable onPress={() => alert("배송사진 보기")} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 보기</Text></Pressable> */}
                                        <Text>{"  "}</Text>
                                        <Pressable onPress={() => alert("구매완료")} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'red', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>구매완료</Text></Pressable>
                                        <Text>{"  "}</Text>
                                        <Pressable onPress={() => navigation.navigate("pushReview")} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>상품평쓰기</Text></Pressable>
                                    </View>
                                    <Text></Text>
                                </View>
                                :
                                <View>
                                    <Pressable onPress={() => Alert.alert("알림", "같은내용으로 재주문을 하시겠습니까?", [{ text: '취소', onPress: () => alert('cancel') }, { text: '확인', onPress: () => alert("ok") }])} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>재주문</Text></Pressable>
                                    <Text></Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            }
        </>

    }

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    {/* <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} /> */}
                </View>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>발주관리</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>

        <View style={{ width: D_Width, height: D_Height * 0.06, backgroundColor: 'black' }}>
            <View style={{ marginHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                <Pressable onPress={() => setToggle(1)} style={[styles.toggles, { borderColor: toggle === 1 ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 1 ? "bold" : "normal", color: toggle === 1 ? "white" : 'grey' }}>접수대기</Text>
                    {toggle === 1 ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>1</Text>
                        </View>
                        :
                        <Text style={styles.number}>1</Text>
                    }
                </Pressable>
                <Pressable onPress={() => setToggle(2)} style={[styles.toggles, { borderColor: toggle === 2 ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 2 ? "bold" : "normal", color: toggle === 2 ? "white" : 'grey', fontSize: 13 }}>
                        입금확인중
                    </Text>
                    {toggle === 2 ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>3</Text>
                        </View>
                        :
                        <Text style={styles.number}>3</Text>
                    }
                </Pressable>
                <Pressable onPress={() => setToggle(3)} style={[styles.toggles, { borderColor: toggle === 3 ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 3 ? "bold" : "normal", color: toggle === 3 ? "white" : 'grey' }}>
                        처리중
                    </Text>
                    {toggle === 3 ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>1</Text>
                        </View>
                        :
                        <Text style={styles.number}>1</Text>
                    }
                </Pressable>
                <Pressable onPress={() => setToggle(4)} style={[styles.toggles, { borderColor: toggle === 4 ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 4 ? "bold" : "normal", color: toggle === 4 ? "white" : 'grey' }}>
                        완료
                    </Text>
                    {toggle === 4 ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>131</Text>
                        </View>
                        :
                        <Text style={styles.number}>131</Text>
                    }
                </Pressable>
                <Pressable onPress={() => setToggle(5)} style={[styles.toggles, { borderColor: toggle === 5 ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 5 ? "bold" : "normal", color: toggle === 5 ? "white" : 'grey' }}>
                        취소내역
                    </Text>
                    {toggle === 5 ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>31</Text>
                        </View>
                        :
                        <Text style={styles.number}>31</Text>
                    }
                </Pressable>
            </View>
        </View>

        <ScrollView>
            <View>
                {/* FlatList */}
                {setView()}
            </View>
        </ScrollView>
    </>
}
export default Product_Out


const styles = StyleSheet.create({
    toggles: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        borderBottomWidth: 5,
    },
    select_number_box: {
        alignSelf: 'center',
        backgroundColor: 'rgb(84,165,159)',
        paddingHorizontal: 5,
        borderRadius: 3
    },
    select_number: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 12
    },
    number: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 12
    },
    text_small:{
        color: 'grey',
        fontWeight: 'bold',
        paddingTop: 1 
    },
    text_big:{
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold'
    },
    text_top:{
        alignSelf: 'center',
        fontSize: 12,
        color: 'grey',
        paddingVertical:10
    }
})