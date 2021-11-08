import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Animatable from 'react-native-animatable';

const SignUpTerms = ({ navigation }) => {
    const [check_1, setCheck_1]=React.useState(false);
    const [check_2, setCheck_2]=React.useState(false);
    const [check_all, setCheck_all]=React.useState(false);
    const [check_all2, setCheck_all2]=React.useState(false);
    
    React.useEffect(()=>{
        check_1 && check_2 ? setCheck_all(true) : setCheck_all(false);
    },[check_1, check_2]);

    React.useEffect(()=>{
        if(check_all){
            setCheck_1(true);
            setCheck_2(true);
        }
        else{
            setCheck_1(false);
            setCheck_2(false);
        }
    },[check_all2])

    const next = () => {
        if(!check_all){
            if(!check_1){
                alert("회원가입 약관에 동의 해주세요");
            }
            else if(!check_2){
                alert("개인정보처리방침에 동의 해주세요");
            }
        }
        else{
            navigation.navigate('signUpInput');
        }
    }

    return <>
        <ScrollView style={{ backgroundColor: 'white' }}>
            {/* 최상단*/}
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), D_Height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>회원 동의</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            {/* Content Box Start */}
            <View style={{ width: D_Width, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                {/* 회원가입 약관 */}
                <View style={{ width: '90%', borderWidth: 1, borderColor: 'rgb(209,209,211)', height: D_Height * 0.06, borderRadius: 5, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                        <BouncyCheckbox
                            size={20}
                            text="회원가입 약관"
                            textStyle={{ color: 'black', textDecorationLine: 'none' }}
                            iconStyle={{ backgroundColor:check_1 ? 'rgb(144,176,89)' : 'white' }}
                            disableBuiltInState
                            isChecked={check_1}
                            onPress={()=>{
                                setCheck_1(!check_1);
                            }}
                        />
                        <View style={{ flex: 1, alignItems: 'flex-end' }}><Text onPress={()=>setMoreContent(!moreContent)} style={{ fontSize: 16, lineHeight: 20 }}>내용보기</Text></View>
                    </View>
                </View>
{/* 
                <Animatable.View style={{width: '100%', height: moreContent ? D_Height * 0.5 : 0, backgroundColor: 'red', transition:10 }}>
                    <Text>
                    </Text>
                </Animatable.View> */}

                {/* 개인정보처리방침 */}
                <View style={{ width: '90%', borderWidth: 1, borderColor: 'rgb(209,209,211)', height: D_Height * 0.06, borderRadius: 5, marginVertical: 30, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                        <BouncyCheckbox
                            size={20}
                            text="개인정보처리방침"
                            textStyle={{ color: 'black', textDecorationLine: 'none' }}
                            iconStyle={{ backgroundColor:check_2 ? 'rgb(144,176,89)' : 'white' }}
                            disableBuiltInState
                            isChecked={check_2}
                            onPress={()=>{setCheck_2(!check_2);
                            }}
                        />
                        <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={{ fontSize: 16, lineHeight: 20 }}>내용보기</Text></View>
                    </View>
                </View>
                {/* 전체 동의 */}
                <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
                    <BouncyCheckbox
                        size={20}
                        text="위 약관에 모두 동의합니다"
                        textStyle={{ color: 'black', textDecorationLine: 'none' }}
                        iconStyle={{ backgroundColor:check_all ? 'rgb(144,176,89)' : 'white' }}
                        disableBuiltInState
                        isChecked={check_all}
                        onPress={()=>{setCheck_all(!check_all); setCheck_all2(!check_all2)}}
                    />
                </View>
                {/* 다음 버튼 */}
                <Pressable onPress={() => next()} style={{ backgroundColor: 'rgb(144,176,89)', width: '90%', height: D_Height * 0.06, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>다음</Text>
                </Pressable>

            </View>
            {/* Content Box End */}
        </ScrollView>
    </>
}
export default SignUpTerms