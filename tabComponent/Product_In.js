import * as React from 'react';
import { ScrollView, Text, View, Dimensions, Pressable, FlatList, Modal, SafeAreaView, Image, Alert } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import Arrow from '../img/arrow.svg';
import XMark from '../img/xMark.svg'
import { D_Height, D_Width } from '../utils/deviceSize';
// import ImageModal from 'react-native-image-modal';
import * as ImagePicker from 'expo-image-picker';


const Product_In = ({navigation}) => {

    const [toggle, setToggle] = React.useState(1);
    const [isVisible, setIsVisible] = React.useState(false);
    const [image, setImage] = React.useState();

    const _pickImage = async (division) => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            setImage(result);
        }
        else {
            return alert("취소 되었습니다.");
        }
    };

    // const flatListRef = React.useRef();
    // const [data, setData] = React.useState();

    // const getData = async() => {
    //     let url = `http://183.111.166.172:8080/sun/sun/bizCheck`
    //     try{
    //         const result = await fetch(url);
    //         const json = await result.json();
    //         console.log(json);
    //         // setData(json);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }

    // const flatItem = ({items}) =>{

    // }
    // const imageModal = () => {
    //     return <>
    //         <ImageModal
    //             swipeToDismiss={false}
    //             resizeMode="contain"
    //             imageBackgroundColor="#000000"
    //             style={{
    //                 width: 250,
    //                 height: 250,
    //             }}
    //             source={{
    //                 uri:
    //                     'https://cdn.pixabay.com/photo/2018/01/11/09/52/three-3075752_960_720.jpg',
    //             }}
    //         />
    //     </>
    // }

    const goDetail = (e) => {
        navigation.navigate("pullDetail");
    }


    const setView = () => {  //  data 받아서 items에 담은 후 렌더링 
        switch (toggle) {
            case 1: // 접수대기
                return <>
                    <View style={{ width: D_Width, height: D_Height * 0.05, justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Text style={{ alignSelf: 'center' }}>날짜</Text>
                        <Text></Text>
                        <Text style={{ alignSelf: 'center' }}>일련번호</Text>
                    </View>

                    <View style={{ width: D_Width, height: D_Height * 0.20, flexDirection: 'column' }}>
                        <View style={{ marginHorizontal: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 35,fontWeight:'bold', textAlign:'center' }}>2021-10-13 오후 1:46:58</Text>
                            <Text style={{ alignSelf:'center' }}>테스트-꽃바구니</Text>
                            <Text style={{ alignSelf:'center' }}>서울 영등포구 가마산로 311 (대림동) test{"\n"}</Text>
                        </View>
                    </View>
                </>
            case 2: // 처리중
                return <>
                    <View style={{ width: D_Width, height: D_Height * 0.05, justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Text style={{ alignSelf: 'center', fontSize:12, color:'grey' }}>2021-10-12 오후 1:10:34</Text>
                        <Text></Text>
                        <Text style={{ alignSelf: 'center', fontSize:12, color:'grey' }}>A132487542424575</Text>
                    </View>

                    <View style={{ width: D_Width, height: D_Height * 0.25, flexDirection: 'column' }}>
                        <View style={{ marginHorizontal: 15, borderBottomWidth:1 }}>
                            <Text style={{fontSize:18, color:'grey', fontWeight:'bold'}}>배송일시 2021.10.12</Text>
                            <Text style={{color:'grey', fontWeight:'bold', paddingTop:10}}>배송상세</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>발주자 플로드</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>테스트-3단</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>배송지 서울 영등포구 가마산로 311 (대림동){"\n"}</Text>

                            <Pressable onPress={() => _pickImage()} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}>
                                {image === undefined ? 
                                <Text style={{ alignSelf: 'center', color: 'white' }}>사진등록</Text> 
                                :
                                <Text style={{ alignSelf: 'center', color: 'white' }}>등록완료</Text>
                                }
                            </Pressable>
                            <Text></Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable onPress={()=>Alert.alert("알림", "주문을 취소할까요?", [{text:"취소"}, {text:"확인", onPress:()=>alert("발주 취소되었습니다.")}])} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'red', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color:'white' }}>주문취소</Text></Pressable>
                                <Text>{"  "}</Text>
                                <Pressable onPress={()=>goDetail()} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(153,153,153)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color:'white' }}>상세보기</Text></Pressable>
                            </View>
                            <Text></Text>
                        </View>
                    </View>
                </>
            case 3: // 완료
                return <>
                    <View style={{ width: D_Width, height: D_Height * 0.05, justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 12, color: 'grey' }}>2021-10-12 오후 1:10:34</Text>
                        <Text></Text>
                        <Text style={{ alignSelf: 'center', fontSize: 12, color: 'grey' }}>A132487542424575</Text>
                    </View>

                    <View style={{ width: D_Width, height: D_Height * 0.25, flexDirection: 'column' }}>
                        <View style={{ marginHorizontal: 15, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold' }}>배송일시 2021.10.12 오후7시10분</Text>
                            <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold' }}>완료일시 2021.10.12 오후7시10분</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세 오후7시10분</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>발주자 플로드</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>상품명 테스트</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>배송지 서울 영등포구 가마산로 311 (대림동)</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 1 }}>인수자 t{"\n"}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable onPress={() => setIsVisible(true)} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 보기</Text></Pressable>
                                <Text>{"  "}</Text>
                                <Modal visible={isVisible} transparent>
                                    <SafeAreaView />
                                    <View style={{ width: D_Width, height: D_Height * 0.9, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                                        <Pressable onPress={() => setIsVisible(false)} style={{marginHorizontal:50, marginBottom:20, flexDirection:'row-reverse'}}>
                                            <LocalSvg asset={XMark} width={25} height={25} fill={"#ffffff"} />
                                        </Pressable>
                                        <Image source={{ uri: 'https://source.unsplash.com/random' }} style={{ alignSelf: 'center', width: 250, height: 250 }}></Image>
                                    </View>
                                </Modal>
                                <Pressable onPress={() => alert("구매완료")}  style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(153,153,153)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>구매완료</Text></Pressable>
                                <Text>{"  "}</Text>
                                <Pressable onPress={()=>goDetail()} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(153,153,153)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>상세보기</Text></Pressable>
                            </View>
                            <Text></Text>
                            <Pressable onPress={() => alert("배송사진 변경")} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'blue', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 변경</Text></Pressable>
                            <Text></Text>
                        </View>
                    </View>
                </>
        }
        return <>
        </>
    }


    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    {/* <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} /> */}
                </View>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>수주관리</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>

        <View style={{ width: D_Width, height: D_Height * 0.06, backgroundColor: 'black' }}>
            <View style={{ marginHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                <Pressable onPress={() => setToggle(1)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 1 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center',fontWeight: toggle === 1 ? "bold" : "normal",  color: toggle === 1 ? "white" : 'grey' }}>접수대기</Text></Pressable>
                <Pressable onPress={() => setToggle(2)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 2 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center',fontWeight: toggle === 1 ? "bold" : "normal", color: toggle === 2 ? "white" : 'grey' }}>처리중</Text></Pressable>
                <Pressable onPress={() => setToggle(3)} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === 3 ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center',fontWeight: toggle === 1 ? "bold" : "normal", color: toggle === 3 ? "white" : 'grey' }}>완료</Text></Pressable>
            </View>
        </View>
        <View>
            {/* FlatList */}
        {setView()}
        </View>
    </>
}
export default Product_In