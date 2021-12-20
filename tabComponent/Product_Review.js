import * as React from 'react';
import { Alert, Pressable, View } from 'react-native';
import { ScrollView, Text } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import { Rating } from 'react-native-ratings';
import ImageModal from 'react-native-image-modal';


const Product_Review = ({navigation}) => {

    const [toggle, setToggle] = React.useState(1);
    const [starValue, setStarValue] = React.useState(5);
    const [isComment, setIsComment] = React.useState(true);

    const data = {
        "id":"test",
        "content":"testContent"
    }

    const setView = () => {
        switch (toggle) {
            case 1:
                return <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>내점수</Text>
                            <Rating
                                type='star'
                                ratingCount={5}
                                startingValue={5}
                                imageSize={16}
                                tintColor='rgb(242,242,242)'
                                readonly={true}
                            />
                        </View>
                        <Text>2021-07-01</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'grey', paddingTop: 10 }}>sdakjfhsajdkfhaskj</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'grey', paddingTop: 2, flex: 1 }}>수주화원</Text><Text style={{ flex: 5 }}>(주)플로드</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'grey', paddingTop: 2, flex: 1, letterSpacing: 5 }}>상품명</Text><Text style={{ flex: 5 }}>근조3단 기본</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'grey', paddingTop: 2, flex: 1, letterSpacing: 5 }}>배송지</Text><Text style={{ flex: 5 }}>서울 영등포구 가마산로 311 (대림동) 123123-1</Text>
                        </View>
                        <Text/>
                        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <Pressable onPress={()=>Alert.alert("알림", "수정하시겠습니까?", [{text:"취소"}, {text:"확인", onPress:()=>navigation.navigate("ReviewRewrite")}])} style={{backgroundColor: 'rgb(178,171,154)', paddingVertical:10, paddingHorizontal:10, marginHorizontal:5}}><Text style={{color:'white'}}>수정</Text></Pressable>
                            <Pressable onPress={()=>Alert.alert("알림", "삭제하시겠습니까?", [{text:"취소"}, {text:"확인", onPress:()=>alert("삭제")}])} style={{backgroundColor: 'rgb(178,171,154)', paddingVertical:10, paddingHorizontal:10, marginHorizontal:5}}><Text style={{color:'white'}}>삭제</Text></Pressable>
                        </View>
                        <View style={{backgroundColor:'rgb(229,229,229) ', paddingVertical:10, paddingHorizontal:10, marginVertical:10}}>
                            <Text style={{fontSize:12}}>(주)플로드</Text>
                            <Text style={{fontSize:12}}>test</Text>
                        </View>
                    </View>
                </>
            case 2:
                return <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>내점수</Text>
                            <Rating
                                type='star'
                                ratingCount={5}
                                startingValue={starValue}
                                imageSize={16}
                                tintColor='rgb(242,242,242)'
                                readonly={true}
                            />
                        </View>
                        <Text>2021-07-01</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'grey', paddingTop: 10 }}>sdakjfhsajdkfhaskj</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'grey', paddingTop: 2, flex: 1 }}>수주화원</Text><Text style={{ flex: 5 }}>(주)플로드</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'grey', paddingTop: 2, flex: 1, letterSpacing: 5 }}>상품명</Text><Text style={{ flex: 5 }}>근조3단 기본</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'grey', paddingTop: 2, flex: 1, letterSpacing: 5 }}>배송지</Text><Text style={{ flex: 5 }}>서울 영등포구 가마산로 311 (대림동) 123123-1</Text>
                        </View>
                        <Text />
                        {isComment ?
                            <View style={{ backgroundColor: 'rgb(229,229,229) ', paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10, justifyContent:'space-between', flexDirection:'row' }}>
                                <View>
                                    <Text style={{ fontSize: 12 }}>(주)플로드</Text>
                                    <Text style={{ fontSize: 12 }}>test</Text>
                                </View>
                                <Text onPress={() => navigation.navigate("ReviewRewrite")} style={{backgroundColor:'rgb(178,171,154)', color:'white', alignSelf:'center',paddingVertical:5, paddingHorizontal:10, marginHorizontal:10}}>수정</Text>
                            </View>
                            :
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Pressable onPress={() => navigation.navigate("ReviewRewrite")} style={{ backgroundColor: 'rgb(178,171,154)', paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 5 }}><Text style={{ color: 'white' }}>댓글 달기</Text></Pressable>
                            </View>
                            }
                            
                    </View>
                </>
        }
    }

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    {/* <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} /> */}
                </View>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>리뷰관리</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>

        <View style={{ width: D_Width, height: D_Height * 0.06, backgroundColor: 'black' }}>
            <View style={{ marginHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                <Pressable onPress={() => setToggle(1)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 1 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center', fontWeight: toggle === 1 ? "bold" : "normal", color: toggle === 1 ? "white" : 'grey' }}>내가 쓴 리뷰</Text></Pressable>
                <Pressable onPress={() => setToggle(2)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 2 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center', fontWeight: toggle === 2 ? "bold" : "normal", color: toggle === 2 ? "white" : 'grey' }}>고객리뷰</Text></Pressable>
            </View>
        </View>

        <View style={{marginHorizontal:20}}>
            <View style={{ flexDirection: 'row', marginVertical:15 }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ width: (D_Width * 0.85), height: D_Height * 0.05, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(76,186,181)' }}>6</Text>
                        <Text style={{ fontWeight: 'bold' }}> 개의 리뷰가 있습니다.</Text>
                    </View>
                </View>
            </View>
            {/* FlatList */}
            {setView()}
        </View>

    </>
}
export default Product_Review



// url 주소+/goods/list/+cate+'/'+bcode+'/'+sort+'?page='+skip+'&userid='+userid