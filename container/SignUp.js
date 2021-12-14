import * as React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Modal, SafeAreaView } from 'react-native';
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
// import { uuid } from '../utils/secretKey';
import config from '../config.json';
// import * as Analytics from 'expo-firebase-analytics';

const SignUp = ({ navigation }) => {
    const [color, setColor] = React.useState(false);
    const [emailDI, setEmailDI] = React.useState(false);
    const [isModal, setIsModal] = React.useState(false);

    const [address, setAddress] = React.useState();  // 주소
    const [address2, setAddress2] = React.useState(); // 상세주소
    const [addrLat , setAddrLat] = React.useState(); // 경도
    const [addrLng , setAddrLng] = React.useState(); // 위도
    const [post, setPost] = React.useState();  // 우편번호
    const [id, setId] = React.useState();   // 아이디
    const [bizNo, setBizNo] = React.useState(); // 사업자번호
    const [email, setEmail] = React.useState(); // 이메일
    const [email2, setEmail2] = React.useState(); // 이메일 도메인
    const [email3, setEmail3] = React.useState();
    const [dealerName, setDealerName] = React.useState(); // 업체명
    const [channel, setChannel] = React.useState(); // 가입경로
    const [chName, setChName] = React.useState();  // 대표자 명
    const [mobile1, setMobile1] = React.useState();  //핸드폰
    const [mobile2, setMobile2] = React.useState();  // 핸드폰2
    const [mobile3, setMobile3] = React.useState();  // 핸드폰3
    const [tel1, setTel1] = React.useState();  // 전화번호
    const [tel2, setTel2] = React.useState();  // 전화번호2
    const [tel3, setTel3] = React.useState();  // 전화번호3
    const [fax, setFax] = React.useState();  // 팩스번호
    const [dealerEtc5, setDealerEtc5] = React.useState(); // 판매자 매장설명
    const [dealerEtc1, setDealerEtc1] = React.useState();  // 통신 판매 번호
    const [dealerEtc2, setDealerEtc2] = React.useState();  // 전문분야
    const [recMember, setRecMember] = React.useState();  //유치 가맹점 아이디
    const [bank, setBank] = React.useState();  // 은행명
    const [account, setAccount] = React.useState();  //계좌번호
    const [depositor, setDepositor] = React.useState();  // 입금주명
    
    const [idCheck, setIdCheck] = React.useState(false); // 아이디 중복확인
    const [bizNoCheck, setBizNoCheck] = React.useState(false); // 사업자등록번호 중복 확인
    const [addrCheck, setAddrCheck] = React.useState(false);
    
    const [emailCheck, setEmailCheck] = React.useState(false);  // 이메일 중복 확인
    const [password, setPassword] = React.useState();  // 비밀번호 
    const [password2, setPassword2] = React.useState(); // 비밀번호 재입력
    const [passwordCheck, setPasswordCheck] = React.useState(false);  // 비밀번호 조건확인
    const [bizImg, setBizImg] = React.useState();
    const [shopImg, setShopImg] = React.useState();

    const [deps_target, setDeps_target] = React.useState(); // 타겟 저장
    const [deps_1, setDeps_1] = React.useState(); // 받아온 1차 주소 데이터 저장
    const [deps_2, setDeps_2] = React.useState(); // 받아온 2차 주소 데이터 저장
    const [deps_3, setDeps_3] = React.useState(); // 받아온 3차 주소 데이터 저장
    const [cortarNo, setCortarNo] = React.useState(""); // 하위 행정구역 코드 저장
    const [deps_stack, setDeps_stack] = React.useState();  // 주소 1차
    const [deps_stack2, setDeps_stack2] = React.useState();  // 주소 2차
    const [select, setSelect] = React.useState(1);  // 1차 주소지 선택
    const [select2, setSelect2] = React.useState(1);  // 2차 주소지 선택
    const [dongStack, setdongStack] = React.useState([]);  // 3차 주소지 저장

    const [totalStack, setTotalStack] = React.useState();  // 배송지 추가하기 버튼 클릭 시 저장되는 곳


    // React.useEffect(()=>{
    //     const secureKey = uuid();
    //     // console.log(secureKey);
    // },[]);

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
                                "code": element.cortar_no,
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
    const [regexPWCheck, setRegexPWCheck] = React.useState(false);
    const [regexIDCheck, setRegexIDCheck] = React.useState(false);
    const regexPW = /(?=.*[a-zA-Z])(?=.*[0-9]).{7,15}$/;
    const regexID = /[a-z0-9].{7,15}$/;

    React.useEffect(() => {
        // console.log("정규식 테스트 : " + regex.test(password));
        setRegexPWCheck(regexPW.test(password));
        if (password === undefined || password === "") {
            setPasswordCheck(false);
        }
        else if(!regexPWCheck){
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

    const CheckId = async () => {

        setRegexIDCheck(regexID.test(id));

        console.log()

        if(id === "" || id === undefined){
            return alert("아이디를 적어해주세요");
        }
        else if(!regexIDCheck){
           return alert('아이디는 영문 + 숫자 조합으로 작성해 주세요');
        }
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
        if(email === "" || email === undefined){
            return alert("이메일을 적어주세요");
        }
        else if(email2 === "" || email2 === undefined){
            return alert("이메일을 확인해주세요");
        }
        // else if(){

        // }
    
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
                setEmail3(email)
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

    const _pickImage = async (division) => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            if(division === "biz"){
                return setBizImg(result);
            }
            else{
                return setShopImg(result);
            }
        }
        else {
            return alert("취소 되었습니다.");
        }
    };
    React.useEffect( async () => {
        // console.log(address);
        try{
            const result = await axios({
                method: 'get',
                url: `https://dapi.kakao.com//v2/local/search/address.json?query=${address}`,
                headers: { 'Authorization': 'KakaoAK ' + config.REST_API_KEY }
            })
                .then((response)=>{
                    setAddrLat(JSON.stringify(response.data.documents[0].x));
                    setAddrLng(JSON.stringify(response.data.documents[0].y));
                })
                .catch((err)=>{
                    // console.log(err);
                });
        }catch(err){
            return console.log(err);
        }
        
    },[address]);
    
    
    let smallData = [];
    let totalDong = [];
    let data = [];

    React.useEffect(() => {

    }, [color]);
    const submitSignUp = async () => {
        // const secureKey = uuid(); // 시크릿키 발급
        
        let mobile = mobile1 + "-" + mobile2 + "-" + mobile3;
        let mail = email + "@" + email2
        let tel = tel1 + "-" + tel2 + "-" + tel3

        const fb = new FormData();
    //     fb.append('file', {
    //         name: bizImg.uri.substr(bizImg.uri.lastIndexOf('/') + 1),
    //         type: bizImg.type,
    //         uri: bizImg.uri
    //     });
    //    fb.append('file', {
    //         name: shopImg.uri.substr(shopImg.uri.lastIndexOf('/') + 1),
    //         type: shopImg.type,
    //         uri: shopImg.uri
    //     });

        fb.append('dealerName', dealerName);  // 상호명
        fb.append('chName', chName); // 대표자 명
        fb.append('id', id);
        fb.append('pwd', password);
        fb.append('mobile', mobile);
        fb.append('email', mail);
        fb.append('tel', tel);
        fb.append('bizNo', bizNo);
        fb.append('fax',fax);
        fb.append('dealerEtc1',dealerEtc1); //  통신판매번호
        fb.append('post',post);  // 우편번호
        fb.append('addr',address);
        fb.append('addrDetail',address2);
        fb.append('addrLat',addrLat); // 위도
        fb.append('addrLng',addrLng); // 경도
        fb.append('dealerEtc2',dealerEtc2); // 전문분야
        fb.append('bank',bank);
        fb.append('account',account);
        fb.append('depositor',depositor); //예금주
        fb.append('recMember',recMember); //유치가맹점
        fb.append('raddr',JSON.stringify(totalStack)); // 배송지 배열 통째로
        fb.append('dealerEtc5',dealerEtc5); // 판매자 매장 설명
        fb.append('channel',channel); // 가입경로
        
        try{
            const response = await axios({
                url:'http://localhost:5000/sun/sun/testsignup', //테스트용 
                // url:'http://183.111.166.172:8080/sun/sun/testsignup',
                method:'post',
                data:fb
            })
            return alert('가입신청이 완료 되었습니다.\n본사 승인시 이용이 가능합니다.')
            // console.log('완료');
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
                            <Text onPress={() => CheckId()} style={{ textAlign: 'center', justifyContent: 'center', color: 'white' }}>중복확인</Text>
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
                            fontSize={11}
                            placeholder="4~15자 영문과 숫자(또는 영문 숫자 특수문자) 조합"
                            placeholderTextColor="red"
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
                            fontSize={11}
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
                            onChangeText={setDealerName}
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
                            onChangeText={setChName}
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
                            maxLength={3}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            type={Number}
                            onChangeText={setMobile1}
                        />
                        <TextInput style={{ flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            maxLength={4}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            onChangeText={setMobile2}
                        />
                        <TextInput style={{ flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            maxLength={4}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            onChangeText={setMobile3}
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
                            maxLength={3}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            onChangeText={setTel1}
                        />
                        <TextInput style={{ flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            maxLength={4}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            onChangeText={setTel2}
                        />
                        <TextInput style={{ flex: 1, height: '60%', alignSelf: 'center', marginHorizontal: 5, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            maxLength={4}
                            returnKeyType='done'
                            keyboardType='number-pad'
                            onChangeText={setTel3}
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
                            keyboardType='number-pad'
                            returnKeyType='done'
                            onChangeText={setFax}
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
                                        // console.log(index);
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
                            onChangeText = {setBizNo}
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
                        <Pressable onPress={() => _pickImage("biz")} style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                        >
                            <Text>{bizImg === undefined ? "" : bizImg.uri}</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={{ width: '100%', height: D_Height * 0.1, borderWidth: 1, borderColor: 'rgb(209,209,211)' }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 12 }}>판매자 매장홍보 사진</Text>
                        </View>
                        <Pressable onPress={() => _pickImage("shop")} style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                        >
                            <Text>{shopImg === undefined ? "" : shopImg.uri}</Text>
                        </Pressable>
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
                            onChangeText={setDealerEtc5}
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
                            onChangeText={setDealerEtc1}
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
                            onChangeText={setRecMember}
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
                            <SafeAreaView/>
                            <Pressable onPress={()=>setIsModal(false)} style={{justifyContent:'center', paddingVertical:10, backgroundColor:'orange', borderRadius:10}}><Text style={{alignSelf:'center', color:'white', fontSize:18}}>닫기</Text></Pressable>
                            <Postcode
                                style={{ flex: 3, paddingTop: Constants.statusBarHeight }}
                                jsOptions={{ animation: true }}
                                onSelected={data => {
                                    // console.log(data);
                                    setPost(data.zonecode);
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
                                // console.log(selectedItem3)
                                setChannel(selectedItem3);
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
                                setDealerEtc2(selectedItem3)
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
                                    // console.log("asdfasdfasdf : " + data);
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
                                    }} style={{ borderWidth: 1, width: D_Width * 0.28, height: D_Height * 0.03, justifyContent: 'center', flexDirection:'row' }} key={index}>
                                        <Text style={{ alignSelf: 'center'}}>{dong.name}</Text>
                                    {
                                        dongStack===undefined ? null : dongStack.find(element=>element.name===dong.name) === undefined ? null : 
                                        // <View style={{ width:'10%', paddingLeft:'50%'}}>
                                            <LocalSvg asset={Arrow} width={10} height={10} fill={"#000000"} style={{backgroundColor:'red'}} />
                                        // </View>
                                    }
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
                                    let deleteTotal = [];
                                    deleteTotal = deleteTotal.concat(totalStack);
                                    deleteTotal.splice(index, 1);
                                    setTotalStack(deleteTotal);
                                }} style={{ fontSize: 22, lineHeight:21 }}> x{"\n"}</Text>
                            </View>
                            <Text>{total.dong.map((dong, index) => 
                            <View key={index} style={{ flexDirection:'row'}}>
                            <Text key={index}>{dong.name}</Text>
                            <Text 
                            onPress={()=>{
                                alert('준비중');
                                let deleteDong = [];
                                let test = [];
                                test = test.concat(totalStack);
                                
                                deleteDong = totalStack.find(element=>element.sigun===total.sigun);
                                deleteDong.dong.splice(index, 1);
                                
                                console.log(deleteDong);
                            }}
                            style={{ lineHeight:14}}
                            >x{"  "}</Text>
                            </View>
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
                        setBank(selectedItem3);
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
                            onChangeText={setAccount}
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: D_Height * 0.1 }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                        <TextInput style={{ flex: 3, height: '60%', alignSelf: 'center', paddingHorizontal: 10, borderColor: 'rgb(209,209,211)' }}
                            borderWidth={1}
                            placeholder="예금주를 입력해주세요"
                            onChangeText={setDepositor}
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