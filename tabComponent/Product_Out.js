import * as React from 'react';
import { Alert, Image, Pressable, StyleSheet, View, ScrollView, Text, Modal, SafeAreaView } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import XMark from '../img/xMark.svg';
import Api from '../config.json';
import { FlatList } from 'react-native-gesture-handler';

const Product_Out = ({ navigation }) => {

    const [toggle, setToggle] = React.useState('ready');
    const [isVisible, setIsVisible] = React.useState(false);
    const [count, setCount] = React.useState([0, 0, 0, 0, 0]);
    const [list, setList] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [test, setTest] = React.useState();
    

    const handleToggle = async (t) => { //  상단 탭으로 바꿧을 경우 
        if(toggle === t){

        }
        else{
            setList([]);
            setToggle(t);
            setPage(1);
        }
    }

    const _getData = () => {
        let url = `${Api.naviPush}${toggle}/?page=${page}&userid=flroad`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if (list.length === 0 || ((page - 1) * 10) / list.length === 1) {
                    setList([...list, ...res.data]);
                    setPage(page + 1);
                }
            })
            .catch(err => console.log(err))
    }

    const _getCount = () => {
        let url = `${Api.naviPushCount}?userid=flroad`
        fetch(url)
            .then((res) => res.json())
            .then((res) => setCount(res.data))
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        _getCount();
        _getData();
        // console.log(list);
    }, [toggle]);

    const goNavi = (path, e) => {
        navigation.navigate(path, e);
    }

    const _getImg = async (path, dealer) => {
        let url = `${Api.naviPushImg}${path}/${dealer}`
        await fetch(url)
            .then(res => res.json())
            .then(res => {
                setTest('https://flda.co.kr/data/flda/minishop/' + res.data[2] + "/" + res.data[0]);
                setIsVisible(true)
            })
            .catch(err => console.log(err));
    }

    const RenderItem = ({ items }) => {
        return <>
            {toggle === 'ready' || toggle === 'waitnew' || toggle === 'ing' ?
                <View>
                    <View style={{ width: D_Width, justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Text style={styles.text_top}>{items.RegDate}</Text>
                        <Text></Text>
                        <Text style={styles.text_top}>{items.OrderNo}</Text>
                    </View>

                    <Pressable onPress={() => toggle === 'ing' ? null : goNavi("pushDetail",items)} style={{ width: D_Width, flexDirection: 'column' }}>
                        <View style={{ marginHorizontal: 15, borderBottomWidth: 1, borderColor: 'grey' }}>
                            <Text style={styles.text_big}>배송일시 {items.rcvDate} {items.eventTime}{items.eventMinute}</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세 {items.eventMemo}</Text>
                            <Text style={styles.text_small}>상품명 {items.GoodsTitle}</Text>
                            <Text style={styles.text_small}>배송지 {items.RcvAddr}</Text>
                            <Text style={styles.text_small}>수주화원 {items.DealerName}{"\n"}</Text>
                            {toggle === 'ready' ?
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
                        <Text style={styles.text_top}>{items.RegDate}</Text>
                        <Text></Text>
                        <Text style={styles.text_top}>{items.OrderNo}</Text>
                    </View>

                    <View style={{ width: D_Width, flexDirection: 'column' }}>
                        <View style={{ marginHorizontal: 15, borderBottomWidth: 1, borderColor: 'grey' }}>
                            <Pressable onPress={() => goNavi("pushDetail",items)} style={{ width: D_Width, flexDirection: 'column' }}>
                                <Text style={styles.text_big}>배송일시 {items.rcvDate} {items.eventTime}{items.eventMinute}</Text>
                                {toggle === 'complete' ? <Text style={{ fontSize: 15, color: 'grey' }}>완료일시 {items.deliveryFinishDate}</Text> : null}
                                <Text style={{ color: 'grey', fontWeight: 'bold', paddingTop: 10 }}>배송상세 {items.eventMemo}</Text>
                                <Text style={styles.text_small}>상품명 {items.GoodsTitle}</Text>
                                <Text style={styles.text_small}>배송지 {items.RcvAddr}</Text>
                                <Text style={styles.text_small}>수주화원 {items.DealerName}</Text>
                                <Text style={styles.text_small}>인수자 {items.RcvName}{"\n"}</Text>
                            </Pressable>
                            {toggle === 'complete' ?
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Pressable onPress={() => {
                                            _getImg(items.Uid, items.DealerID);
                                        }} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 보기</Text></Pressable>
                                        <Text>{"  "}</Text>
                                        <Modal visible={isVisible} transparent>
                                            <SafeAreaView />
                                            <View style={{ width: D_Width, height: D_Height * 0.9, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                                                <Pressable onPress={() => setIsVisible(false)} style={{ marginHorizontal: 50, marginBottom: 20, flexDirection: 'row-reverse' }}>
                                                    <LocalSvg asset={XMark} width={25} height={25} fill={"#ffffff"} />
                                                </Pressable>
                                                <Image source={{ uri: test }} style={{ alignSelf: 'center', width: 250, height: 250 }}/>
                                            </View>
                                        </Modal>
                                        {/* <Pressable onPress={() => alert("배송사진 보기")} style={{ width: D_Width * 0.25, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>배송사진 보기</Text></Pressable> */}
                                        <Text>{"  "}</Text>
                                        <Pressable onPress={() => alert("구매완료")} style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'red', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>구매완료</Text></Pressable>
                                        <Text>{"  "}</Text>
                                        <Pressable onPress={() => goNavi("pushReview",items.infouid) } style={{ width: D_Width * 0.2, height: D_Height * 0.06, backgroundColor: 'rgb(144,176,89)', justifyContent: 'center' }}><Text style={{ alignSelf: 'center', color: 'white' }}>상품평쓰기</Text></Pressable>
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
    // console.log(list.data);
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
                <Pressable onPress={() => handleToggle('ready')} style={[styles.toggles, { borderColor: toggle === 'ready' ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 'ready' ? "bold" : "normal", color: toggle === 'ready' ? "white" : 'grey' }}>접수대기</Text>
                    {toggle === 'ready' ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>{count[0]}</Text>
                        </View>
                        :
                        <Text style={styles.number}>{count[0]}</Text>
                    }
                </Pressable>
                <Pressable onPress={() => handleToggle('waitnew')} style={[styles.toggles, { borderColor: toggle === 'waitnew' ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 'waitnew' ? "bold" : "normal", color: toggle === 'waitnew' ? "white" : 'grey', fontSize: 13 }}>
                        입금확인중
                    </Text>
                    {toggle === 'waitnew' ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>{count[1]}</Text>
                        </View>
                        :
                        <Text style={styles.number}>{count[1]}</Text>
                    }
                </Pressable>
                <Pressable onPress={() => handleToggle('ing')} style={[styles.toggles, { borderColor: toggle === 'ing' ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 'ing' ? "bold" : "normal", color: toggle === 'ing' ? "white" : 'grey' }}>
                        처리중
                    </Text>
                    {toggle === 'ing' ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>{count[2]}</Text>
                        </View>
                        :
                        <Text style={styles.number}>{count[2]}</Text>
                    }
                </Pressable>
                <Pressable onPress={() => handleToggle('complete')} style={[styles.toggles, { borderColor: toggle === 'complete' ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 'complete' ? "bold" : "normal", color: toggle === 'complete' ? "white" : 'grey' }}>
                        완료
                    </Text>
                    {toggle === 'complete' ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>{count[3]}</Text>
                        </View>
                        :
                        <Text style={styles.number}>{count[3]}</Text>
                    }
                </Pressable>
                <Pressable onPress={() => handleToggle('cancel')} style={[styles.toggles, { borderColor: toggle === 'cancel' ? 'rgb(144,176,89)' : "black" }]}>
                    <Text style={{ alignSelf: 'center', fontWeight: toggle === 'cancel' ? "bold" : "normal", color: toggle === 'cancel' ? "white" : 'grey' }}>
                        취소내역
                    </Text>
                    {toggle === 'cancel' ?
                        <View style={styles.select_number_box}>
                            <Text style={styles.select_number}>{count[4]}</Text>
                        </View>
                        :
                        <Text style={styles.number}>{count[4]}</Text>
                    }
                </Pressable>
            </View>
        </View>

        {toggle === 'ready' && count[0] === 0 && (
            <View>
                <Text style={styles.text_none_data}>접수대기중인 내역이 없습니다.</Text>
            </View>
        )}
        {toggle === 'waitnew' && count[1] === 0 && (
            <View>
                <Text style={styles.text_none_data}>입금확인중인 내역이 없습니다.</Text>
            </View>
        )}
        {toggle === 'ing' && count[2] === 0 && (
            <View>
                <Text style={styles.text_none_data}>처리중인 내역이 없습니다.</Text>
            </View>
        )}
        {toggle === 'complete' && count[3] === 0 && (
            <View>
                <Text style={styles.text_none_data}>완료된 내역이 없습니다.</Text>
            </View>
        )}
        {toggle === 'cancel' && count[4] === 0 && (
            <View>
                <Text style={styles.text_none_data}>취소내역이 없습니다.</Text>
            </View>
        )}

        <FlatList
            data={list}         //  컴포넌트에 들어갈 데이터
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <RenderItem items={item} />}   // 반복시켜 보여줄 컴포넌트
            onEndReached={() => {
                _getData();
            }} //  스크롤의 마지막에 닿았을 때 이벤트
        />
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
    text_none_data: {
        fontSize: 16,
        alignSelf: 'center',
        marginVertical: 10
    }
})