import * as React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Modal, Image, ImageBackground } from 'react-native';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Arrow2 from '../img/arrow2.svg';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import SelectDropdown from 'react-native-select-dropdown'
import { addr, signUpPath, specialty, bankList } from '../data/emailAddr';
import Postcode from '@actbase/react-daum-postcode';
import Constants from 'expo-constants';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


const SignUp = ({ navigation }) => {
    const [color, setColor] = React.useState(false);
    const [emailDI, setEmailDI] = React.useState(false);
    const [isModal, setIsModal] = React.useState(false);
    const [address, setAddress] = React.useState();
    const [address2, setAddress2] = React.useState();
    const [id, setId] = React.useState();
    const [biz, setBiz] = React.useState();
    const [email, setEmail] = React.useState();
    const [email2, setEmail2] = React.useState();
    const [idCheck, setIdCheck] = React.useState(false);
    const [bizNoCheck, setBizNoCheck] = React.useState(false);
    const [emailCheck, setEmailCheck] = React.useState(false);
    const [password, setPassword] = React.useState();
    const [password2, setPassword2] = React.useState();
    const [passwordCheck, setPasswordCheck] = React.useState(false);
    const [imgPath, setImgPath] = React.useState();
    const [deps_target, setDeps_target] = React.useState(); // 타겟 저장
    const [deps_1, setDeps_1] = React.useState(); // 받아온 데이터 저장
    const [deps_2, setDeps_2] = React.useState(); // 받아온 데이터 저장
    const [deps_3, setDeps_3] = React.useState(); // 받아온 데이터 저장
    const [cortarNo, setCortarNo] = React.useState(""); // 하위 행정구역 코드 저장
    const [deps_stack, setDeps_stack] = React.useState();
    const [deps_stack2, setDeps_stack2] = React.useState();
    const [select, setSelect] = React.useState(1);
    const [select2, setSelect2] = React.useState(1);
    const [dongStack, setdongStack] = React.useState([]);

    const [totalStack, setTotalStack] = React.useState();


    React.useEffect(() => {
        getMap();
    }, [cortarNo]);

    let minData = [];

    const getMap = async () => {

        await fetch(`https://land.naver.com/childRegionList.nhn?cortarNo=${cortarNo}&&rletTypeCd=A01`)
            .then((res) => res.json())
            .then((json) => {

                switch (deps_target) {
                    case 'gugun':
                        return setDeps_2(json.Region);
                    case 'dong':
                        json.Region.forEach((element, index) => {
                            minData.push({
                                "name": element.cortar_nm,
                                "index": index,
                                "select": 'red'
                            });
                        });

                        return setDeps_3(minData);
                    default:
                        return setDeps_1(json.Region);
                }
            })
            .catch((err) => console.log(err))
    }

    React.useEffect(() => {

        if (password === undefined || password === "") {
            setPasswordCheck(false);
        }
        else {
            if (password === password2) {
                setPasswordCheck(true);
            }
            else {
                setPasswordCheck(false);
            }
        }

    }, [password2, password]);

    const Check = async () => {
        try {
            const response = await axios({
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                url: "http://183.111.166.172:8080/sun/sun/idCheck",
                method: 'post',
                data: {
                    "id": id
                }
            })
            if (response.data.recordset.length === 0) {
                setIdCheck(true);
                return alert("사용 가능한 아이디 입니다.");
            }
            else {
                setIdCheck(false);
                return alert("사용불가능한 아이디 입니다.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const CheckBizNo = async () =>{
        try {
            const response = await axios({
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                url: "http://183.111.166.172:8080/sun/sun/bizCheck",
                method: 'post',
                data: {
                    "biz": biz
                }
            })
            if (response.data.recordset.length === 0) {
                setBizNoCheck(true);
                return alert("사용하실 수 있는 사업자번호입니다.");
            }
            else {
                setBizNoCheck(false);
                return alert("중복 사업자 번호가 존재합니다.");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const CheckEmail = async () =>{
        try {
            const response = await axios({
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                url: "http://183.111.166.172:8080/sun/sun/emailCheck",
                method: 'post',
                data: {
                    "email": email
                }
            })
            if (response.data.recordset.length === 0) {
                setEmailCheck(true);
                return alert("사용하실 수 있는 이메일입니다.");
            }
            else {
                setEmailCheck(false);
                return alert("중복 이메일이 존재합니다.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const _pickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            console.log(result);
            return setImgPath(result.uri);
        }
        else {
            return alert("취소 되었습니다.");
        }
    };

    const putData = () => {
    }
    // React.useEffect(()=>{
    //     dongColor = totalStack;
    //     console.log(dongColor);
    // },[totalStack]);

    let smallData = [];
    let totalDong = [];

    let data = [];
    // React.useEffect(()=>{
    // },[dongStack]);

    React.useEffect(()=>{

    },[color]);
    const submitSignUp = async () =>{

        const fb = new FormData();
        fd.append('userid',)

        try{
            const response = await axios({
                headers:{
                    'Accept':'application/json',
                    "Content-Type": "multipart/form-data",
                },
                url:'http://183.111.163.172:8080/sun/sun/signUp',
                method:'post',
                data:fb
            })
            console.log(response.data.recordset);
            
        }catch(err){

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
            <View style={{ paddingVertical: 25, paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    계정정보
                </Text>

                <View style={{ width: '100%', height: D_Height * 0.1, marginTop: 15, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>아이디</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 2, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: idCheck ? 'green' : 'red' }}
                            borderWidth={1}
                            onChangeText={setId}
                        />
                        <View style={{ flex: 1, backgroundColor: 'rgb(178,171,154)', height: '60%', alignSelf: 'center', justifyContent: 'center', marginLeft: 5 }}>
                            <Text onPress={() => Check()} style={{ textAlign: 'center', justifyContent: 'center', color: 'white' }}>중복확인</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>비밀번호</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: passwordCheck ? 'green' : 'red' }}
                            borderWidth={1}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>비밀번호 확인</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: passwordCheck ? 'green' : 'red' }}
                            placeholder="비밀번호 재입력"
                            borderWidth={1}
                            onChangeText={setPassword2}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>업체명</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            placeholder="사업자등록증 상의 업체명"
                            borderWidth={1}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>대표자명</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            placeholder="사업자등록증에 표시된 대표자명"
                            borderWidth={1}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>휴대전화</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
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

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
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

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>팩스</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
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
                            <View style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
                                <TextInput style={{ flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                                    borderWidth={1}
                                    onChangeText={setEmail}
                                />
                                <Text style={{ alignSelf: 'center' }}>@</Text>
                                <TextInput style={{ display: emailDI ? "flex" : 'none', flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                                    borderWidth={1}
                                    onChangeText={setEmail2}
                                />
                                <SelectDropdown
                                    data={addr}
                                    onSelect={(selectedItem, index) => {
                                        console.log(index);
                                        if (index == 0) {
                                            setEmailDI(true)
                                        }
                                        else {
                                            setEmailDI(false)
                                            setEmail2(selectedItem);
                                        }

                                    }}
                                    buttonStyle={{ marginHorizontal: 5, height: '60%', flex: 1, justifyContent: 'center', alignSelf: 'center', borderWidth: 1, borderColor: 'rgb(209,209,211)' }}
                                    buttonTextStyle={{ fontSize: 15 }}
                                    defaultButtonText="선택하세요"

                                />
                            </View>
                            <View style={{ backgroundColor: 'rgb(178,171,154)', width: '100%', height: '30%', alignSelf: 'center', justifyContent: 'center', marginLeft: 5 }}>
                                <Text onPress={() => CheckEmail()} style={{ textAlign: 'center', justifyContent: 'center', color: 'white' }}>중복확인</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 5, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>사업자등록번호</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 2, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            onChangeText = {setBiz}
                            placeholder="-를 제외하고 입력해주세요"
                        />
                        <View style={{ flex: 1, backgroundColor: 'rgb(178,171,154)', height: '60%', alignSelf: 'center', justifyContent: 'center', marginLeft: 5 }}>
                            <Text onPress={() => CheckBizNo()} style={{ textAlign: 'center', justifyContent: 'center', color: 'white' }}>유효성 확인</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>사업자등록증첨부</Text>
                        </View>
                        <Pressable onPress={() => _pickImage()} style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                        >
                            <Text>{imgPath === undefined ? "" : imgPath}</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>판매자 매장홍보 사진</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>판매자 매장 설명</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="판매자 매장 설명"
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>통신판매번호</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="통신판매번호"
                        />
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>유치가맹점아이디</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="유치가맹점아이디"
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>사업장주소</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <Text style={{ borderWidth: 1, flex: 2, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}>
                            {address === undefined ? "" : address}
                        </Text>
                        <View style={{ flex: 1, backgroundColor: 'rgb(178,171,154)', height: '60%', alignSelf: 'center', justifyContent: 'center', marginLeft: 5 }}>
                            <Text onPress={() => setIsModal(true)} style={{ textAlign: 'center', justifyContent: 'center', color: 'white' }}>찾기</Text>
                        </View>

                        <Modal visible={isModal}>
                            <Postcode
                                style={{ flex: 3, paddingTop: Constants.statusBarHeight }}
                                jsOptions={{ animation: true }}
                                onSelected={data => {
                                    setAddress(data.address)
                                    setIsModal(false);
                                }}
                            />
                        </Modal>
                    </View>
                </View>
                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>상세주소입력</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
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
                            defaultButtonText="선택하세요"
                        />
                    </View>
                </View>
                {/* <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                    borderWidth={1}
                /> */}

            </View>

            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    업체특징
                </Text>
                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)', marginVertical: 20 }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>전문분야선택</Text><Text style={{ alignSelf: 'center', color: 'red' }}>*</Text>
                        </View>
                        <SelectDropdown
                            data={specialty}
                            onSelect={(selectedItem3, index) => {
                                console.log(selectedItem3)
                            }}
                            buttonStyle={{ flex: 3, justifyContent: 'center', alignSelf: 'center', borderWidth: 1, borderColor: 'rgb(209,209,211)' }}
                            buttonTextStyle={{ fontSize: 15 }}
                            defaultButtonText="선택하세요"
                        />
                    </View>
                </View>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    배송지 선택
                </Text>
                <View style={{ width: '100%', height: D_Height * 0.05, borderWidth: 1, borderColor: 'rgb(150,150,150)', marginVertical: 20, justifyContent: 'space-between', flexDirection:'row', paddingHorizontal:15 }}>
                    <Text style={{ alignSelf: 'center' }}>시/도</Text>
                    <LocalSvg asset={Arrow2} width={20} height={20} fill={"#969696"} transform={[{rotate:'90deg'}]} alignSelf={'center'}/>
                    {/* <ImageBackground source={Ping}  resizeMode='contain' style={{ width: "80%", height: "80%",backgroundColor:'red', transform: [{ rotate: '90deg' }] }} /> */}
                </View>
                <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text>
                        {deps_1 === undefined ? "" : deps_1.map((sido, index) => (
                            <Pressable onPress={() => {
                                // console.log(data.length);
                                setDeps_2();
                                setDeps_3();
                                setdongStack();
                                setDeps_stack(sido.cortar_nm);
                                setDeps_target("gugun");
                                setCortarNo(sido.cortar_no)
                                setSelect(index)
                            }} style={{ borderWidth: select === index ? 2 : 1, borderColor: select === index ? 'red' : 'black', width: D_Width * 0.28, height: D_Height * 0.03, justifyContent: 'center' }} key={index}>
                                <Text style={{ alignSelf: 'center' }}>{sido.cortar_nm}</Text>
                            </Pressable>
                        ))}
                    </Text>
                </View>
                {deps_2 === undefined ? null :
                    <View style={{ width: '100%' }}>
                        <View style={{ width: '100%', height: D_Height * 0.05, borderWidth: 1, borderColor: 'rgb(150,150,150)', marginVertical: 20, justifyContent: 'space-between', flexDirection:'row', paddingHorizontal:15 }}>
                            <Text style={{ alignSelf: 'center' }}>시/군/구</Text>
                            <LocalSvg asset={Arrow2} width={20} height={20} fill={"#969696"} transform={[{rotate:'90deg'}]} alignSelf={'center'}/>
                        </View>
                        <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text>
                                {deps_2 === undefined ? "" : deps_2.map((gugun, index) => (
                                    <Pressable onPress={() => {
                                        setDeps_target("dong");
                                        setDeps_stack2(gugun.cortar_nm);
                                        setCortarNo(gugun.cortar_no)
                                        setSelect2(index);
                                    }} style={{ borderWidth: select2 === index ? 2 : 1, borderColor: select2 === index ? 'red' : 'black', width: D_Width * 0.28, height: D_Height * 0.03, justifyContent: 'center' }} key={index}>
                                        <Text style={{ alignSelf: 'center' }}>{gugun.cortar_nm}</Text>
                                    </Pressable>
                                ))}
                            </Text>
                        </View>
                    </View>
                }
                {deps_3 === undefined ? null :
                    <View style={{ width: '100%' }}>
                        <View style={{ width: '100%', height: D_Height * 0.05, borderWidth: 1, borderColor: 'rgb(150,150,150)', marginVertical: 20, justifyContent: 'space-between', flexDirection:'row', paddingHorizontal:15 }}>
                            <Text style={{ alignSelf: 'center' }}>읍/면/동</Text>
                            <Pressable onPress={()=>{
                                if(dongStack === undefined || dongStack.length < 1){
                                    deps_3.forEach((element)=>{
                                        data.push(element);
                                    })
                                    console.log("asdfasdfasdf : " + data);
                                    setdongStack(data);
                                }
                                else{
                                    setdongStack();
                                }
                            }} style={{ justifyContent:'center'}}>
                                <Text style={{alignSelf:'center'}}>모두선택</Text>
                            </Pressable>
                        </View>
                        <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text>
                                {deps_3 === undefined ? "" : deps_3.map((dong, index) => (
                                    <Pressable onPress={() => {
                                        setColor(!color);
                                        if(dongStack === undefined){
                                            let dd = data.find(element => element.name === dong.name);
                                            let delIndex = data.indexOf(dong);
                                            if (dd === undefined) {
                                                data.push(dong);
                                            }
                                            else {
                                                data.splice(delIndex, 1)
                                            }
                                            setdongStack(data);
                                        }
                                        else {
                                            data = dongStack;
                                            let dd = data.find(element => element.name === dong.name);
                                            let delIndex = data.indexOf(dong);
                                            if (dd === undefined) {
                                                data.push(dong);
                                            }
                                            else {
                                                data.splice(delIndex, 1);
                                            }
                                            setdongStack(data);
                                        }
                                        console.log();
                                    }} style={{ borderWidth: 1, width: D_Width * 0.28, height: D_Height * 0.03, justifyContent: 'center', flexDirection:'row' }} key={index}>
                                        <Text style={{ alignSelf: 'center'
                                        // ,color : 
                                        // dongStack.find(element=>element.name===dong.name) === undefined ? "black" :'red'
                                        // ,color:color === undefined ? 'black' : color.includes(dong.name) ? 'green':'red'
                                        // , color: dong.name === 
                                        // , color:dongColor.
                                        // ,color : colors()
                                        // , color:dongStack === undefined ? "black" : dongStack.find((element)=>element.dong === index) ? "red" :'black'
                                        // ,color: dongStack === undefined ? "black" : dongStack.dong.includes(index) ? "red" : "black"
                                        // , color : dongStack === undefined ? "black" : dongStack.forEach((element)=>{if(element.dong === index){return true}else{return false}}) ? "red" :"black"
                                    }}>{dong.name}</Text>
                                    
                                    {
                                        dongStack===undefined ? null : dongStack.find(element=>element.name===dong.name) === undefined ? null : 
                                        <View style={{ width:'10%', paddingLeft:'30%'}}>
                                            <LocalSvg asset={Arrow} width={10} height={10} fill={"#000000"} style={{backgroundColor:'red'}} />
                                        </View>
                                        
                                    }
                                    
                                    {/* dongStack.find(element=>element.dong.index === index) ? <View style={{ width:"30%", height:"30%", backgroundColor:'red'}}></View> : null} */}
                                    
                                    </Pressable>
                                ))}
                            </Text>
                        </View>
                    </View>
                }
                <Pressable onPress={() => {
                    if(deps_stack===undefined){
                        return alert("시/도 를 선택해주세요");
                    }
                    else if(deps_stack2===undefined){
                        return alert("시/군/구 를 선택해주세요");
                    }
                    else if(dongStack===undefined || dongStack<1){
                        return alert("읍/면/동 을 선택해주세요");
                    }
                    smallData.push({
                        "sigun": deps_stack + " " + deps_stack2,
                        "dong":dongStack
                    });
                    if (totalStack === undefined) {
                        setTotalStack(smallData);
                    }
                    else {
                        totalDong = smallData.concat(totalStack);
                        setTotalStack(totalDong);
                    }
                    setDeps_2();
                    setDeps_3();
                    setDeps_target();
                    setdongStack();
                }
                } style={{ width: '40%', height: D_Height * 0.05, borderWidth: 1, borderColor: 'rgb(209,209,211)', marginVertical: 10 }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center' }}>
                            + 배송지 추가하기
                        </Text>
                    </View>
                </Pressable>
                <View style={{ flexDirection: 'column' }}>
                    <Text>{totalStack === undefined ? "" : totalStack.map((total, index) =>
                        <View style={{ flexDirection: 'column', width: D_Width * 0.9 }} key={index} >
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                                <Text style={{ fontSize: 16 }}>{total.sigun}</Text>
                                <Text onPress={()=>{
                                    let dd = [];
                                    dd = dd.concat(totalStack);
                                    dd.splice(index, 1);
                                    setTotalStack(dd);
                                }} style={{ fontSize: 22, lineHeight:21 }}> x</Text>
                            </View>
                            <Text>{total.dong.map((dong, index) => 
                            <Text key={index}>{dong.name}{"  "}</Text>
                            )}{"\n"}</Text>
                        </View>
                    )}</Text>
                </View>

            </View>

            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    정산계좌 입력
                </Text>
                <SelectDropdown
                    data={bankList}
                    onSelect={(selectedItem3, index) => {
                        console.log(selectedItem3)
                    }}
                    buttonStyle={{ marginTop:15, width: '100%', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, borderColor: 'rgb(209,209,211)' }}
                    buttonTextStyle={{ fontSize: 15 }}
                    defaultButtonText="::은행선택::"
                />
                <View style={{ width: '100%', height: D_Height * 0.1 }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="계좌번호를 입력해주세요(-제외하고 입력)"
                            keyboardType='numeric'

                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: D_Height * 0.1 }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="예금주를 입력해주세요"
                        />
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', height: D_Height * 0.1 }}>
                <Pressable onPress={()=>{
                    submitSignUp()
                }} style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'rgb(177,171,156)' }}>
                    <Text style={{ fontSize: 15, color: 'white' }}>
                        가입하기
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    </>
}
export default SignUp
