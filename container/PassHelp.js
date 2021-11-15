import * as React from 'react';
import { ScrollView, Text, View, Pressable, TextInput, Button } from 'react-native';
import { D_Height, D_Width } from '../utils/deviceSize';

const PassHelp = () => {

    const [toggle, setToggle] = React.useState(false);

    return <>
        <ScrollView style={{ backgroundColor: 'rgb(234,234,234)' }}>
            <View style={{ width: D_Width, height: D_Height * 0.08, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>비밀번호 찾기</Text>
            </View>
            <View style={{ width: D_Width, height: D_Height * 0.07, flexDirection: 'row' }}>
                <Pressable onPress={() => setToggle(false)} style={{ width: '50%', height: '100%', backgroundColor:toggle ? 'rgb(234,234,234)' :'grey' , justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center' }}>휴대폰으로 찾기</Text>
                </Pressable>
                <Pressable onPress={() => setToggle(true)} style={{ width: '50%', height: '100%', backgroundColor: toggle ? 'grey' : 'rgb(234,234,234)', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center' }}>이메일로 찾기</Text>
                </Pressable>
            </View>
            <View style={{ flexDirection: 'column', marginVertical: 10, marginHorizontal: 10, justifyContent: 'center' }}>
                <TextInput
                    style={{ borderWidth: 1, borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10 }}
                    placeholder="아이디 입력 *"
                />
                <TextInput
                    style={{ borderWidth: 1, borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10, marginTop:10 }}
                    placeholder="입점사는 법인명, 일반회원은 가입자명을 입력 *"
                />
                {toggle ?
                    <View>
                        <TextInput
                            style={{ borderWidth: 1, borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10, marginVertical: 10 }}
                            placeholder="이메일 입력"
                        />
                    </View>
                    :
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
                            style={{ borderWidth: 1, borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10, marginVertical: 10, justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', fontSize: D_Height * 0.03, fontWeight: 'bold' }}>인증번호 받기</Text>
                        </Pressable>
                    </View>
                }
                <Pressable
                    onPress={{}}
                    style={{ borderWidth: 1, borderRadius: 5, height: D_Height * 0.07, paddingHorizontal: 10, marginVertical: 10, justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: D_Height * 0.03, fontWeight: 'bold' }}>확인</Text>
                </Pressable>
            </View>
        </ScrollView>
    </>
}
export default PassHelp