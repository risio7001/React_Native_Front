import * as React from 'react';
import { ScrollView, Text, View, Dimensions, Pressable, FlatList, Modal, SafeAreaView, Image, Alert, StyleSheet } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import Arrow from '../img/arrow.svg';
import XMark from '../img/xMark.svg'
import { D_Height, D_Width } from '../utils/deviceSize';
// import ImageModal from 'react-native-image-modal';
import * as ImagePicker from 'expo-image-picker';
import Api from '../config.json';


const Product_In = ({ navigation }) => {

    const [toggle, setToggle] = React.useState('ready');
    const [isVisible, setIsVisible] = React.useState(false);
    const [count, setCount] = React.useState([0, 0, 0, 0, 0]);
    const [list, setList] = React.useState([]);
    const [page, setPage] = React.useState(1);

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

    const handleToggle = async (t) => {
        setList([]);
        setToggle(t);
        setPage(1);
    }

    const _getData = () => {
        let url = `${Api.naviPull}${toggle}/?page=${page}&userid=flroad`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                let temp = [];
                temp = list;
                temp.push(...res.data);
                // console.log(res.data.length);
                if (temp.length >= 10) {
                    setPage(page + 1);
                }

                setList(temp);
            })
            .catch(err => console.log(err))
    }

    const _getCount = () =>{
        let url = `${Api.naviPullCount}?userid=flroad`
        fetch(url)
        .then((res)=>res.json())
        .then((res)=>setCount(res.data))
        .catch(err=>console.log(err))
    }

    React.useEffect(() => {
        _getCount();
        _getData();
    }, [toggle]);

    const goDetail = (e) => {
        navigation.navigate("pullDetail");
    }

    const RenderItem = ({ items }) => {
        console.log("asdfasdfasdf");
        return <>
            {toggle === undefined ? null :
                <View>
                    <View style={{ width: D_Width, justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Text style={styles.text_top}>{items.RegDate}</Text>
                        <Text></Text>
                        <Text style={styles.text_top}>{items.OrderNo}</Text>
                    </View>
                    {toggle === 'ready' ?
                        <View style={{ width: D_Width, flexDirection: 'column' }}>
                            
                            <View style={{ marginHorizontal: 10, borderBottomWidth: 1 }}>
                                <Text style={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center' }}>{items.RegDate}</Text>
                                <Text style={{ alignSelf: 'center' }}>{items.GoodsTitle}</Text>
                                <Text style={{ alignSelf: 'center' }}>{items.RcvAddr} {items.RcvAddrDetail}{"\n"}</Text>
                            </View>
                        
                        </View>
                        : null
                    }
                    {toggle === 'ing' ?
                        <View style={{ width: D_Width, flexDirection: 'column' }}>
                            <View style={{ marginHorizontal: 15, borderBottomWidth: 1 }}>
                                <Text style={styles.text_big}>배송일시 {items.rcvDate} {items.eventTime}</Text>
                                <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세</Text>
                                <Text style={styles.text_small}>발주자 {items.OrdName}</Text>
                                <Text style={styles.text_small}>상품명 {items.GoodsTitle}</Text>
                                <Text style={styles.text_small}>배송지 {items.RcvAddr}{items.RcvAddrDetail}{"\n"}</Text>

                                <Pressable onPress={() => _pickImage()} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}>
                                    {image === undefined ?
                                        <Text style={{ alignSelf: 'center', color: 'white' }}>사진등록</Text>
                                        :
                                        <Text style={{ alignSelf: 'center', color: 'white' }}>등록완료</Text>
                                    }
                                </Pressable>
                                <Text></Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Pressable onPress={() => Alert.alert("알림", "주문을 취소할까요?", [{ text: "취소" }, { text: "확인", onPress: () => alert("수주 취소되었습니다.") }])} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'red', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>주문취소</Text></Pressable>
                                    <Text>{"  "}</Text>
                                    <Pressable onPress={() => goDetail()} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(153,153,153)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>상세보기</Text></Pressable>
                                </View>
                                <Text></Text>
                            </View>
                        </View>
                        : null
                    }
                    {toggle === 'complete' ?
                        <View style={{ width: D_Width, flexDirection: 'column' }}>
                            <View style={{ marginHorizontal: 15, borderBottomWidth: 1 }}>
                                <Text style={styles.text_big}>배송일시 {items.rcvDate} {items.eventTime}{items.eventMinute}</Text>
                                <Text style={styles.text_big}>완료일시 {items.deliveryFinishDate}</Text>
                                <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세</Text>
                                <Text style={styles.text_small}>발주자 {items.OrdName}</Text>
                                <Text style={styles.text_small}>상품명 {items.GoodsTitle}</Text>
                                <Text style={styles.text_small}>배송지 {items.RcvAddr}{items.RcvAddrDetail}</Text>
                                <Text style={styles.text_small}>인수자 {items.accepteur}{"\n"}</Text>
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
                                    <Pressable onPress={() => alert("구매완료")} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(153,153,153)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>구매완료</Text></Pressable>
                                    <Text>{"  "}</Text>
                                    <Pressable onPress={() => goDetail()} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(153,153,153)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>상세보기</Text></Pressable>
                                </View>
                                <Text></Text>
                                <Pressable onPress={() => _pickImage()} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'blue', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 변경</Text></Pressable>
                                <Text></Text>
                            </View>
                        </View>
                        : null}
                </View>
            }
        </>
    }




    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                </View>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>수주관리</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>

        <View style={{ width: D_Width, height: D_Height * 0.06, backgroundColor: 'black' }}>
            <View style={{ marginHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                <Pressable onPress={() => handleToggle('ready')} style={[styles.toggles, { borderColor: toggle === 'ready' ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 'ready' ? "bold" : "normal", color: toggle === 'ready' ? "white" : 'grey' }}>접수대기</Text>
                    {toggle === 'ready' ?
                        <View style={styles.select_toggle}>
                            <Text style={styles.select_number}>{count[0]}</Text>
                        </View>
                        :
                        <Text style={styles.number}>{count[0]}</Text>
                    }
                </Pressable>
                <Pressable onPress={() => handleToggle('ing')} style={[styles.toggles, { borderColor: toggle === 'ing' ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 'ing' ? "bold" : "normal", color: toggle === 'ing' ? "white" : 'grey' }}>처리중</Text>

                    {toggle === 'ing' ?
                        <View style={styles.select_toggle}>
                            <Text style={styles.select_number}>{count[1]}</Text>
                        </View>
                        :
                        <Text style={styles.number}>{count[1]}</Text>
                    }</Pressable>
                <Pressable onPress={() => handleToggle('complete')} style={[styles.toggles, { borderColor: toggle === 'complete' ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 'complete' ? "bold" : "normal", color: toggle === 'complete' ? "white" : 'grey' }}>완료</Text>

                    {toggle === 'complete' ?
                        <View style={styles.select_toggle}>
                            <Text style={styles.select_number}>{count[2]}</Text>
                        </View>
                        :
                        <Text style={styles.number}>{count[2]}</Text>
                    }</Pressable>
            </View>
        </View>
        {/* FlatList */}

        
        {toggle === 'ready' && count[0] === 0 && (
            <View>
                <Text style={styles.text_none_data}>접수대기중인 내역이 없습니다.</Text>
            </View>
        )}
        {toggle === 'ing' && count[1] === 0 && (
            <View>
                <Text style={styles.text_none_data}>처리중인 내역이 없습니다.</Text>
            </View>
        )}
        {toggle === 'complete' && count[2] === 0 && (
            <View>
                <Text style={styles.text_none_data}>완료된 내역이 없습니다.</Text>
            </View>
        )}

        <FlatList
            data={list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <RenderItem items={item} />}
        />
    </>
}
export default Product_In

const styles = StyleSheet.create({
    toggles: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        borderBottomWidth: 5,
    },
    select_toggle: {
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

    text_small: {
        color: 'grey',
        fontWeight: 'bold',
        paddingTop: 1
    },
    text_big: {
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold'
    },
    text_top: {
        alignSelf: 'center',
        fontSize: 12,
        color: 'grey',
        paddingVertical: 10
    },
    text_none_data:{
        fontSize:16,
        alignSelf:'center',
        marginVertical:10
    }
})
// switch (toggle) {
//     case 'ready': // 접수대기
//         return <>
//             <View>
//                 <View style={{ width: D_Width, justifyContent: 'space-around', flexDirection: 'row' }}>
//                     <Text style={styles.text_top}>2021-10-12 오후 1:10:34</Text>
//                     <Text></Text>
//                     <Text style={styles.text_top}>A132487542424575</Text>
//                 </View>


//                 <View style={{ width: D_Width, flexDirection: 'column' }}>
//                     <View style={{ marginHorizontal: 10, borderBottomWidth: 1 }}>
//                         <Text style={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center' }}>2021-10-13 오후 1:46:58</Text>
//                         <Text style={{ alignSelf: 'center' }}>테스트-꽃바구니</Text>
//                         <Text style={{ alignSelf: 'center' }}>서울 영등포구 가마산로 311 (대림동) test{"\n"}</Text>
//                     </View>
//                 </View>
//             </View>
//         </>
//     case 'ing': // 처리중
//         return <>
//             <View style={{ width: D_Width, height: D_Height * 0.05, justifyContent: 'space-around', flexDirection: 'row' }}>
//                 <Text style={styles.text_top}>2021-10-12 오후 1:10:34</Text>
//                 <Text></Text>
//                 <Text style={styles.text_top}>A132487542424575</Text>
//             </View>

//             <View style={{ width: D_Width, flexDirection: 'column' }}>
//                 <View style={{ marginHorizontal: 15, borderBottomWidth: 1 }}>
//                     <Text style={styles.text_big}>배송일시 2021.10.12</Text>
//                     <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세</Text>
//                     <Text style={styles.text_small}>발주자 플로드</Text>
//                     <Text style={styles.text_small}>테스트-3단</Text>
//                     <Text style={styles.text_small}>배송지 서울 영등포구 가마산로 311 (대림동){"\n"}</Text>

//                     <Pressable onPress={() => _pickImage()} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}>
//                         {image === undefined ?
//                             <Text style={{ alignSelf: 'center', color: 'white' }}>사진등록</Text>
//                             :
//                             <Text style={{ alignSelf: 'center', color: 'white' }}>등록완료</Text>
//                         }
//                     </Pressable>
//                     <Text></Text>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Pressable onPress={() => Alert.alert("알림", "주문을 취소할까요?", [{ text: "취소" }, { text: "확인", onPress: () => alert("수주 취소되었습니다.") }])} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'red', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>주문취소</Text></Pressable>
//                         <Text>{"  "}</Text>
//                         <Pressable onPress={() => goDetail()} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(153,153,153)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>상세보기</Text></Pressable>
//                     </View>
//                     <Text></Text>
//                 </View>
//             </View>
//         </>
//     case 'complete': // 완료
//         return <>
//             <View style={{ width: D_Width, justifyContent: 'space-around', flexDirection: 'row' }}>
//                 <Text style={styles.text_top}>2021-10-12 오후 1:10:34</Text>
//                 <Text></Text>
//                 <Text style={styles.text_top}>A132487542424575</Text>
//             </View>

//             <View style={{ width: D_Width, flexDirection: 'column' }}>
//                 <View style={{ marginHorizontal: 15, borderBottomWidth: 1 }}>
//                     <Text style={styles.text_big}>배송일시 2021.10.12 오후7시10분</Text>
//                     <Text style={styles.text_big}>완료일시 2021.10.12 오후7시10분</Text>
//                     <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세 오후7시10분</Text>
//                     <Text style={styles.text_small}>발주자 플로드</Text>
//                     <Text style={styles.text_small}>상품명 테스트</Text>
//                     <Text style={styles.text_small}>배송지 서울 영등포구 가마산로 311 (대림동)</Text>
//                     <Text style={styles.text_small}>인수자 t{"\n"}</Text>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Pressable onPress={() => setIsVisible(true)} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 보기</Text></Pressable>
//                         <Text>{"  "}</Text>
//                         <Modal visible={isVisible} transparent>
//                             <SafeAreaView />
//                             <View style={{ width: D_Width, height: D_Height * 0.9, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
//                                 <Pressable onPress={() => setIsVisible(false)} style={{ marginHorizontal: 50, marginBottom: 20, flexDirection: 'row-reverse' }}>
//                                     <LocalSvg asset={XMark} width={25} height={25} fill={"#ffffff"} />
//                                 </Pressable>
//                                 <Image source={{ uri: 'https://source.unsplash.com/random' }} style={{ alignSelf: 'center', width: 250, height: 250 }}></Image>
//                             </View>
//                         </Modal>
//                         <Pressable onPress={() => alert("구매완료")} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(153,153,153)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>구매완료</Text></Pressable>
//                         <Text>{"  "}</Text>
//                         <Pressable onPress={() => goDetail()} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(153,153,153)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>상세보기</Text></Pressable>
//                     </View>
//                     <Text></Text>
//                     <Pressable onPress={() => _pickImage()} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'blue', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 변경</Text></Pressable>
//                     <Text></Text>
//                 </View>
//             </View>

//         </>
//     default: return <>
//         <View>
//             <View style={{ width: D_Width, justifyContent: 'space-around', flexDirection: 'row' }}>
//                 <Text style={{ alignSelf: 'center' }}>날짜</Text>
//                 <Text></Text>
//                 <Text style={{ alignSelf: 'center' }}>일련번호</Text>
//             </View>

//             <View style={{ width: D_Width, flexDirection: 'column' }}>
//                 <View style={{ marginHorizontal: 10, borderBottomWidth: 1 }}>
//                     <Text style={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center' }}>2021-10-13 오후 1:46:58</Text>
//                     <Text style={{ alignSelf: 'center' }}>테스트-꽃바구니</Text>
//                     <Text style={{ alignSelf: 'center' }}>서울 영등포구 가마산로 311 (대림동) test{"\n"}</Text>
//                 </View>
//             </View>
//         </View>
//     </>