import * as React from 'react';
import { ScrollView, Text, View, Pressable, TextInput, Button } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';

const IdHelp = ({navigation}) => {

    const [toggle, setToggle] = React.useState(true);

    return <>
        <ScrollView style={{ backgroundColor: 'rgb(234,234,234)' }}>
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), D_Height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>아이디 찾기</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            <View style={{ width: D_Width, height: D_Height * 0.07, flexDirection: 'row' }}>
                <Pressable onPress={() => setToggle(true)} style={{ width: '50%', height: '100%', backgroundColor: toggle ? 'rgb(234,234,234)' : 'grey', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center' }}>휴대폰으로 찾기</Text>
                </Pressable>
                <Pressable onPress={() => setToggle(false)} style={{ width: '50%', height: '100%', backgroundColor:toggle ? 'grey' : 'rgb(234,234,234)', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center' }}>이메일로 찾기</Text>
                </Pressable>
            </View>
            <View style={{ flexDirection: 'column', marginVertical: 10, marginHorizontal: 10, justifyContent: 'center' }}>
                <TextInput
                    style={{ borderWidth: 1, borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10 }}
                    placeholder="입점사는 법인명, 일반회원은 가입자명을 입력 *"
                />
                {toggle ?
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 5, width: '30%', height: D_Height * 0.07, paddingHorizontal: 10 }}
                                placeholder="휴대폰"
                            />
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 5, height: '60%', width: '30%', height: D_Height * 0.07, paddingLeft: 5, paddingHorizontal: 10 }}
                            />
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 5, height: '60%', width: '30%', height: D_Height * 0.07, paddingLeft: 5, paddingHorizontal: 10 }}
                            />
                        </View>
                        <TextInput
                            style={{ borderWidth: 1, borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10 }}
                            placeholder="안증번호 입력"
                        />
                        <Pressable
                            onPress={{}}
                            style={{ borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10, marginVertical: 10, justifyContent: 'center', backgroundColor: 'rgb(144,176,89)'  }}>
                            <Text style={{ alignSelf: 'center', fontSize: D_Height * 0.03, color:'white', fontWeight: 'bold' }}>인증번호 받기</Text>
                        </Pressable>
                    </View>
                    :
                    <View>
                        <TextInput
                            style={{ borderWidth: 1, borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10, marginVertical:10 }}
                            placeholder="이메일 입력"
                        />
                    </View>
                }
                <Pressable
                    onPress={{}}
                    style={{ borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10, marginVertical: 10, justifyContent: 'center', backgroundColor: 'rgb(144,176,89)' }}>
                    <Text style={{ alignSelf: 'center', fontSize: D_Height * 0.03, color: 'white', fontWeight: 'bold' }}>확인</Text>
                </Pressable>
            </View>
        </ScrollView>
    </>
}
export default IdHelp