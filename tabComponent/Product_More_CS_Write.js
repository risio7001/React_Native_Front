import * as React from 'react';
import { Pressable, ScrollView, Text, View, ImageBackground, TextInput, StyleSheet } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Notice from '../img/noticeMark.svg';
import SelectDropdown from 'react-native-select-dropdown';
import { Division } from '../data/CSData';
import Drop from '../img/dropDownBox.svg';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';

const Product_More_CS_Write = ({ navigation }) => {

    const [title, setTitle] = React.useState();
    const [division, setDivision] = React.useState();
    const [content, setContent] = React.useState();
    const [email, setEmail] = React.useState();
    const [phone, setPhone] = React.useState();
    const [file, setFile] = React.useState();
    const [check_1, setCheck_1] = React.useState();
    const [check_2, setCheck_2] = React.useState();
    const [consult, setConstult] = React.useState();
    const [consultList, setConsultList] = React.useState();
    const [consultSelect, setConsultSelect] = React.useState();

    React.useEffect(()=>{
        csCode()
    },[]);

    const csCode = () => {
        let url = `http://localhost:5000/sun/sun/consultCode`
        fetch(url)
        .then(res=>res.json())
            .then(res => {
                setConstult(res.data);
                let temp = [];
                res.data.forEach((element) => {
                    temp.push(element.CodeName);
                })
                setConsultList(temp);
                console.log(temp);
            })
            .catch(err => console.log(err))
    }

    const dbConn = async () =>{
        var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;1
        var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        let phoneSort;
        if(title === undefined || title.length < 1){
            return alert("제목을 입력해주세요");
        }
        else if(consultSelect === undefined){
            return alert("분류를 선택해주세요");
        }
        else if(content === undefined || content.length < 1){
            return alert("내용을 입력해주세요");
        }
        else if(email === undefined || content.length < 1 || regEmail.test(email)===false){
            return alert("이메일을 확인해주세요");
        }
        else if(phone === undefined || content.length < 1 || regPhone.test(phone) === false){
            return alert("핸드폰번호를 확인해주세요");
        }
        if(phone.length === 10){
            phoneSort = phone.substring(0,3)+"-"+phone.substring(3,6)+"-"+phone.substring(6,10);
        }
        else if(phone.length === 11){
            phoneSort = phone.substring(0,3)+"-"+phone.substring(3,7)+"-"+phone.substring(7,11);
        }

        const fd = new FormData();
        fd.append("subject", title);
        fd.append("content", content);
        fd.append("email", email);
        fd.append("mobile", phoneSort);
        fd.append("userid", "flroad"); 
        fd.append("consult", consultSelect);
        try{
            const result = await axios({
                url:`http://localhost:5000/sun/sun/csinsert`,
                method:'post',
                data:fd
            })
            if(result.data.result){
                alert("등록되었습니다.");
                navigation.goBack();
            }
        }catch(err){
            console.log(err);
        }
    }

    return <>
        <ScrollView> 
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>1:1문의</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            {/* 디바이스의 width가 작을때 테스트 필요함. */}
            <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingVertical: 10 }}>
                <View style={{ paddingHorizontal: D_Width * 0.02 }}>
                    <LocalSvg asset={Notice} width={25} height={25} fill={'#000000'} />
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 14, marginRight: D_Width * 0.1 }}>
                문의사항에 대한 답변은 고객센터 {'>'} 1:1문의하기, 고객님의 메일을 통해 확인하실 수 있습니다
                </Text>
                {/*  */}
            </View>
            <View style={{marginHorizontal:10, marginVertical:10}}>
                <TextInput
                    style={styles.textInput}
                    placeholder={"제목 입력"}
                    value={title}
                    onChangeText={setTitle}
                />
                <SelectDropdown
                    data={consultList === undefined ? ()=>csCode() : consultList}
                    onSelect={(selectedItem, index) => {
                        let select = consult.find((element)=>element.CodeName === selectedItem).CmCode;
                        setConsultSelect(select);
                    }}
                    renderDropdownIcon={()=>{
                        return <>
                            <View style={{ backgroundColor:'grey', paddingVertical:'2%', paddingHorizontal:'2%'}}>
                                <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                            </View>
                        </>
                    }}
                    buttonStyle={{width:'100%', backgroundColor:'white', height:40, borderColor:'grey', borderWidth:1, borderRadius:5}}
                    buttonTextStyle={{ fontSize: 14,textAlign:'left', fontWeight:'bold', color:'grey'}}
                    defaultButtonText="분류선택"
                /> 
                <TextInput
                    style={styles.textInput}
                    placeholder={"문의 내용 입력"}
                    value={content}
                    onChangeText={setContent}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={"이메일입력"}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={"휴대폰번호 입력 (-빼고 입력해주세요)"}
                    value={phone}
                    onChangeText={setPhone}
                />
                <Pressable
                    onPress={() => alert('이미지선택기')}
                    style={[{ flexDirection: "row" }, styles.textInput]}>
                    <Text style={{ borderWidth: 1, backgroundColor: 'rgb(239,239,239)', paddingVertical: 3, paddingHorizontal: 3 }}>파일선택</Text>
                    <Text style={{ color: 'grey', alignSelf: 'center', paddingHorizontal: 5 }}>{file === undefined ? '선택된 파일 없음' : file}</Text>
                </Pressable>
                <Text/>
                <BouncyCheckbox
                    size={20}
                    text="답변 내용을 이메일로 받아 보시겠습니끼?"
                    textStyle={{ color: 'black', textDecorationLine: 'none', fontSize:12, fontWeight:'bold' }}
                    iconStyle={{ backgroundColor: check_1 ? 'rgb(144,176,89)' : 'white' }}
                    disableBuiltInState
                    isChecked={check_1}
                    onPress={() => {
                        setCheck_1(!check_1);
                    }}
                />
                <Text/>
                <BouncyCheckbox
                    size={20}
                    text="답변 등록 여부를 SMS로 받아보시겠습니끼?"
                    textStyle={{ color: 'black', textDecorationLine: 'none', fontSize:12, fontWeight:'bold' }}
                    iconStyle={{ backgroundColor: check_2 ? 'rgb(144,176,89)' : 'white' }}
                    disableBuiltInState
                    isChecked={check_2}
                    onPress={() => {
                        setCheck_2(!check_2);
                    }}
                />
                <Text />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Pressable onPress={()=>{
                        dbConn();
                        // alert('문의 완료되었습니다.');
                        // navigation.goBack();
                    }} style={{ width:'48%', borderRadius:5, backgroundColor:'orange'}}>
                    <Text style={{ paddingVertical:10, color:'white', textAlign:'center', fontSize:16, fontWeight:'bold'}}>제출하기</Text>
                    </Pressable>
                    <Pressable onPress={()=>{
                        alert('취소되었습니다.');
                        navigation.goBack();
                    }} style={{ width:'48%', borderRadius:5, backgroundColor:'grey'}}>
                    <Text style={{ paddingVertical:10, color:'white', textAlign:'center', fontSize:16, fontWeight:'bold'}}>취소</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    </>

}

export default Product_More_CS_Write;

const styles = StyleSheet.create({
    textInput:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:5,
        borderWidth:1,
        borderColor:'grey',
        marginVertical:5,
        backgroundColor:'white',
        fontWeight:'bold'
    }
})