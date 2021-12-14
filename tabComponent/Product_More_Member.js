import * as React from 'react';
import { Pressable, ScrollView, Text, TextInput, View, StyleSheet, Image, Modal } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SelectDropdown from 'react-native-select-dropdown';
import Drop from '../img/dropDownBox.svg';
import { addr, bankList, specialty } from '../data/emailAddr';
import Postcode from '@actbase/react-daum-postcode';
import { SafeAreaView } from 'react-native';
import Arrow2 from '../img/arrow2.svg';
import * as ImagePicker from 'expo-image-picker';
import TabViewComponent from 'react-native-elements/dist/tab/TabView';

// console.log(dongAll);
let ddd = [];

const Product_More_Member = ({ navigation }) => {
    const [color, setColor] = React.useState(false);
    const [isModal, setIsModal] = React.useState(false);
    const [file, setFile] = React.useState();
    const [check, setCheck] = React.useState(false);
    const [self, setSelf] = React.useState(0);
    const [address, setAddress] = React.useState();
    const [email, setEmail] = React.useState();

    const [bizImg, setBizImg] = React.useState();
    const [shopImg, setShopImg] = React.useState();

    const [account, setAccount] = React.useState();
    const [depositor, setDepositor] = React.useState();

    const [deps_target, setDeps_target] = React.useState(); // 타겟 저장
    const [deps_1, setDeps_1] = React.useState(); // 받아온 1차 주소 데이터 
    const [deps_2, setDeps_2] = React.useState(); // 받아온 2차 주소 데이터 저장
    const [deps_3, setDeps_3] = React.useState(); // 받아온 3차 주소 데이터 저장
    const [cortarNo, setCortarNo] = React.useState(""); // 하위 행정구역 코드 저장
    const [deps_stack, setDeps_stack] = React.useState();  // 주소 1차
    const [deps_stack2, setDeps_stack2] = React.useState();  // 주소 2차
    const [select, setSelect] = React.useState(1);  // 1차 주소지 선택
    const [select2, setSelect2] = React.useState(1);  // 2차 주소지 선택
    const [dongStack, setdongStack] = React.useState(null);  // 3차 주소지 저장
    const [dongAll, setDongAll] = React.useState();
    const [chDong, setChDong] = React.useState();

    const [totalStack, setTotalStack] = React.useState();  // 배송지 추가하기 버튼 클릭 시 저장되는 곳
    

    const [selectAll, setSelectAll] = React.useState(false);

    React.useEffect(() => {
        getMap();
    }, [cortarNo]);

    // data 임시저장
    let minData = [];
    let smallData = [];
    let totalDong = [];
    let data = [];
    // data 임시저장

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

    React.useEffect(()=>{
        // console.log(ddd);
    },[color]);

    React.useEffect(()=>{
        // console.log('변경점');
    },[totalStack]);

    return <>
        <ScrollView>
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>계정설정</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>

            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 10 }}>계정정보</Text>

                <View style={{ borderWidth: 1, borderColor: 'grey', backgroundColor: 'white' }}>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>아이디</Text><Text style={{ color: 'red' }}>*</Text></View>
                        <Text style={{ flex: 3, paddingHorizontal: 5 }}>flroad</Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={{ flex: 1, alignSelf: 'center' }}>비밀번호</Text>
                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.box_name}
                            />
                            <BouncyCheckbox
                                size={20}
                                text="비밀번호변경"
                                textStyle={{ color: 'black', textDecorationLine: 'none', fontSize: 12, fontWeight: 'bold', marginVertical: 10 }}
                                iconStyle={{ backgroundColor: check ? 'rgb(144,176,89)' : 'white' }}
                                disableBuiltInState
                                isChecked={check}
                                onPress={() => {
                                    setCheck(!check);
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>업체명</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.box_name}
                                placeholder={'플로드'}
                            />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>대표자명</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.box_name}
                                placeholder={'문창주'}
                            />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>휴대전화</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                style={styles.box_call}
                                placeholder={'010'}
                            />
                            <TextInput
                                style={styles.box_call}
                                placeholder={'8778'}
                            />
                            <TextInput
                                style={styles.box_call}
                                placeholder={'5582'}
                            />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}><Text>일반전화</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                style={styles.box_call}
                            />
                            <TextInput
                                style={styles.box_call}
                            />
                            <TextInput
                                style={styles.box_call}
                            />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>팩스</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.box_name}
                                placeholder={'2148853161'}
                            />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}>
                            <Text>이메일</Text>
                            <Text style={{ color: 'red' }}>*</Text>
                        </View>

                        <View style={{ flex: 3 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    style={styles.box_mail}
                                    placeholder={'flower'}
                                />
                                <Text
                                    style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                                >@</Text>
                                {self === 0 ?
                                    <TextInput
                                        style={styles.box_mail}
                                        placeholder={'직접입력'}
                                    />
                                    :
                                    <Text style={styles.box_mail}>{email}</Text>
                                }
                            </View>
                            <Text />
                            <SelectDropdown
                                data={addr}
                                onSelect={(selectedItem, index) => {
                                    // console.log(selectedItem3)
                                    setSelf(index);
                                    setEmail(selectedItem);
                                }}
                                renderDropdownIcon={() => {
                                    return <>
                                        <View style={{ backgroundColor: 'grey', paddingVertical: '2%', paddingHorizontal: '2%' }}>
                                            <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                                        </View>
                                    </>
                                }}
                                buttonStyle={{ width: '100%', backgroundColor: 'white', height: 40, borderColor: 'grey', borderWidth: 1, borderRadius: 5 }}
                                buttonTextStyle={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', color: 'grey' }}
                                defaultButtonText="선택하세요"
                            />

                        </View>

                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>사업자등록번호</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.box_name}
                                placeholder={'2148853161'}
                            />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>사업자등록증</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3 }}>
                            <Pressable
                                onPress={() => _pickImage('biz')}
                                style={[{ flexDirection: "row" }, styles.textInput]}>
                                <Text style={{ borderWidth: 1, backgroundColor: 'rgb(239,239,239)', paddingVertical: 3, paddingHorizontal: 3 }}>파일선택</Text>
                                <Text style={{ color: 'grey', alignSelf: 'center', paddingHorizontal: 5 }}>{file === undefined ? '선택된 파일 없음' : file}</Text>
                            </Pressable>
                            <Image source={{ uri: 'https://source.unsplash.com/random' }} style={{ alignSelf: 'center', width: 250, height: 250 }}></Image>

                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>판매자 매장홍보 사진</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3 }}>
                            <Pressable
                                onPress={() => _pickImage('shop')}
                                style={[{ flexDirection: "row" }, styles.textInput]}>
                                <Text style={{ borderWidth: 1, backgroundColor: 'rgb(239,239,239)', paddingVertical: 3, paddingHorizontal: 3 }}>파일선택</Text>
                                <Text style={{ color: 'grey', alignSelf: 'center', paddingHorizontal: 5 }}>{file === undefined ? '선택된 파일 없음' : file}</Text>
                            </Pressable>
                            <Image source={{ uri: 'https://source.unsplash.com/random' }} style={{ alignSelf: 'center', width: 250, height: 250 }}></Image>

                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>판매자 매장 설명</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.box_name}
                                placeholder={'판매자 매장 설명'}
                            />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>통신판매번호{'\n'}</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.box_name}
                                placeholder={'통신판매번호'}
                            />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>사업장 주소</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ borderWidth: 1, borderColor: 'grey', paddingVertical: 10, paddingHorizontal: 5, width: '60%', fontSize: 12 }}>서울 서초구 강남대로 305</Text>
                            <Text onPress={() => setIsModal(true)} style={{ width: '35%', paddingVertical: 10, color: 'white', backgroundColor: 'grey', textAlign: 'center' }}>우편번호</Text>
                            <Modal visible={isModal}>
                                <SafeAreaView />
                                <Pressable onPress={() => setIsModal(false)} style={{ justifyContent: 'center', paddingVertical: 10, backgroundColor: 'orange', borderRadius: 10 }}><Text style={{ alignSelf: 'center', color: 'white', fontSize: 18 }}>닫기</Text></Pressable>
                                <Postcode
                                    style={{ flex: 3 }}
                                    jsOptions={{ animation: true }}
                                    onSelected={data => {
                                        setAddress(data.address)
                                        setIsModal(false);
                                    }}
                                />
                            </Modal>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.l_box_name}><Text>상세주소</Text><Text style={{ color: 'red' }}>*</Text></View>

                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.box_name}
                                placeholder={'1126호'}
                            />
                        </View>
                    </View>

                </View>

                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 10 }}>업체특징</Text>

                <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>

                    <View style={{ flex: 1, paddingVertical: 10, justifyContent: 'center' }}>
                        <Text>전문분야선택</Text>
                    </View>
                    <View style={{ flex: 3, paddingVertical: 10 }}>
                        <SelectDropdown
                            data={specialty}
                            onSelect={(selectedItem, index) => {
                                // console.log(selectedItem3)
                                setSelf(index);
                                setEmail(selectedItem);
                            }}
                            renderDropdownIcon={() => {
                                return <>
                                    <View style={{ backgroundColor: 'grey', paddingVertical: '2%', paddingHorizontal: '2%' }}>
                                        <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                                    </View>
                                </>
                            }}
                            buttonStyle={{ width: '100%', backgroundColor: 'white', height: 40, borderColor: 'grey', borderWidth: 1, borderRadius: 5 }}
                            buttonTextStyle={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', color: 'grey' }}
                            defaultButtonText="선택하세요"
                        /></View>
                </View>

                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 10 }}>배송지선택</Text>
                <View style={{ width: '100%', height: D_Height * 0.05, borderWidth: 1, borderColor: 'rgb(150,150,150)', marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
                    <Text style={{ alignSelf: 'center' }}>시/도</Text>
                    <LocalSvg asset={Arrow2} width={20} height={20} fill={"#969696"} transform={[{ rotate: '90deg' }]} alignSelf={'center'} />
                    
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
                        <View style={{ width: '100%', height: D_Height * 0.05, borderWidth: 1, borderColor: 'rgb(150,150,150)', marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
                            <Text style={{ alignSelf: 'center' }}>시/군/구</Text>
                            <LocalSvg asset={Arrow2} width={20} height={20} fill={"#969696"} transform={[{ rotate: '90deg' }]} alignSelf={'center'} />
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
                        <View style={{ width: '100%', height: D_Height * 0.05, borderWidth: 1, borderColor: 'rgb(150,150,150)', marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
                            <Text style={{ alignSelf: 'center' }}>읍/면/동</Text>
                            <Pressable onPress={() => {
                                setSelectAll(!selectAll);
                                // ddd.

                                if (dongStack === undefined || dongStack.length < 1) {
                                    deps_3.forEach((element) => {
                                        data.push(element);
                                        
                                    })
                                    setdongStack(data);
                                }
                                else {
                                    setdongStack();
                                }
                            }} style={{ justifyContent: 'center' }}>
                                {selectAll? <Text style={{ alignSelf: 'center' }}>전체해제</Text> :<Text style={{ alignSelf: 'center' }}>전체선택</Text>}
                            </Pressable>
                        </View>
                        <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text>
                                {deps_3 === undefined ? "" : deps_3.map((dong, index) => (
                                    <Pressable onPress={() => {
                                        setColor(!color);
                                        if(ddd.find((element)=>element.code === dong.code)){
                                            ddd.splice(ddd.findIndex((element)=>element.code === dong.code),1);   // 삭제
                                            // console.log(ddd.indexOf(dong.code))
                                            // ddd.forEach((element)=> element.splice(ddd.indexOf(dong.code), 1)) ;  
                                        }else{
                                            ddd.push(dong);        // 추가
                                        }
                                        if (dongStack === undefined) {

                                            if(data.find((element)=>element.name === dong.name)){
                                                data.splice(data.indexOf(dong),1);  //삭제
                                            }else{
                                                data.push(dong);    //추가
                                            }
                                            setdongStack(data);
                                        }
                                        else {
                                            data = dongStack;
                                            if(data.find((element)=>element.name === dong.name)){
                                                data.splice(data.indexOf(dong),1);
                                            }else{
                                                data.push(dong);
                                            }
                                            setdongStack(data);
                                        }
                                        // setDongAll(data.concat(dongAll));
                                    }} style={{ borderWidth: 1, width: D_Width * 0.28, height: D_Height * 0.03, justifyContent: 'center', flexDirection: 'row' }} key={index}>
                                        <Text style={{ alignSelf: 'center' }}>{dong.name}</Text>
                                        {
                                            // totalStack === undefined ? 
                                            //          : totalStack.forEach(element=>{ if(element.sigun === deps_stack2 ){return true;}})?
                                            // <LocalSvg asset={Arrow} width={10} height={10} fill={"#000000"} style={{ backgroundColor: 'red' }} /> :null
                                            ddd.find(element=>element.code===dong.code) === undefined ? null :
                                            <LocalSvg asset={Arrow} width={10} height={10} fill={"#000000"} style={{ backgroundColor: 'red' }} />


                                            // dongStack === undefined ? null : dongStack.find(element => element.name === dong.name) === undefined ? null :
                                            //     // <View style={{ width: '10%', paddingLeft: '50%' }}>
                                            //         <LocalSvg asset={Arrow} width={10} height={10} fill={"#000000"} style={{ backgroundColor: 'red' }} />
                                            //     // </View>
                                        }
                                    </Pressable>
                                ))}
                            </Text>
                        </View>
                    </View>
                }
                <Pressable onPress={() => {
                    // let dddd = [];
                    // dddd = dddd.concat(totalStack);
                    if (deps_stack === undefined) {
                        return alert("시/도 를 선택해주세요");
                    }
                    else if (deps_stack2 === undefined) {
                        return alert("시/군/구 를 선택해주세요");
                    }
                    else if (dongStack === undefined || dongStack < 1) {
                        return alert("읍/면/동 을 선택해주세요");
                    }

                    let data_all = [];
                    let data_temp = [];
                    let data = [];
                    


                    if(totalStack === undefined){ // 처음 저장 시
                        data.push({
                            "sigun": deps_stack + " " + deps_stack2,
                            "dong": dongStack
                        });
                        
                        setTotalStack(data);
                        // console.log("첫 저장 : " + JSON.stringify(data));
                    }else{ // +2
                        // let data123 = [];
                        // console.log("test111111111111111");
                        // data123 = data.concat(totalStack);
                        // console.log(data123.dong);
                        data=totalStack;
                        console.log("test22222222");
                        console.log(data.dong);
                        // console.log("" + data.find((element)=>element.sigun === deps_stack + " " + deps_stack2));
                        if(data.find((element)=>element.sigun === deps_stack + " " + deps_stack2)){ // 같은 이름의 sigun이 있는지 검증
                            // console.log('test3333333333');
                            // console.log(data.dong);
                            data[0].dong.splice(0);
                            ddd.forEach((element)=>data[0].dong.push(element));
                            // data[0].dong.push(ddd[0]);
                            // console.log(data);
                            // 있다면 splice로 바꾸기
                            // console.log(" 중복된 sigun " + JSON.stringify(data));
                            // data[0].dong.splice(0);
                            // data[0].dong
                            // console.log(data[0].dong);
                            // console.log(data.dong);

                            // data[0].dong.
                            // console.log(data[0].dong.name = 'xptmxm');
                            // data.dong.splice(data.indexOf(deps_stack + " " + deps_stack2), 1, )
                            // console.log("추가 : " + data);
                        }
                        else {
                            // 없다면 새롭게 push
                            data.push({
                                "sigun": deps_stack + " " + deps_stack2,
                                "dong": dongStack
                            });
                            // console.log("없어서 저장 : " + JSON.stringify(data));
                        }
                        // console.log(data);
                        setTotalStack(data);
                    }
                    // console.log(data);
                    // setDeps_2();
                    // setDeps_3();
                    // setDeps_target();
                    // setdongStack();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // console.log(dddd);
                    // console.log("check : " + smallData.find((element)=>element.sigun === deps_stack + ' ' + deps_stack2));
                    // if (totalStack === undefined) {
                    //     smallData.push({
                    //         "sigun": deps_stack + " " + deps_stack2,
                    //         "dong": dongStack
                    //     });
                    //     setTotalStack(smallData);
                    // }
                    // else {
                    //     // console.log('check : ' + );
                    //     let temp = [];
                    //     temp = dddd.find((element)=>element.sigun === deps_stack + ' ' + deps_stack2);
                    //     // console.log(temp);
                        
                    //     // console.log(dddd.find((element)=>element.sigun === deps_stack + ' ' + deps_stack2));
                    //     if(temp){ // 같은 항목이 존재할 경우
                    //         // temp.dong.forEach(element=>console.log(element.code));
                    //         // temp.dong.forEach(element=>element.code === dongStack.code);
                    //         // setdongStack(ddd)
                    //         dddd.slice(dddd.indexOf(deps_stack + ' ' + deps_stack2), 1, {
                    //             "sigun": deps_stack + " " + deps_stack2,
                    //             "dong": ddd
                    //         })
                    //         console.log(dddd);


                    //         // let temp2 = [];

                    //         // dongStack.forEach((element)=>temp.dong.push(element));
                    //         // console.log(temp.dong.length);
                    //         // for(const i in temp.dong){
                                
                    //         // }
                    //         // console.log(ddd);
                    //         // temp.dong
                    //         // temp.dong.forEach((element)=>console.log(element.code === ddd));
                    //         // temp.dong.find((element)=>console.log(element.code === ddd));
                    //         // for(var i=0; i<= temp.dong.length; i++){
                    //         //     if(temp.dong[i].code === dongStack.forEach((element)=>element.code)){
                    //         //         temp.dong.splice(i, 1);
                    //         //         console.log(temp);
                    //         //     }
                    //         //     else{

                    //         //     }
                    //         // }

                    //         // 중복제거 작업 필요



                    //         // temp.dong.forEach((element)=>element.name === dongStack)
                    //         // temp.dong.forEach((element)=>{
                    //         //     if(!temp)
                    //         // })
                    //         // temp.dong.push(dongStack);

                    //         // console.log(temp);

                    //         // console.log(temp);
                    //         // dongStack.forEach(element=>{element.code === temp.dong.forEach});
                            
                    //         // console.log(dddd.length);
                    //     }else{
                    //         console.log("fail : ");
                    //         smallData.push({
                    //             "sigun": deps_stack + " " + deps_stack2,
                    //             "dong": dongStack
                    //         });
                    //     }
                    //     totalDong = smallData.concat(totalStack);
                    //     setTotalStack(totalDong);
                        
                    // }
                    // setDeps_2();
                    // setDeps_3();
                    // setDeps_target();
                    // setdongStack();
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
                                <Text onPress={() => {
                                    let deleteTotal = [];
                                    deleteTotal = deleteTotal.concat(totalStack);
                                    deleteTotal.splice(index, 1);
                                    // ddd.splice(ddd.findIndex((element)=>element.))
                                    setTotalStack(deleteTotal);
                                }} style={{ fontSize: 22, lineHeight: 21 }}> x{"\n"}</Text>
                            </View>
                            <Text>{total.dong.map((dong, index) =>
                                <View key={index} style={{ flexDirection: 'row' }}>
                                    <Text key={index}>{dong.name}</Text>
                                    <Text
                                        onPress={() => {
                                            console.log(dong);
                                            console.log(dong.code);
                                            let temp = [];
                                            let temp2 = [];
                                            temp = temp.concat(totalStack); 
                                            console.log(temp);
                                            temp2 = temp.find((element)=>element.sigun === total.sigun).dong;
                                            temp2.splice((temp2.findIndex((element)=>element.code === dong.code)), 1);
                                            ddd.splice((ddd.findIndex((element)=>element.code === dong.code)),1);
                                            setTotalStack(temp);
                                            // alert('준비중');
                                            // let deleteDong = [];
                                            // let temp = [];
                                            // deleteDong = deleteDong.concat(totalStack);
                                            // temp = deleteDong.find(element=>element.sigun === total.sigun).dong;
                                            // ddd.splice(ddd.findIndex(temp.code),1);
                                            // temp.splice(index, 1);
                                            // deleteDong.slice(deleteDong.indexOf(total.sigun), 1, temp);
                                            
                                            // if(temp.length < 1){
                                            //     deleteDong.splice(deleteDong.indexOf(total.sigun), 1);
                                            // }
                                            // setTotalStack(deleteDong);
                                        }}
                                        style={{ lineHeight: 14 }}
                                    >x{"  "}</Text>
                                </View>
                            )}{"\n"}</Text>
                        </View>
                    )}</Text>
                </View>

                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 10 }}>정산계좌</Text>

                <SelectDropdown
                    data={bankList}
                    onSelect={(selectedItem3, index) => {
                        // setBank(selectedItem3);
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

                <View style={{ width: '100%', height: D_Height * 0.1 }}>
                    <Pressable onPress={() => {
                        // submitSignUp()
                        alert('입력값대로 db update 후 이동처리');
                        navigation.goBack();
                    }} style={{ paddingHorizontal: 10, flexDirection: 'row', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'rgb(177,171,156)' }}>
                        <Text style={{ fontSize: 15, color: 'white' }}>
                            완료
                        </Text>
                    </Pressable>
                </View>

            </View>
        </ScrollView>
    </>

}

export default Product_More_Member;

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'grey',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    box_call: {
        width: '31%',
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    box_name: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    box_mail: {
        width: '45%',
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    l_box_name: {
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row'
    },

    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        backgroundColor: 'white',
        fontWeight: 'bold'
    }
    // left_box_text:{
    // },
    // left_box:{
    //     flexDirection:'row',
    //     borderBottomWidth:1,
    //     borderColor:'grey',
    //     paddingVertical: 20,
    //     paddingHorizontal:10
    // },
})