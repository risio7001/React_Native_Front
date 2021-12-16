import * as React from 'react';
import { ScrollView, Text, View, Pressable, TextInput, Button, StyleSheet } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import SelectDropdown from 'react-native-select-dropdown';
import { PhoneNumber } from '../data/idHelpData';
import Drop from '../img/dropDownBox.svg';

const PassHelp = ({navigation}) => {

    const [toggle, setToggle] = React.useState(true);
    const [phone, setPhone] = React.useState();

    return <>
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), D_Height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>비밀번호 찾기</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>

            <View style={{ width: D_Width, height: D_Height * 0.07, flexDirection: 'row' }}>
                <Pressable onPress={() => setToggle(true)} style={{ width: '50%', height: '100%', backgroundColor:toggle ? 'white' :'grey' , justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', color: toggle ? "black":'white'  }}>휴대폰으로 찾기</Text>
                </Pressable>
                <Pressable onPress={() => setToggle(false)} style={{ width: '50%', height: '100%', backgroundColor: toggle ? 'grey' : 'white', justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', color: toggle ? "white":'black'  }}>이메일로 찾기</Text>
                </Pressable>
            </View>

            <View style={{ flexDirection: 'column', marginHorizontal: 10, justifyContent: 'center' }}>
                <TextInput
                    style={styles.text_input}
                    placeholder="아이디 입력 *"
                />
                <TextInput
                    style={styles.text_input}
                    placeholder="입점사는 법인명, 일반회원은 가입자명을 입력 *"
                />
                {toggle ?
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <SelectDropdown
                                data={PhoneNumber}
                                onSelect={(selectedItem, index) => {
                                    setPhone(selectedItem);
                                }}
                                renderDropdownIcon={() => {
                                    return <>
                                        <View style={{ backgroundColor: 'grey', paddingVertical: '2%', paddingHorizontal: '2%' }}>
                                            <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                                        </View>
                                    </>
                                }}
                                buttonStyle={{  borderColor:'grey', borderWidth: 1, borderRadius: 5, width:'25%', paddingLeft: 5, paddingHorizontal: 10, backgroundColor:'white' }}
                                buttonTextStyle={{ borderColor:'grey', fontSize: 13, textAlign: 'left', fontWeight: 'bold', color: 'grey' }}
                                defaultValue={PhoneNumber[0]}
                            />
                            <TextInput
                                style={{ borderColor:'grey', borderWidth: 1, borderRadius: 5, width:'35%', paddingHorizontal: 10 }}
                            />
                            <TextInput
                                style={{ borderColor:'grey', borderWidth: 1, borderRadius: 5, width:'35%', paddingHorizontal: 10 }}
                            />
                        </View>
                        <TextInput
                            style={styles.text_input}
                            placeholder="안증번호 입력"
                        />
                        <Pressable
                            onPress={{}}
                            style={[styles.button,{backgroundColor:'rgb(246,246,246)'}]}>
                            <Text style={{ alignSelf: 'center', fontSize: 18, color:'black', fontWeight: 'bold', paddingVertical:5 }}>인증번호 받기</Text>
                        </Pressable>
                    </View>
                    :
                    <View>
                        <TextInput
                            style={styles.text_input}
                            placeholder="이메일 입력"
                        />
                    </View>
                }
                <Pressable
                    onPress={{}}
                    style={styles.button}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, color:'white', fontWeight: 'bold', paddingVertical:5 }}>확인</Text>
                </Pressable>
            </View>
        </ScrollView>
    </>
}
export default PassHelp

const styles = StyleSheet.create({
    text_input:{
        borderWidth: 1,
        borderColor:'grey', 
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical:10,
        marginVertical:5
    },
    button:{
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center',
        backgroundColor: 'rgb(237,118,47)',
        paddingVertical:5
    }
})