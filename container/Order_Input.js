import * as React from 'react';
import { Pressable, ScrollView, View, Text, TextInput, Button, SafeAreaView, Modal } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Drop from '../img/dropDownBox.svg'
import CalendarMark from '../img/calendarMark.svg';
import Time from '../img/timeMark.svg';
import NumberFormat from 'react-number-format';
import Search from '../img/searchMark.svg';
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import Picker from 'react-native-date-picker';
import { orderData_E, orderData_H, orderData_M } from '../data/orderData';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import Postcode from '@actbase/react-daum-postcode';


const Order_Input = ({navigation}) => {
    const [isDate, setIsDate] = React.useState();
    const [dateModal, setDateModal] = React.useState(false);
    const [timeModal, setTimeModal] =  React.useState(false);
    const [time, setTime] = React.useState(new Date());
    const [isTime, setIsTime] = React.useState();
    const [check_1, setCheck_1] = React.useState(true);
    const [check_2, setCheck_2] = React.useState();
    const [wordsModal, setWordsModal] = React.useState(false);
    const [senderModal, setSenderModal] = React.useState(false);
    const [words, setWords] = React.useState();
    const [sender, setSender] = React.useState();
    const [deliveryTime1, setDeliveryTime1] = React.useState();
    const [deliveryTime2, setDeliveryTime2] = React.useState();
    const [deliveryTime3, setDeliveryTime3] = React.useState();
    const [date, setDate] = React.useState();
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const [deliveryNow_H, setDeliveryNow_H] = React.useState("시간");
    const [deliveryNow_M, setDeliveryNow_M] = React.useState("분");
    const [delivery_E, setDelivery_E] = React.useState('상세선택');
    const drop_M = React.useRef({});
    const drop_H = React.useRef({});

    const [addr, setAddr] = React.useState();
    const [addrVisible, setAddrVisible] = React.useState(false);
    
    var date1 = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds(); //To get the Current Seconds

    console.log(date1);
    console.log("qwqwe"+month);
    console.log(year);
    console.log(hours);
    console.log(min);
    console.log(sec);

    // const onChange = (event, selectedDate) => {
    //   const currentDate = selectedDate || date;
    //   setShow(Platform.OS === 'ios');
    //   if(mode === 'date'){
    //     setDate(currentDate);
    //   }
    //   else{
    //     setTime(currentDate);
    //   }
    //   setShow(false);
    // };
  
    // const showMode = (currentMode) => {
    //   setShow(true);
    //   setMode(currentMode);
    //   console.log("123123");
    // };
  
    // const showDatepicker = () => {
    //   showMode('date');
    // };
  
    // const showTimepicker = () => {
    //   showMode('time');
    // };
    

    // const onChange_date = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setDate(currentDate);
    //     if(selectedDate === undefined){

    //     }else{
    //         setIsDate(JSON.stringify(currentDate).slice(1,11));
    //     }
        
    //   };

    // const onChange_time = (event, selectedTime) =>{
    //     setTime(selectedTime);
    //     console.log(selectedTime);
    //     setIsTime(JSON.stringify(selectedTime).slice(12, 20));
    // }


    // 서버작업 완료 후 같은폼 플랫리스트 사용예정
    // const customModal = (toggle) => {
    //     return <>

    //     </>
    // }

    LocaleConfig.locales['ko'] = {
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월.', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        today: '오늘'
    };
    LocaleConfig.defaultLocale = 'ko';

    return <>
        <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: 'rgb(245,240,224)' }}>
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>배송 및 결제정보 입력</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>

            <View style={{ paddingHorizontal: 10, paddingVertical: 10, paddingTop: D_Height * 0.03, borderBottomWidth: 1, borderColor:'rgb(176,169,159)' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    리본문구
                </Text>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <BouncyCheckbox
                        size={15}
                        text="경조사어"
                        textStyle={{ color: 'black', textDecorationLine: 'none' }}  
                        iconStyle={{ backgroundColor: check_1 ? 'rgb(144,176,89)' : 'white' }}
                        disableBuiltInState
                        isChecked={check_1}
                        onPress={() => {
                            setCheck_1(!check_1);
                            setCheck_2(false);
                        }}
                    />
                    <BouncyCheckbox
                        size={15}
                        text="카드메세지"
                        textStyle={{ color: 'black', textDecorationLine: 'none' }}
                        iconStyle={{ backgroundColor: check_2 ? 'rgb(144,176,89)' : 'white' }}
                        disableBuiltInState
                        isChecked={check_2}
                        onPress={() => {
                            setCheck_2(!check_2);
                            setCheck_1(false);
                        }}
                    />
                </View>
                <View style={{ width: '100%' }}>
                    <View style={{ height: 50, flexDirection: 'row', borderWidth: 1, borderColor: 'rgb(255,98,0)', marginVertical: 5 }}>
                        <TextInput
                            style={{ flex: 5, paddingHorizontal: 10 }}
                            placeholder="경조사어"
                            onChangeText={setWords}
                            value={words}
                        />
                        <Pressable
                        onPress={()=>setWordsModal(true)}
                            style={{ flex: 1, backgroundColor: 'rgb(255,98,0)', justifyContent:'center' }}
                        >
                            <LocalSvg asset={Search} width={25} height={25} fill={"#ffffff"} style={{alignSelf:'center'}} />
                        </Pressable>
                        
                        {/* 서버작업 완료 후 플랫리스트 사용 예정 */}

                        {/* {words === true ? customModal("words") : null} */}

                        <Modal visible={wordsModal} transparent>
                            <SafeAreaView />
                            <View style={{ width: D_Width, height: D_Height, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center' }}>
                                <View style={{ width: D_Width * 0.8, height: D_Height * 0.6, backgroundColor: 'white', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 22, fontWeight: 'bold', paddingHorizontal: 15, paddingVertical: 15 }}>경조사어</Text>
                                    <ScrollView style={{ backgroundColor: 'rgb(240,240,240)', marginHorizontal: 15, marginVertical: 15 }}>
                                        <View style={{ backgroundColor: 'white', marginVertical: 15, marginHorizontal: 10 }}>
                                            <Pressable onPress={()=>{
                                                setWords("근조");
                                                setWordsModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>근조</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setWords("근조");
                                                setWordsModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>근조</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setWords("근조");
                                                setWordsModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>근조</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setWords("근조");
                                                setWordsModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>근조</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setWords("근조");
                                                setWordsModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>근조</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setWords("근조");
                                                setWordsModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>근조</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                        </View>
                                    </ScrollView>
                                    <Text onPress={() => setWordsModal(false)} style={{ fontSize: 15, borderWidth: 1, paddingVertical:10,marginVertical:10, paddingHorizontal: 10, alignSelf: 'center' }}>닫기</Text>
                                </View>
                            </View>
                        </Modal>
                        
                    </View>

                    <View style={{ height: 50, flexDirection: 'row', borderWidth: 1, borderColor: 'rgb(255,98,0)', marginVertical: 5 }}>
                        <TextInput
                            style={{ flex: 5, paddingHorizontal: 10 }}
                            placeholder="보내는 분"
                            onChangeText={setSender}
                            value={sender}
                        />
                        <Pressable
                        onPress={()=>{setSenderModal(true)}}
                            style={{ flex: 1, backgroundColor: 'rgb(255,98,0)', justifyContent: 'center' }}
                        >
                            <LocalSvg asset={Search} width={25} height={25} fill={"#ffffff"} style={{ alignSelf: 'center' }} />
                        </Pressable>

                        {/* 서버작업 완료 후 플랫리스트 사용 예정 */}

                        {/* {sender === true ? customModal("sender") : null} */}

                        <Modal visible={senderModal} transparent>
                            <SafeAreaView />
                            <View style={{ width: D_Width, height: D_Height, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center' }}>
                                <View style={{ width: D_Width * 0.8, height: D_Height * 0.6, backgroundColor: 'white', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 22, fontWeight: 'bold', paddingHorizontal: 15, paddingVertical: 15 }}>보내는 분</Text>
                                    <ScrollView style={{ backgroundColor: 'rgb(240,240,240)', marginHorizontal: 15, marginVertical: 15 }}>
                                        <View style={{ backgroundColor: 'white', marginVertical: 15, marginHorizontal: 10 }}>
                                            <Pressable onPress={()=>{
                                                setSender("플로드");
                                                setSenderModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setSender("플로드");
                                                setSenderModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setSender("플로드");
                                                setSenderModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setSender("플로드");
                                                setSenderModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setSender("플로드");
                                                setSenderModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setSender("플로드");
                                                setSenderModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                            <Pressable onPress={()=>{
                                                setSender("플로드");
                                                setSenderModal(false);
                                                }} style={{ justifyContent: 'space-between', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <Text style={{ paddingVertical: D_Height * 0.03, paddingHorizontal: D_Width * 0.02 }}>플로드</Text>
                                                <Text style={{ paddingVertical: D_Height * 0.008, marginHorizontal:10, alignSelf:'center', paddingHorizontal: D_Width * 0.02, backgroundColor:'rgb(255,98,0)', color:'white' }}>선택</Text>
                                            </Pressable>
                                        </View>
                                    </ScrollView>
                                    <Text onPress={() => setSenderModal(false)} style={{ fontSize: 15, borderWidth: 1, paddingVertical:10,marginVertical:10, paddingHorizontal: 10, alignSelf: 'center' }}>닫기</Text>
                                </View>
                            </View>
                        </Modal>

                    </View>
                    <View style={{ flexDirection: 'row', width: '40%', height: 40, borderColor: 'rgb(255,98,0)', borderWidth: 1 }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text style={{ alignSelf: 'center' }}>+</Text>
                        </View>
                        <View style={{ flex: 2, borderLeftWidth: 1,borderColor:'rgb(255,98,0)',justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center' }}>보내는분 추가</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10, paddingTop: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    배송정보
                </Text>
                <View style={{ backgroundColor: 'white', width: '100%', marginVertical: 10, borderWidth: 1, borderColor:'rgb(232,230,224)' }}>
                    <TextInput
                        style={{ height: 50, borderBottomWidth: 1, paddingHorizontal: 10, borderColor:'rgb(232,230,224)' }}
                        placeholder="받는사람"
                    />
                    <TextInput
                        style={{ height: 50, borderBottomWidth: 1, paddingHorizontal: 10, borderColor:'rgb(232,230,224)' }}
                        placeholder="휴대폰번호(-없이 입력하세요)"
                    />
                    <Pressable
                        style={{ height: 50, borderBottomWidth: 1, paddingHorizontal: 10, flexDirection: 'row', borderColor:'rgb(232,230,224)' }}
                    >
                        <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 3  }}>
                            {date === undefined ? <Text style={{color:'rgb(160,160,160)'}}>배달일</Text> :
                                <Text style={{color:'rgb(160,160,160)'}}>{date}</Text>
                            }
                        </View>

                        <Pressable onPress={() => {
                            setDateModal(true);
                        }} style={{ flex: 1, justifyContent: 'center' }}>
                            <LocalSvg asset={CalendarMark} width={35} height={35} fill={"#000000"} />
                        </Pressable>

                        <Modal visible={dateModal} transparent>
                            <SafeAreaView />
                            <View style={{ height: D_Height, justifyContent: 'center', backgroundColor:"rgba(0,0,0,0.6)" }}>
                                <View style={{flexDirection:'row', justifyContent:'center'}}>
                                <Pressable onPress={() => setDateModal(false)} style={{ width: D_Height * 0.05, height: D_Height * 0.05, backgroundColor: 'grey', borderRadius: (D_Height * 0.05) / 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, textAlign: 'center', alignSelf: 'center', color:'white', fontSize:30 }}>x</Text>
                                </Pressable>
                                </View>
                                <Calendar
                                    style={{ width: 250, alignSelf: 'center', borderWidth: 1 }}
                                    current={new Date()}
                                    minDate={new Date()}
                                    onDayPress={(day) => {
                                        setDate(day.dateString)
                                        setDateModal(false);
                                    }}
                                /></View>
                        </Modal>
                        <Pressable onPress={()=>{
                            if(new Date().getHours() <= 12){
                                setDeliveryNow_H("오전 " + JSON.stringify(new Date().getHours())+"시");
                            }else{
                                setDeliveryNow_H("오후 " + JSON.stringify((new Date().getHours()-12)+"시"));
                            }
                            
                            setDeliveryNow_M(JSON.stringify(new Date().getMinutes()));
                            setDate(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate());
                            drop_H.current.reset();
                            drop_M.current.reset();
                        }} style={{ flex: 2, backgroundColor: 'red', justifyContent: 'center' }}>
                            <Text style={{ alignSelf: 'center', color: 'white' }}>
                                즉시배송
                            </Text>
                        </Pressable>
                    </Pressable>
                    {/* orderData_E, orderData_H, orderData_M */}
                    <Pressable style={{paddingVertical:10, borderBottomWidth: 1, paddingHorizontal: 10, borderColor:'rgb(232,230,224)' }}>
                        <Text style={{paddingVertical:10, color:'grey'}}>배달시간</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <SelectDropdown
                            ref={drop_H}
                            data={orderData_H}
                            onSelect={(selectedItem, index) => {
                                setDeliveryNow_H(selectedItem)
                            }}
                            
                            renderDropdownIcon={()=>{
                                return <>
                                    <View style={{ backgroundColor:'grey', paddingVertical:'2%', paddingHorizontal:'2%'}}>
                                        <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                                    </View>
                                </>
                            }}
                            buttonStyle={{width:'31%', backgroundColor:'white', height:40, borderColor:'grey', borderWidth:1, borderRadius:5}}
                            buttonTextStyle={{ fontSize: 13,textAlign:'left', fontWeight:'bold', color:'grey'}}
                            defaultButtonText={deliveryNow_H}
                        /> 
                        <SelectDropdown
                            ref={drop_M}
                            data={orderData_M}
                            onSelect={(selectedItem, index) => {
                                setDeliveryNow_M(selectedItem);
                            }}
                            renderDropdownIcon={()=>{
                                return <>
                                    <View style={{ backgroundColor:'grey', paddingVertical:'2%', paddingHorizontal:'2%'}}>
                                        <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                                    </View>
                                </>
                            }}
                            buttonStyle={{width:'31%', backgroundColor:'white', height:40, borderColor:'grey', borderWidth:1, borderRadius:5}}
                            buttonTextStyle={{ fontSize: 13,textAlign:'left', fontWeight:'bold', color:'grey'}}
                            defaultButtonText={deliveryNow_M}
                        /> 
                        <SelectDropdown
                            data={orderData_E}
                            onSelect={(selectedItem, index) => {
                                setDelivery_E(selectedItem);
                            }}
                            renderDropdownIcon={()=>{
                                return <>
                                    <View style={{ backgroundColor:'grey', paddingVertical:'2%', paddingHorizontal:'2%'}}>
                                        <LocalSvg asset={Drop} width={15} height={15} fill={"white"} />
                                    </View>
                                </>
                            }}
                            buttonStyle={{width:'31%', backgroundColor:'white', height:40, borderColor:'grey', borderWidth:1, borderRadius:5}}
                            buttonTextStyle={{ fontSize: 13,textAlign:'left', fontWeight:'bold', color:'grey'}}
                            defaultButtonText={delivery_E}
                            />
                        </View>
                    </Pressable>

                    <View style={{ justifyContent: 'center', height: 50, borderBottomWidth: 1, paddingHorizontal: 10, borderColor: 'rgb(232,230,224)' }}>
                        <Text onPress={() => {
                            setAddrVisible(true)
                        }} style={{ color: 'rgb(160,160,160)' }}>
                            {addr === undefined ? '서울특별시 송파구 석촌호수로 222' : addr}
                        </Text>
                        <Modal visible={addrVisible}>
                            <SafeAreaView />
                            <Pressable onPress={() => setAddrVisible(false)} style={{ justifyContent: 'center', paddingVertical: 10, backgroundColor: 'orange', borderRadius: 10 }}><Text style={{ alignSelf: 'center', color: 'white', fontSize: 18 }}>닫기</Text></Pressable>
                            <Postcode
                                style={{ flex: 3 }}
                                jsOptions={{ animation: true }}
                                onSelected={data => {
                                    setAddr(data.address)
                                    setAddrVisible(false);
                                }}
                            />
                        </Modal>
                    </View>
                    <TextInput
                        style={{ height: 50, borderBottomWidth: 1, paddingHorizontal: 10 , borderColor:'rgb(232,230,224)' }}
                        placeholder="상세주소입력"
                    />
                    <TextInput
                        style={{ height: 50, paddingHorizontal: 10 }}
                        placeholder="배송시요청사항"
                    />
                </View>
            </View>
            <View style={{ width: D_Width, borderTopWidth: 1, backgroundColor: 'rgb(219,214,203)' }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>상품가격</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <NumberFormat value={35000} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay => <Text style={{ textAlign: 'right' }}>{pay}</Text>} />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>수량</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'right' }}>1</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>배송비</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'right' }}>8000원</Text>
                    </View>
                </View>

                <View style={{ width: D_Width, borderTopWidth: 1, backgroundColor: 'rgb(219,214,203)', borderBottomWidth: 1 }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                        <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>합계</Text>
                        </View>
                        <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                            <NumberFormat value={35000} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay => <Text style={{ fontWeight: 'bold', textAlign: 'right', color: 'rgb(217,112,45)' }}>{pay}</Text>} />
                        </View>
                    </View>
                </View>

                <View>
                    <Text>결제모듈붙일자리</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1 }}>
                <Pressable onPress={()=>{
                    alert('결제 모듈 완료 후 이동처리');
                    navigation.navigate('mainPage')}} style={{ justifyContent: 'center', height: 50, backgroundColor: 'orange' }}>
                    <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>결제하기</Text>
                </Pressable>
            </View>

        </ScrollView>
    </>

}

export default Order_Input;