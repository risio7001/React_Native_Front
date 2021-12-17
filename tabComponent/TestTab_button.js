import * as React from 'react';
import { SafeAreaView, ScrollView, Pressable, Modal, Text, View, TextInput } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Search from '../img/searchMark.svg';

let nn = 0;

const TestTab_button = ({ navigation }) => {

    const [cnt, setCnt] = React.useState([{
        "key":0,
        "value":""
    }]);
    const [senderModal, setSenderModal] = React.useState(false);
    const [modalCnt, setModalCnt] = React.useState(0);

    function senderAdd () {
        nn++;
        let temp = [];
        temp.push({
            "key":nn,
            "value" : ""
        })
        setCnt(cnt.concat(temp));
    }

    function senderName(text,key, index){
        let temp = [];
        temp = temp.concat(cnt);
        let obj = temp.find((element)=>element.key===key);
        obj.value = text;
        setCnt(temp);
    }
    
    React.useEffect(()=>{
        console.log(cnt);
    },[cnt]);

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    {/* <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} /> */}
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>타이틀</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        {cnt === undefined ? null : cnt.map((item, index) => (
            <View key={index} style={{ height: 50, flexDirection: 'row', borderWidth: 1, borderColor: 'rgb(255,98,0)', marginVertical: 5 }}>
                <TextInput
                    style={{ flex: 5, paddingHorizontal: 10 }}
                    placeholder="보내는 분"
                    onChangeText={(text)=>senderName(text,item.key,index)}
                    value={item.value}
                />
                <Pressable
                    onPress={() => {
                        setSenderModal(true);
                        setModalCnt(item.key);
                    }}
                    style={{ flex: 1, backgroundColor: 'rgb(255,98,0)', justifyContent: 'center' }}
                >
                    <LocalSvg asset={Search} width={25} height={25} fill={"#ffffff"} style={{ alignSelf: 'center' }} />
                </Pressable>

                {index > 0 && <View style={{ backgroundColor: 'red', justifyContent: 'center' }}>
                        <Text onPress={() => {
                            let temp = [];
                            temp = temp.concat(cnt);
                            temp.splice(temp.findIndex((element)=>element.key===item.key), 1);
                            setCnt(temp);
                        }}
                            style={{ alignSelf: 'center', paddingHorizontal: 10, color: 'white' }}>
                            삭제
                        </Text>
                    </View>
                }
            </View>
        ))}
        <Modal visible={senderModal} transparent>
            <SafeAreaView />
            <View style={{ width: D_Width, height: D_Height, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center' }}>
                <View style={{ width: D_Width * 0.8, height: D_Height * 0.6, backgroundColor: 'white', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', paddingHorizontal: 15, paddingVertical: 15 }}>보내는 분</Text>
                    <ScrollView style={{ backgroundColor: 'rgb(240,240,240)', marginHorizontal: 15, marginVertical: 15 }}>
                        <View style={{ backgroundColor: 'white', marginVertical: 15, marginHorizontal: 10 }}>
                            <Pressable onPress={() => {
                                let temp = [];
                                temp = temp.concat(cnt);
                                let obj = temp.find((element)=>element.key === modalCnt);
                                obj.value = "플로드"
                                setCnt(temp);
                                setSenderModal(false);
                            }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal: 10, alignSelf: 'center', paddingHorizontal: D_Width * 0.02, backgroundColor: 'rgb(255,98,0)', color: 'white' }}>선택</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                let temp = [];
                                temp = temp.concat(cnt);
                                let obj = temp.find((element)=>element.key === modalCnt);
                                obj.value = "플로드"
                                setCnt(temp);
                                setSenderModal(false);
                            }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal: 10, alignSelf: 'center', paddingHorizontal: D_Width * 0.02, backgroundColor: 'rgb(255,98,0)', color: 'white' }}>선택</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                let temp = [];
                                temp = temp.concat(cnt);
                                let obj = temp.find((element)=>element.key === modalCnt);
                                obj.value = "플로드"
                                setCnt(temp);
                                setSenderModal(false);
                            }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal: 10, alignSelf: 'center', paddingHorizontal: D_Width * 0.02, backgroundColor: 'rgb(255,98,0)', color: 'white' }}>선택</Text>
                            </Pressable>

                        </View>
                    </ScrollView>
                    <Text onPress={() => setSenderModal(false)} style={{ fontSize: 15, borderWidth: 1, paddingVertical: 10, marginVertical: 10, paddingHorizontal: 10, alignSelf: 'center' }}>닫기</Text>
                </View>
            </View>
        </Modal>
        {/* {} */}
        <View style={{ flexDirection: 'row', width: '40%', height: 40, borderColor: 'rgb(255,98,0)', borderWidth: 1 }}>
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text style={{ alignSelf: 'center' }}>+</Text>
            </View>
            <Pressable onPress={() => {
                senderAdd();
            }} style={{ flex: 2, borderLeftWidth: 1, borderColor: 'rgb(255,98,0)', justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center' }}>보내는분 추가</Text>
            </Pressable>
        </View>

    </>

}

export default TestTab_button;

