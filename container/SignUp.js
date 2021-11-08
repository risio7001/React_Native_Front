import * as React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Modal } from 'react-native';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import SelectDropdown from 'react-native-select-dropdown'
import {addr, signUpPath, specialty} from '../data/emailAddr';
import Postcode from '@actbase/react-daum-postcode';
import Constants from 'expo-constants';
import axios from 'axios';


const SignUp = ({navigation}) => {
    const [emailSelect, setEmailSelect] = React.useState();
    const [emailDI, setEmailDI] = React.useState(false);
    const [isModal, setIsModal] = React.useState(false);
    const [address, setAddress] = React.useState();
    const [address2, setAddress2] = React.useState();
    const [id, setId] = React.useState();
    const [idCheck, setIdCheck] = React.useState(false);
    const [password, setPassword] = React.useState();
    const [password2, setPassword2] = React.useState();
    const [passwordCheck, setPasswordCheck] = React.useState(false);

    React.useEffect(()=>{

        if(password === undefined || password === ""){
            setPasswordCheck(false);
        }
        else{
            if (password === password2) {
                setPasswordCheck(true);
            }
            else {
                setPasswordCheck(false);
            }
        }
            

    },[password2, password]);

    const Check = async () => {
        try{
            const response = await axios({
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                url:"http://183.111.166.172:8080/sun/sun/idCheck",
                method:'post',
                data:{
                    "id":id
                }
            })
            if(response.data.recordset.length === 0){
                setIdCheck(true);
                return alert("사용 가능한 아이디 입니다.");
            }
            else{
                setIdCheck(false);
                return alert("사용불가능한 아이디 입니다.");
            }
        }catch(err){
            console.log(err);
        }
    }

    return <>
        <ScrollView>
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), D_Height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>회원 입력</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            <View style={{ paddingVertical: 25, paddingHorizontal:15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    계정정보
                </Text>

                <View style={{ width: '100%', height: D_Height * 0.1, marginTop: 15, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>아이디</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 2, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor: idCheck ? 'green' :'red' }}
                            borderWidth={1}
                            onChangeText={setId}
                        />
                        <View style={{ flex: 1, backgroundColor:'rgb(178,171,154)', height:'60%', alignSelf:'center', justifyContent:'center', marginLeft:5}}>
                            <Text onPress={()=>Check()} style={{textAlign:'center', justifyContent:'center', color:'white'}}>중복확인</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>비밀번호</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor: passwordCheck ? 'green' : 'red' }}
                            borderWidth={1}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>비밀번호 확인</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor: passwordCheck ? 'green' : 'red' }}
                            placeholder="비밀번호 재입력"
                            borderWidth={1}
                            onChangeText={setPassword2}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>업체명</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            placeholder="사업자등록증 상의 업체명"
                            borderWidth={1} 
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>대표자명</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            placeholder="사업자등록증에 표시된 대표자명"
                            borderWidth={1}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>휴대전화</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 1, height:'60%', alignSelf:'center', marginHorizontal:5, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                        <TextInput style={{ flex: 1, height:'60%', alignSelf:'center', marginHorizontal:5, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                        <TextInput style={{ flex: 1, height:'60%', alignSelf:'center', marginHorizontal:5, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>일반전화</Text>
                        </View>
                        <TextInput style={{ flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                        <TextInput style={{ flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                        <TextInput style={{ flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>팩스</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.2, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>이메일</Text>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 3 }}>
                            <View style={{ width: '100%', height: '50%', flexDirection:'row' }}>
                                <TextInput style={{ flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                                    borderWidth={1}
                                />
                                <Text style={{ alignSelf:'center'}}>@</Text>
                                <TextInput style={{ display: emailDI ? "flex" : 'none', flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                                    borderWidth={1}
                                /> 
                                <SelectDropdown 
                                    data={addr}
                                    onSelect={(selectedItem, index)=>{
                                        console.log(index);
                                        if(index == 0 ){
                                            setEmailDI(true)
                                        }
                                        else{
                                            setEmailDI(false)
                                            setEmailSelect(selectedItem);
                                        }
                                        
                                    }}
                                    buttonStyle={{flex:1, justifyContent:'center', alignSelf:'center'}}
                                    buttonTextStyle={{fontSize:15}}
                                    defaultButtonText="선택"
                                    
                                />
                            </View>
                            <View style={{ backgroundColor: 'rgb(178,171,154)',width:'100%', height: '30%', alignSelf: 'center', justifyContent: 'center', marginLeft: 5 }}>
                                <Text onPress={()=>alert("이메일 중복확인")} style={{ textAlign: 'center', justifyContent: 'center', color: 'white' }}>중복확인</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:5, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap:'wrap', justifyContent:'center', alignSelf:'center' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>사업자등록번호</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 2, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="-를 제외하고 입력해주세요"
                        />
                        <View style={{ flex: 1, backgroundColor:'rgb(178,171,154)', height:'60%', alignSelf:'center', justifyContent:'center', marginLeft:5}}>
                            <Text onPress={()=>alert("아이디 중복확인")} style={{textAlign:'center', justifyContent:'center', color:'white'}}>유효성 확인</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>사업자등록증첨부</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>판매자 매장홍보 사진</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>판매자 매장 설명</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="판매자 매장 설명"
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>통신판매번호</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="통신판매번호"
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>유치가맹점아이디</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="유치가맹점아이디"
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>사업장주소</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <Text style={{ borderWidth:1, flex: 2, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}>
                            {address === undefined ? "" : address}
                        </Text>
                        <View style={{ flex: 1, backgroundColor:'rgb(178,171,154)', height:'60%', alignSelf:'center', justifyContent:'center', marginLeft:5}}>
                            <Text onPress={()=>setIsModal(true)} style={{textAlign:'center', justifyContent:'center', color:'white'}}>찾기</Text>
                        </View>
                        
                        <Modal visible={isModal}>
                        <Postcode
                            style={{flex:3, paddingTop:Constants.statusBarHeight}}
                            jsOptions={{animation:true}}
                            onSelected={data=>{
                                setAddress(data.address)
                                setIsModal(false);
                            }}
                        />
                        </Modal>
                    </View>
                </View>
                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor:'rgb(209,209,211)' }}>
                    <View style={{paddingHorizontal:10, flexDirection: 'row', height:'100%'}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize:12 }}>상세주소입력</Text><Text style={{ alignSelf: 'center', color:'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height:'60%', alignSelf:'center', paddingHorizontal:10, borderColor:'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="상세 주소를 입력해주세요"
                            onChangeText={setAddress2}
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>가입경로</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <SelectDropdown
                            data={signUpPath}
                            onSelect={(selectedItem3, index) => {
                                console.log(selectedItem3)
                            }}
                            buttonStyle={{ flex: 3, justifyContent: 'center', alignSelf: 'center', borderWidth: 1, borderColor: 'rgb(209,209,211)' }}
                            buttonTextStyle={{ fontSize: 15 }}
                            defaultButtonText="선택"
                        />
                    </View>
                    
                </View>
                {/* <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                    borderWidth={1}
                /> */}
                <View style={{ width: '100%', height: D_Height * 0.1 }}>
                    <Pressable style={{paddingHorizontal:10, flexDirection: 'row', height:'100%', justifyContent:'center', alignItems:'center', borderRadius:5, backgroundColor:'green'}}>
                        <Text style={{ fontSize:15, color:'white' }}>
                            가입하기
                        </Text>
                    </Pressable>
                </View>
                
            </View>
        </ScrollView>
    </>
}
export default SignUp
