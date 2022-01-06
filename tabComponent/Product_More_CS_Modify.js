import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import { TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import { Division } from '../data/CSData';
import Drop from '../img/dropDownBox.svg';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const Product_More_CS_Modify = ({ navigation }) => {


    const route = useRoute();
    let items = route.params;
    // console.log(items);

    const [subject, setSubject] = React.useState(items.Subject);
    const [content, setContent] = React.useState(items.Content);
    const [renderConsult, setRenderConsult] = React.useState();
    const [consultList, setConsultList] = React.useState();
    const [consult, setConstult] = React.useState();
    const [consultSelect, setConsultSelect] = React.useState(items.Consult);


    const dbConn = () =>{
        let url = `http://localhost:5000/sun/sun/consultCode`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            setConstult(res.data);
            let temp = [];
            res.data.forEach((element)=>{
                temp.push(element.CodeName);
                if(items.Consult === element.CmCode){
                    setConsultList(element.CodeName);
                }
            })
            setRenderConsult(temp);
        })
        .catch(err=>console.log(err))
    }

    React.useEffect(()=>{
        dbConn();
    },[]);

    const modify = async() =>{
        console.log(items.Uid)
        console.log(content);
        console.log(consultSelect);
        console.log(subject);
        console.log(items);
        // try{
        //     const result = await axios({
        //         method:'post',
        //         url:`http://localhost:5000/sun/sun/csmodify`,
        //         headers:{
        //             'Content-Type':'application/json',
        //             'Accept':'application/json'
        //         },
        //         data:{
        //             "uid":items.Uid,
        //             "content":content,
        //             "consult":consultSelect,
        //             "subject":subject
        //         }
        //     })

        //     let url = `http://localhost:5000/sun/sun/csmodify/${Uid}`;
        //     fetch(url)
        //     .then(res=>res.json())
        //     .then(res=>{

        //         console.log(res.data)

        // // alert('문의 수정되었습니다.');
        // // navigation.goBack();
        //     })
        //     .catch(err=>console.log(err))

        // }catch(err){
        //     console.log(err);
        // }
    }

    const selectHandler = (d) =>{
        setConsultSelect(consult.find((element)=>d===element.CodeName).CmCode);
    }

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>나의질문과답변 수정</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <Text style={{marginHorizontal:10, paddingVertical:30}}>
            나의질문과답변 수정
        </Text>
        <View style={{ marginHorizontal: 10, borderWidth: 1, borderColor: 'grey' }}>

            <View style={{ flexDirection: 'row', borderColor: 'grey' }}>
                <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', flexDirection: 'column', justifyContent: 'center', paddingVertical: 15, paddingLeft: 10 }}>
                    <Text style={{ fontSize: 15, alignSelf: 'flex-start' }}>제목</Text>
                </View>
                <View style={{ flex: 2, paddingVertical: 15, paddingHorizontal: 10, backgroundColor: 'white' }}>
                    <TextInput
                        style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'grey', paddingVertical: 10, paddingHorizontal: 10, fontSize: 15 }}
                        value={subject}
                        onChangeText={setSubject}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderColor: 'grey', borderTopWidth:1, borderColor:'grey' }}>
                <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', flexDirection: 'column', justifyContent: 'center', paddingVertical: 15, paddingLeft: 10 }}>
                    <Text style={{ fontSize: 15, alignSelf: 'flex-start' }}>분류</Text>
                </View>
                <View style={{ flex: 2, paddingVertical: 15, paddingHorizontal: 10, backgroundColor: 'white' }}>
                <SelectDropdown
                    data={renderConsult === undefined ? ()=>dbConn() : renderConsult}
                    onSelect={(selectedItem, index) => selectHandler(selectedItem)}
                    renderDropdownIcon={()=>{
                        return <>
                            <View style={{ backgroundColor:'grey', paddingVertical:'2%', paddingHorizontal:'2%'}}>
                                <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                            </View>
                        </>
                    }}
                    buttonStyle={{width:'100%', backgroundColor:'white', height:40, borderColor:'grey', borderWidth:1}}
                    buttonTextStyle={{ fontSize: 14,textAlign:'left', fontWeight:'bold', color:'grey'}}
                    // defaultInValue={items.Consult}
                    // defaultValueByIndex={consult === undefined ? ()=>dbConn() : consult[0]}
                    defaultButtonText={consultList}
                /> 
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderColor: 'grey', borderTopWidth:1, borderColor:'grey' }}>
                <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', flexDirection: 'column', justifyContent: 'center', paddingVertical: 15, paddingLeft: 10 }}>
                    <Text style={{ fontSize: 15, alignSelf: 'flex-start' }}>문의내용</Text>
                </View>
                <View style={{ flex: 2, paddingVertical: 15, paddingHorizontal: 10, backgroundColor: 'white' }}>
                    <TextInput
                        style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'grey', paddingVertical: 10, paddingHorizontal: 10, fontSize: 15 }}
                        value={content}
                        onChangeText={setContent}
                    />
                </View>
            </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10, marginVertical: 10 }}>
            <Pressable onPress={() => modify()} style={{ width: '48%', borderRadius: 5, backgroundColor: 'green' }}>
                <Text style={{ paddingVertical: 10, color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>확인</Text>
            </Pressable>
            <Pressable onPress={() => {
                alert('취소되었습니다.');
                navigation.goBack();
            }} style={{ width: '48%', borderRadius: 5, backgroundColor: 'grey' }}>
                <Text style={{ paddingVertical: 10, color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>취소</Text>
            </Pressable>
        </View>
    </>

}

export default Product_More_CS_Modify;