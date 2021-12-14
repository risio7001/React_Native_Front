import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Notice from '../img/noticeMark.svg';
import Down from '../img/dropDownBox.svg';

const Product_More_CS_List = ({ navigation }) => {

    const [viewMore, setViewMore] = React.useState(false);

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>1:1문의하기</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingVertical: 10 }}>
            <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>
                <LocalSvg asset={Notice} width={25} height={25} fill={"#000000"} />
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 13 }}>플다 이용시, 궁금하신 내용이 있다면</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 13 }}>1:1 문의하기를 이용해 주세요.</Text>
            </View>
        </View>
        {/* 플랫리스트 start */}
        <View style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white', marginVertical: 10 }}>
            <Pressable onPress={()=>setViewMore(!viewMore)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={{ alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 10, color: 'white', fontSize: 12, backgroundColor: 'green' }}>처리중</Text>
                    </View>
                    <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                        <Text style={{ paddingVertical: 3, fontSize: 16, fontWeight: 'bold' }}>테스트</Text>
                        <Text />
                        <Text>2021-10-12</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', transform:[{rotate:viewMore === true ? '180deg' : "0deg"}] }}>
                    <LocalSvg asset={Down} width={15} height={15} fill={'grey'} />
                </View>
                </View>
                {viewMore === true ?

                    <View style={{ marginVertical: 5, paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Text>
                            내용이 들어갈곳
                            내용이 들어갈곳
                            내용이 들어갈곳
                            내용이 들어갈곳
                            내용이 들어갈곳
                        </Text>
                    </View>
                    :
                    null
                }
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text onPress={() => navigation.navigate('csModify')} style={{ color: 'white', paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'orange', marginHorizontal: 10 }}>수정</Text>
                <Text onPress={() => alert('삭제')} style={{ color: 'white', paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'grey' }}>삭제</Text>
            </View>
        </View>
        {/* 플랫리스트 end */}
        <Pressable onPress={() => navigation.navigate('csWrite')} style={{ borderRadius: 5, paddingVertical: 10, width: D_Width * 0.9, backgroundColor: 'grey', alignSelf: 'center' }}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }}>글쓰기</Text>
        </Pressable>
    </>

}

export default Product_More_CS_List;