import * as React from 'react';
import { View, Text, TextInput, Button, Pressable, ScrollView, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { D_Height, D_Width } from "../utils/deviceSize";
import db from '../config.json';
import axios, { Axios } from 'axios';
// stand-alone 버전(배포)일땐 expo-google-sign-in으로 교체 필요 
// expo 로컬 테스트시에만 사용
import * as Google from 'expo-google-app-auth'; 


// import 
const TestPage = ({navigation}) => {

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [check, setCheck] = React.useState(false);
    const [social_google, setSocial_google] = React.useState();

    const login = async() => {
        if (username === undefined || username === "") {
            return alert("아이디를 입력해 주세요");
        }
        else if (password === undefined || password === "") {
            return alert("비밀번호를 입력해 주세요")
        }
        else {
            try {
                // 계정 인증
                const response = await axios({
                    headers:{
                        'Content-Type':"application/json",
                        'Accept':'application/json',
                    },
                    url:'http://183.111.166.172:8080/sun/sun/login',
                    method:'post',
                    data:{
                        username:username,
                        password:password,
                        social_google:social_google
                    }
                });
                const result = JSON.parse(response.data.user)[0];
                if(result === undefined){
                    return alert("아이디 비밀번호를 확인해 주세요");
                }
                else{
                    alert(`${result.Name}님 로그인 되었습니다.`);
                    setUsername("");
                    setPassword("");
                    return navigation.navigate('mainPage')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    // Google Login Start
    // const [userInfo, setUserInfo] = React.useState();

    // const config = {
    //     iosClientId: '715641560101-onksotm9u5rsgpdblhlg68m7i4e24ii2.apps.googleusercontent.com',
    //     androidClientId: '715641560101-qjsnevgtc0i676naftis2rsitmrq0du6.apps.googleusercontent.com',
    //     iosStandaloneAppClientId: '715641560101-onksotm9u5rsgpdblhlg68m7i4e24ii2.apps.googleusercontent.com',
    //     androidStandaloneAppClientId: '715641560101-qjsnevgtc0i676naftis2rsitmrq0du6.apps.googleusercontent.com',
    //     scopes: ['profile', 'email']
    // };
    // const onPress = async () => {
    //     await Google.logInAsync(config)
    //         .then((result) => {
    //             setUserInfo(result);
    //             // console.log("로그인 성공 : " + JSON.stringify(result));
    //         })
    //         .catch(error => {
    //             console.log('error logInAsync');
    //             console.log(error);
    //         });
    // }
    // React.useEffect(()=>{
    //     googleSignIn();
    // },[userInfo])

    // const googleSignIn = async () => {
    //     try {
    //         const response = await axios({
    //             headers: {
    //                 'Conten-Type': 'application/json',
    //                 'Accept': 'application/json',
    //             },
    //             url: 'http://183.111.166.172:8080/sun/sun/login', 
    //             method: 'post',
    //             data: {
    //                 username: '123',
    //                 password: '123',
    //                 social_google: userInfo.user.id
    //             }
    //         })
    //         const result22 = JSON.parse(response.data.user)[0];
    //         if (result22 === undefined) {
    //             return alert("가입된 계정이 없습니다.");
    //         }
    //         else {
    //             // console.log(result22);
    //             return alert(result22.Name);
    //         }
    //     } catch (err) {
    //         console.log("계정없음" + err)
    //     }

    // }
    // google login End


    return <>
        <ScrollView style={{ backgroundColor: 'rgb(234,234,234)', width: D_Width, height: D_Height }}>
            <View style={{ width: D_Width, height: D_Height * 0.08, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>로그인</Text>
            </View>
            <View>
                <View style={{ paddingVertical: 10, width: D_Width, height: D_Height * 0.18, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <TextInput
                        style={{ paddingHorizontal: 5, backgroundColor: 'white', borderWidth: 1, borderColor: 'rgb(209,209,211)', width: '90%', height: '40%' }}
                        keyboardType="default"
                        textContentType="name"
                        placeholder="아이디"
                        value={username}
                        onChangeText={setUsername} />

                    <TextInput
                        style={{ paddingHorizontal: 5, backgroundColor: 'white', borderWidth: 1, borderColor: 'rgb(209,209,211)', width: '90%', height: '40%' }}
                        secureTextEntry={true}
                        textContentType="name"
                        placeholder="비밀번호"
                        value={password}
                        onChangeText={setPassword} />
                </View>
                <View style={{ justifyContent:'center', flexDirection:'row'}}>
                    <Pressable onPress={() => login()} style={{ width: '90%', height: D_Height * 0.07, backgroundColor: 'rgb(144,176,89)', borderWidth: 1, borderColor:'rgb(209,209,211)', alignItems:'center', justifyContent:'center' }} >
                        <Text style={{ color: 'white', fontSize: 18 }}>로그인</Text>
                    </Pressable>
                </View>
                {/* <View style={{ justifyContent:'center', flexDirection:'row'}}>
                    <Pressable onPress={() => onPress()} style={{ width: '90%', height: D_Height * 0.07, backgroundColor: 'rgb(144,176,89)', borderWidth: 1, borderColor:'rgb(209,209,211)', alignItems:'center', justifyContent:'center' }} >
                        <Text style={{ color: 'white', fontSize: 18 }}>구글 로그인</Text>
                    </Pressable>
                </View> */}
            </View>
            
            <CheckBox containerStyle={{backgroundColor:'rgb(234,234,234)', height:"5%", padding:0}} title="자동 로그인" checked={check} onPress={()=>check === true ? setCheck(false) : setCheck(true)} right iconRight/>
            <View style={{width:"100%", height:D_Height*0.5, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <View style={{  width: '60%', height: '100%' }}>
                    <Image source={{ uri: 'https://flda.co.kr/data/flda/banner/cartoon_bn_03.png' }} style={{ width: "100%", height: "80%" }} />
                    <View style={{flexDirection:'row', justifyContent:'center', paddingVertical:5}}><Text>아직 회원이 아니신가요?</Text><Text onPress={()=>navigation.navigate('signUpTerms')} style={{ textDecorationLine:'underline'}}>  회원가입</Text></View>
                    <View style={{alignSelf:'center', flexDirection:'row'}}><Text onPress={()=>navigation.navigate('idHelp')} style={{textDecorationLine:'underline'}}>아이디 /</Text><Text onPress={()=>navigation.navigate('pwHelp')} style={{textDecorationLine:'underline'}}> 비밀번호 찾기</Text></View>
                </View>
            </View>
            <Text>
                
            </Text>
        </ScrollView>
    </>
}

export default TestPage