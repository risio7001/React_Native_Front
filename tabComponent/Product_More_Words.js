import * as React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { words } from '../data/words';
import Checkbox from 'expo-checkbox';
import Api from '../config.json';
import axios from 'axios';

const Product_More_Words = ({ navigation }) => {

    const [toggle, setToggle] = React.useState("B");
    const [delBtn, setDelBtn] = React.useState(false);
    const [selectAll, setSelectAll] = React.useState(false);
    const [test, setTest] = React.useState();
    const [addWords, setAddWords] = React.useState();
    const [load, setLoad] = React.useState(false);

    async function dbConn(path) {
        let url = path;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                let temp = [];
                res.data.forEach((element) => {
                    temp.push({
                        "Uid": element.Uid,
                        "Dealer": element.DealerID,
                        "Text_Type": element.Text_Type,
                        "Text": element.Text,
                        "check": false
                    })
                });
                setTest(temp);
            })
            .catch(err => console.log(err));
    }

    React.useEffect(() => {
        // dbConn(Api.ribbonWords+"flroad/"+toggle);
        setSelectAll(false);
        setDelBtn(false);
        dbConn(Api.ribbonWords + "flroad/" + toggle);
    }, [toggle, load]);


    async function delFunc() { // 삭제
        let temp = []; // 임시 저장(삭제용)

        if (delBtn) {
            test.forEach((element) => {
                if (element.check === true) {
                    temp.push(element.Uid);
                }
            })
            const result = await axios({
                url: 'http://localhost:5000/sun/sun/ribbontestdel',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: {
                    "uid": temp
                }
            })
            .then(res=>setLoad(!load))
            .catch(err=>console.log(err));
            // console.log(temp);
        }
    }

    function addFunc() { // 추가

        if (addWords === "") {
            alert("등록할 문구를 입력해주세요");
        }
        else {
            // dbConn();
            let url = `http://localhost:5000/sun/sun/ribbontest/flroad/${toggle}/${addWords}`
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setAddWords("");
                    setLoad(!load)
                })
                .catch(err => console.log(err));

            // alert(addWords + " 등록되었습니다");
        }
    }

    const changeToggle = () => {

        return <>
            {test.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', paddingLeft: 10, paddingVertical: 8 }}>
                    <Text style={{ color: 'grey', flex: 1, alignSelf: 'center', paddingRight: 5 }}>{(index + 1)}</Text>

                    <View style={{ flex: 10, borderColor: 'white', color: 'white', borderRightWidth: 1, justifyContent: 'center', borderLeftWidth: 1 }}>
                        <Text style={{ textAlign: 'left', color: 'black' }}>{item.Text}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Checkbox
                            value={item.check}
                            onValueChange={() => {
                                // console.log(item.Text);
                                let temp = [];  // 초기화
                                temp = temp.concat(test);
                                temp.forEach((element) => {
                                    if (element.Text === item.Text) {        // 선택된 element 검증
                                        // console.log(item.text);
                                        // console.log(element.text);
                                        return element.check = !element.check;  // 현재 check의 값의 반대값 
                                    }
                                })
                                if (temp.some((element) => element.check === true)) { // 선택된 인자들 중 true인 인자가 있다면 삭제 버튼 활성화
                                    setDelBtn(true);
                                } else {
                                    setDelBtn(false);
                                }
                                if (temp.some((element) => element.check === false)) {  // 선택된 인자들 중 false인 인자가 있다면 모두선택 <> 모두해제
                                    setSelectAll(false);
                                } else {
                                    setSelectAll(true);
                                }
                                setTest(temp);
                            }}
                        />
                    </View>
                </View>
            ))}
        </>
    }

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>리본문구관리</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
            <Pressable onPress={() => setToggle('B')} style={[{ backgroundColor: toggle === 'sender' ? 'green' : 'grey' }, styles.toggle_box]}>
                <Text style={styles.toggle_text}>보내는분</Text>
            </Pressable>
            <Pressable onPress={() => setToggle('A')} style={[{ backgroundColor: toggle === 'eventWords' ? 'green' : 'grey', marginLeft: '0.5%' }, styles.toggle_box]}>
                <Text style={styles.toggle_text}>경조사어</Text>
            </Pressable>
            <Pressable onPress={() => setToggle('C')} style={[{ backgroundColor: toggle === 'card' ? 'green' : 'grey', marginLeft: '0.5%' }, styles.toggle_box]}>
                <Text style={styles.toggle_text}>카드메세지</Text>
            </Pressable>
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row' }}>
            <TextInput
                style={{ borderWidth: 1, paddingVertical: 10, paddingHorizontal: 10, flex: 5, fontSize: 11 }}
                placeholder={'여기에 입력해주세요.'}
                value={addWords}
                onChangeText={setAddWords}

            />
            <Pressable onPress={() => addFunc()} style={{ justifyContent: 'center', flex: 1, backgroundColor: '#7B7B7B', marginHorizontal: 5, borderRadius: 5 }}>
                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 11 }}>등록</Text>
            </Pressable>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#7B7B7B', paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text style={{ color: 'white', flex: 1, alignSelf: 'center', paddingRight: 5 }}>No</Text>

            <View style={{ flex: 10, borderColor: 'white', color: 'white', borderRightWidth: 1, justifyContent: 'center', borderLeftWidth: 1 }}>
                <Text style={{ alignSelf: 'center', borderColor: 'white', color: 'white' }}>문구</Text>
            </View>

            <Text style={{ color: 'white', flex: 1, alignSelf: 'center', paddingLeft: 10 }}>선택</Text>
        </View>
        <ScrollView>
            {/* <FlatList
            data={} */}
            {test === undefined ? null : changeToggle()}

        </ScrollView>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20 }}>
            <Pressable onPress={() => delFunc()} style={{
                paddingHorizontal: 20, borderRadius: 5,
                paddingVertical: 10, backgroundColor: delBtn ? '#FF6D00' : '#B5BABD', marginHorizontal: 5
            }}>
                <Text style={{ color: 'white' }}>
                    삭제
                </Text>
            </Pressable>

            <Pressable onPress={() => {
                let temp = [];
                temp = temp.concat(test);
                if (temp.some((element) => element.check === false)) {  // 체크가 안된 인자가 하나라도 있다면
                    temp.forEach((element) => element.check = true);// 전체 체크
                    setSelectAll(true);
                    setDelBtn(true);
                }
                else {                                               // 모든 인자가 체크되어 있다면
                    temp.forEach((element) => element.check = false); // 전체 해제
                    setSelectAll(false);
                    setDelBtn(false);
                }
                setTest(temp);
            }} style={{ paddingHorizontal: 20, borderRadius: 5, paddingVertical: 10, backgroundColor: '#666666' }}>
                <Text style={{ color: 'white' }}>
                    {selectAll ? '전체해제' : '전체선택'}
                </Text>
            </Pressable>
        </View>
    </>

}

export default Product_More_Words;

const styles = StyleSheet.create({
    toggle_text: {
        color: 'white',
        fontSize: 14,
        alignSelf: 'center'
    },
    toggle_box: {

        paddingVertical: 15,
        width: '33%',

    }
})