import * as React from 'react';
import { ScrollView, Text, View, Dimensions, Pressable, FlatList } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import NumberFormat from 'react-number-format';
import Arrow from '../img/arrow.svg';
import { D_Height, D_Width } from '../utils/deviceSize';

const Product_In_Detail = ({navigation}) => {

    return <>
        <ScrollView style={{backgroundColor:'rgb(245,240,229)'}}>

            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>주문상세</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>

            <Text />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 10 }}>수주정보</Text>
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>수주화원</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white' }}>
                        <Text>강일플라워</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>연락처</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>010-2222-2222</Text>
                    </View>
                </View>
            </View>

            <Text />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 10 }}>리본문구</Text>
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>경조사어</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>강일플라워</Text>
                    </View>
                </View>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>보내시는분</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>강일플라워</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>카드메세지</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>010-2222-2222</Text>
                    </View>
                </View>
            </View>

            <Text />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 10 }}>배송정보</Text>
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>받는사람</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>강일플라워</Text>
                    </View>
                </View>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>연락처</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>강일플라워</Text>
                    </View>
                </View>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>배송일시</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>강일플라워</Text>
                    </View>
                </View>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>배송상세</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>강일플라워</Text>
                    </View>
                </View>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>주소</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>강일플라워</Text>
                    </View>
                </View>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>기타요청사항</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>강일플라워</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>가상계좌 결제정보</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        <Text>010-2222-2222</Text>
                    </View>
                </View>
            </View>
            

            <Text />
            <View style={{ width: D_Width, borderTopWidth: 1, backgroundColor: 'rgb(219,214,203)'  }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>상품가격</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <NumberFormat value={35000} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay => <Text style={{ textAlign: 'right' }}>{pay}</Text>} />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>수량</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'right' }}>1</Text>
                    </View>
                </View>
            </View>
            <View style={{ width: D_Width, borderTopWidth: 1, backgroundColor: 'rgb(219,214,203)' }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{fontWeight:'bold'}}>합계</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <NumberFormat value={35000} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay => <Text style={{ textAlign: 'right', color:'rgb(217,112,45)' }}>{pay}</Text>} />
                    </View>
                </View>
            </View>
        </ScrollView>
    </>
}
export default Product_In_Detail