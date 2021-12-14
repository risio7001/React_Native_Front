import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import { TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import { Division } from '../data/CSData';
import Drop from '../img/dropDownBox.svg';

const Product_More_CS_Modify = ({ navigation }) => {

    const [division, setDivision] = React.useState();

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
                        placeholder={"테스트"}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderColor: 'grey', borderTopWidth:1, borderColor:'grey' }}>
                <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', flexDirection: 'column', justifyContent: 'center', paddingVertical: 15, paddingLeft: 10 }}>
                    <Text style={{ fontSize: 15, alignSelf: 'flex-start' }}>분류</Text>
                </View>
                <View style={{ flex: 2, paddingVertical: 15, paddingHorizontal: 10, backgroundColor: 'white' }}>
                <SelectDropdown
                    data={Division}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem3)
                        setDivision(selectedItem);
                    }}
                    renderDropdownIcon={()=>{
                        return <>
                            <View style={{ backgroundColor:'grey', paddingVertical:'2%', paddingHorizontal:'2%'}}>
                                <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                            </View>
                        </>
                    }}
                    buttonStyle={{width:'100%', backgroundColor:'white', height:40, borderColor:'grey', borderWidth:1}}
                    buttonTextStyle={{ fontSize: 14,textAlign:'left', fontWeight:'bold', color:'grey'}}
                    defaultButtonText="분류선택"
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
                        placeholder={"테스트"}
                    />
                </View>
            </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10, marginVertical: 10 }}>
            <Pressable onPress={() => {
                alert('문의 완료되었습니다.');
                navigation.goBack();
            }} style={{ width: '48%', borderRadius: 5, backgroundColor: 'green' }}>
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