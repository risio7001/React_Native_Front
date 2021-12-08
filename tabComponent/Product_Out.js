import * as React from 'react';
import { Alert, Pressable, View } from 'react-native';
import { ScrollView, Text } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';

const Product_Out = ({navigation}) => {

    const [toggle, setToggle] = React.useState(1);



    const setView = () => {
        return <>
            {toggle === 1 || toggle === 2 || toggle === 3 ?
                <View>
                    <View style={{ width: D_Width, height: D_Height * 0.05, justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 12, color: 'grey' }}>2021-10-12 오후 1:10:34</Text>
                        <Text></Text>
                        <Text style={{ alignSelf: 'center', fontSize: 12, color: 'grey' }}>A132487542424575</Text>
                    </View>

                    <Pressable onPress={()=>toggle === 3 ? null : navigation.navigate('pushDetail')} style={{ width: D_Width, height: D_Height * 0.25, flexDirection: 'column' }}>
                        <View style={{ marginHorizontal: 15, borderBottomWidth: 1, borderColor:'grey' }}>
                            <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold' }}>배송일시 2021.10.12 오후7시10분</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세 오후7시10분</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>상품명 테스트</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>배송지 서울 영등포구 가마산로 311 (대림동)</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>수주화원 플다테스트{"\n"}</Text>
                            {toggle === 1 ?
                                <View>
                                    <Pressable onPress={() => Alert.alert("알림", "주문을 취소할까요?", [{text:"취소"}, {text:"확인", onPress:()=>alert("주문 취소되었습니다.")}])} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>발주취소</Text></Pressable>
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
                    <View style={{ width: D_Width, height: D_Height * 0.05, justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 12, color: 'grey' }}>2021-10-12 오후 1:10:34</Text>
                        <Text></Text>
                        <Text style={{ alignSelf: 'center', fontSize: 12, color: 'grey' }}>A132487542424575</Text>
                    </View>

                    <View style={{ width: D_Width, height: D_Height * 0.25, flexDirection: 'column' }}>
                        <View style={{ marginHorizontal: 15, borderBottomWidth: 1, borderColor:'grey' }}>
                            <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold' }}>배송일시 2021.10.12 오후7시10분</Text>
                            {toggle === 4 ? <Text style={{ fontSize: 15, color: 'grey' }}>완료일시 2021.10.12 오후7시10분</Text> : null}
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세 오후7시10분</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>상품명 테스트</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>배송지 서울 영등포구 가마산로 311 (대림동)</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>수주화원 플다테스</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>인수자 김봉인{"\n"}</Text>
                            {toggle === 4 ?
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Pressable onPress={() => alert("배송사진 보기")} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 보기</Text></Pressable>
                                        <Text>{"  "}</Text>
                                        <Pressable onPress={() => alert("구매완료")} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'red', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>구매완료</Text></Pressable>
                                        <Text>{"  "}</Text>
                                        <Pressable onPress={() => navigation.navigate("pushReview")} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>상품평쓰기</Text></Pressable>
                                    </View>
                                    <Text></Text>
                                </View>
                                :
                                <View>
                                    <Pressable onPress={() => Alert.alert("알림", "같은내용으로 재주문을 하시겠습니까?",[{text:'취소', onPress:()=>alert('cancel')}, {text:'확인', onPress:()=>alert("ok")}])} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>재주문</Text></Pressable>
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
                <Pressable onPress={() => setToggle(1)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 1 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center', fontWeight: toggle === 1 ? "bold" : "normal", color: toggle === 1 ? "white" : 'grey' }}>접수대기</Text></Pressable>
                <Pressable onPress={() => setToggle(2)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 2 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center', fontWeight: toggle === 2 ? "bold" : "normal", color: toggle === 2 ? "white" : 'grey' }}>입금확인중</Text></Pressable>
                <Pressable onPress={() => setToggle(3)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 3 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center', fontWeight: toggle === 3 ? "bold" : "normal", color: toggle === 3 ? "white" : 'grey' }}>처리중</Text></Pressable>
                <Pressable onPress={() => setToggle(4)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 4 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center', fontWeight: toggle === 4 ? "bold" : "normal", color: toggle === 4 ? "white" : 'grey' }}>완료</Text></Pressable>
                <Pressable onPress={() => setToggle(5)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 5 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center', fontWeight: toggle === 5 ? "bold" : "normal", color: toggle === 5 ? "white" : 'grey' }}>취소내역</Text></Pressable>
            </View>
        </View>
        <View>
            {/* FlatList */}
            {setView()}
        </View>
    </>
}
export default Product_Out