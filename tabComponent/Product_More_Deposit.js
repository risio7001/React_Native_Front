import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import NumberFormat from 'react-number-format';
import SelectDropdown from 'react-native-select-dropdown';
import { accountData } from '../data/accountData';
import Drop from '../img/dropDownBox.svg';
// import { TextInput } from 'react-native';

const Product_More_Deposit = ({ navigation }) => {

    const [selectAccount, setSelectAccount] = React.useState();
    const [accountName, setAccountName] = React.useState("플로드");
    const [fee, setFee] = React.useState(0);

    return <>
        <ScrollView>
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>마이페이지</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: 'rgb(237,118,47)', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginVertical: 10, marginHorizontal: 10, width: D_Height * 0.05, height: D_Height * 0.05, backgroundColor: 'white', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>

                    </View>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>반갑습니다 000 님 </Text>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                    <Text onPress={()=>{
                        alert('로그아웃되었습니다.')
                        navigation.navigate('login')}} style={{ borderWidth: 1, alignSelf: 'center', marginHorizontal: 5, paddingVertical: 3, borderColor: 'white', color: 'white' }}>로그아웃</Text>
                    <Text onPress={()=>navigation.navigate('member')} style={{ borderWidth: 1, alignSelf: 'center', marginHorizontal: 5, paddingVertical: 3, borderColor: 'white', color: 'white' }}>회원정보수정</Text>
                </View>

            </View>
            <View style={{ marginHorizontal: 10, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <Text style={styles.font}>충전금 잔액 :</Text>
                    {/* <Text style={styles.font}>121,840원</Text> */}
                    <NumberFormat
                        value={121840}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'원'}
                        renderText={formattedValue => <Text style={styles.font}>{formattedValue}</Text>} />
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <Text style={styles.font}>충전금을 선택해 주세요</Text>
                </View>
                <View style={{ marginVertical: 5, paddingHorizontal: D_Height * 0.05, borderBottomWidth:1, bordercolor:'grey' }}>
                    <View style={styles.select_box}>
                        <NumberFormat
                            value={10000}
                            suffix={'원'}
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={formattedValue => <Text style={styles.fee_font}>{formattedValue}</Text>}
                        />
                        <Text onPress={()=>setFee(fee + 10000)} style={styles.select_fee_box}>선택</Text>
                        {/* fee === 10000 ? styles.select_fee_box_check : styles.select_fee_box */}
                    </View>
                    <View style={styles.select_box}>
                        <NumberFormat
                            value={50000}
                            suffix={'원'}
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={formattedValue => <Text style={styles.fee_font}>{formattedValue}</Text>}
                        />
                        <Text onPress={()=>setFee(fee + 50000)} style={styles.select_fee_box}>선택</Text>
                    </View>
                    <View style={styles.select_box}>
                        <NumberFormat
                            value={100000}
                            suffix={'원'}
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={formattedValue => <Text style={styles.fee_font}>{formattedValue}</Text>}
                        />
                        <Text onPress={()=>setFee(fee + 100000)} style={styles.select_fee_box}>선택</Text>
                    </View>
                    <View style={styles.select_box}>
                        <NumberFormat
                            value={1000000}
                            suffix={'원'}
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={formattedValue => <Text style={styles.fee_font}>{formattedValue}</Text>}
                        />
                        <Text onPress={()=>setFee(fee + 1000000)} style={styles.select_fee_box}>선택</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: D_Height * 0.05 }}>
                    <Text style={{ paddingVertical: 10, fontSize: 20, color: 'grey' }}>충전금액 합계 : </Text>
                    <NumberFormat
                        value={fee}
                        suffix={'원'}
                        displayType={'text'}
                        thousandSeparator={true}
                        renderText={formattedValue => <Text style={{ paddingVertical: 10, fontSize: 20, color: 'grey' }}>{formattedValue}</Text>}
                    />
                </View>
                <Text onPress={()=>setFee(0)} style={{ fontSize: 18, backgroundColor: 'grey', color: 'white', alignSelf: 'center', paddingHorizontal: 50, paddingVertical: 5, fontWeight: 'bold' }}>초기화</Text>

                <View>
                    <Text style={{ paddingVertical: 10, fontSize: 16, fontWeight: 'bold' }}>입금계좌</Text>
                    <SelectDropdown
                        data={accountData}
                        onSelect={(selectedItem, index) => {
                            setSelectAccount(selectedItem);
                        }}
                        renderDropdownIcon={()=>{
                            return <>
                                <View style={{ backgroundColor:'grey', paddingVertical:'2%', paddingHorizontal:'2%'}}>
                                    <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                                </View>
                            </>
                        }}
                        dropdownIconPosition={"right"}
                        buttonStyle={{ width: '100%', backgroundColor: 'white', borderWidth: 1, borderColor: 'grey' }}
                        buttonTextStyle={{ fontSize: 12, color: 'grey', textAlign: 'left' }}
                        // defaultValueByIndex={accountData[0]}
                        defaultValue={accountData[0]}
                    />
                    {/* <Text style={{width:'100%', backgroundColor:'white', borderWidth:1, bordercolor:'grey'}}>플로드</Text> */}
                    <View style={{ paddingVertical: D_Height * 0.02, backgroundColor: 'white', marginVertical: 10, borderWidth: 1, borderColor: 'grey' }}>
                        <TextInput style={{ fontSize: 14, color: 'grey', paddingHorizontal: 20 }}
                            onChangeText={setAccountName}
                            placeholder={accountName}
                        />
                    </View>
                </View>
                <Text style={{ fontSize: 20, color: 'white', flex: 1, backgroundColor: 'rgb(237,118,47)', textAlign: 'center', paddingVertical: 10 }}>
                    충전하기
                </Text>
            </View>
        </ScrollView>
    </>

}

export default Product_More_Deposit;

const styles = StyleSheet.create({
    font:{
        fontSize:16,
        color:'grey'
    },
    fee_font:{
        fontSize:16,
        fontWeight:'bold',
        paddingVertical:10,
        paddingHorizontal:25
    },
    select_fee_box:{
        alignSelf:'center',
        paddingVertical:10,
        paddingHorizontal:25,
        color:'white',
        backgroundColor:'grey',
        fontWeight:'bold'
    },
    select_fee_box_check:{
        alignSelf:'center',
        paddingVertical:10,
        paddingHorizontal:25,
        color:'white',
        backgroundColor:'green',
        fontWeight:'bold'
    },
    select_box:{
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        paddingVertical:5
    }
})