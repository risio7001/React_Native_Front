import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { words } from '../data/words';
import { checkForUpdateAsync } from 'expo-updates';
import Checkbox from 'expo-checkbox';

const TestTab_checkBox = () => {
    
    const [test, setTest] = React.useState(words);

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>체크박스</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>

        {test.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row' }}>
                <Checkbox
                    value={item.check}
                    onValueChange={() => {
                        let temp = [];  // 초기화
                        temp = temp.concat(test);
                        temp.forEach((element) => {
                            if (element.text === item.text) {        // 선택된 element 검증
                                return element.check = !element.check;  // 현재 check의 값의 반대값 
                            }
                        })
                        setTest(temp);
                    }}
                />
                <Text>{item.text}</Text>
            </View>
        ))}
        <Text
            onPress={() => {
                let temp = [];
                temp = temp.concat(test);
                if (temp.some((element) => element.check === false)) {  // 체크가 안된 인자가 하나라도 있다면
                    temp.forEach((element) => element.check = true);// 전체 체크
                }
                else {                                               // 모든 인자가 체크되어 있다면
                    temp.forEach((element) => element.check = false); // 전체 해제
                }
                setTest(temp);
            }}
            style={{ paddingHorizontal: 200, backgroundColor: 'red', paddingVertical: 40 }}>ok</Text>
    </>

}

export default TestTab_checkBox;