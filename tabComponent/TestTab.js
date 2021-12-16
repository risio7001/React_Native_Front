import * as React from 'react';
import { Pressable, ScrollView, Text, TextInput, View, StyleSheet, Image, Modal, DevSettings } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Arrow2 from '../img/arrow2.svg';


let check = [];

const TestTab = () => {
    const [color, setColor] = React.useState(false);

    const [target, setTarget] = React.useState(); // 타겟 저장
    const [deps_1, setDeps_1] = React.useState(); // 받아온 1차 주소 데이터 
    const [deps_2, setDeps_2] = React.useState(); // 받아온 2차 주소 데이터 저장
    const [deps_3, setDeps_3] = React.useState(); // 받아온 3차 주소 데이터 저장
    const [cortarNo, setCortarNo] = React.useState(""); // 하위 행정구역 코드 저장
    // const [deps_stack, setDeps_stack] = React.useState();  // 주소 1차
    // const [deps_stack2, setDeps_stack2] = React.useState();  // 주소 2차
    const [select_sido, setSelect_sido] = React.useState(1);  // 1차 주소지 선택
    const [select_gugun, setSelect_gugun] = React.useState(1);  // 2차 주소지 선택
    const [dongStack, setdongStack] = React.useState(null);  // 3차 주소지 저장
    const [selectAll, setSelectAll] = React.useState(false);
    const [dongAll, setDongAll] = React.useState();
    const [chDong, setChDong] = React.useState();



    const [totalStack, setTotalStack] = React.useState();  // 배송지 추가하기 버튼 클릭 시 저장되는 곳

    const [sido, setSido] = React.useState();// 주소 1차
    const [gugun, setGugun] = React.useState();// 주소 2차

    React.useEffect(() => {
        getMap();
    }, [cortarNo]);

    let minData = [];

    const getMap = async () => {

        await fetch(`https://land.naver.com/childRegionList.nhn?cortarNo=${cortarNo}&&rletTypeCd=A01`)
            .then((res) => res.json())
            .then((json) => {
                switch (target) {
                    case 'gugun':
                        setDeps_3();
                        return setDeps_2(json.Region);
                    case 'dong':
                        json.Region.forEach((element, index) => {
                            minData.push({
                                "name": element.cortar_nm,
                                "code": element.cortar_no
                            });
                        });
                        let temp = [];
                        if(check.length > 0){   // 현재 선택된 시/군/구에 해당하는 읍/면/동 검사
                            for(const i in minData){
                                for(const j in check){
                                    if(minData[i].code === check[j].code){  // 현재 선택된 시/군/구에 해당하는 읍면동이 있다면 저장
                                        temp.push(check[j]);
                                    }
                                }
                            }
                            if(temp.length < 1){
                                setSelectAll(false);
                            }
                            else{
                                setSelectAll(true);
                            }
                            setdongStack(temp);
                        }
                        
                        return setDeps_3(minData);
                    default:
                        return setDeps_1(json.Region);
                }
            })
            .catch((err) => console.log(err))
    }

    // const select_all = () =>{
    //     let data = [];
    //     // console.log("선택된것들 : : : : : : : : : : : :");
    //     // console.log(deps_3);
    //     if(selectAll){
    //         deps_3.forEach((element)=>check.push(element));
    //         for (const i in check) {
    //             for (const j in deps_3) {
    //                 if (deps_3[j].code === check[i].code) {
    //                     data.push(check[i]);
    //                 }
    //             }
    //         }
    //     }
    //     else{
    //         console.log('none');
    //     }
    //     return data;
    // }

    React.useEffect(()=>{
        // console.log(dongStack);
    },[check, totalStack]);

    // React.useEffect(()=>{
    // },[dongStack]);

    // const dong = () =>{
    //     console.log("--------------------------------------------------\n--------------------------------------------------")
    // }

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>테스트탭</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <ScrollView>

            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 10 }}>배송지선택</Text>
            <View style={{ width: '100%', height: D_Height * 0.05, borderWidth: 1, borderColor: 'rgb(150,150,150)', marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15 }}>
                <Text style={{ alignSelf: 'center' }}>시/도</Text>
                <LocalSvg asset={Arrow2} width={20} height={20} fill={"#969696"} transform={[{ rotate: '90deg' }]} alignSelf={'center'} />

            </View>
            <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <Text>
                    {deps_1 === undefined ? "" : deps_1.map((sido, index) => (
                        <Pressable onPress={() => {
                            
                            setTarget('gugun');
                            setSelect_sido(index);
                            setCortarNo(sido.cortar_no);
                            setSido(sido.cortar_nm);
                        }} style={{ borderWidth: select_sido === index ? 2 : 1, borderColor: select_sido === index ? 'red' : 'black', width: D_Width * 0.28, height: D_Height * 0.03, justifyContent: 'center' }} key={index}>
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
                                    setTarget("dong");
                                    setGugun(gugun.cortar_nm);
                                    setCortarNo(gugun.cortar_no);
                                    setSelect_gugun(index);
                                    setdongStack();
                                    // setSelectAll(false);
                                    // console.log(sido+" "+gugun.cortar_nm);
                                    
                                    // console.log(check.length);
                                }} style={{ borderWidth: select_gugun === index ? 2 : 1, borderColor: select_gugun === index ? 'red' : 'black', width: D_Width * 0.28, height: D_Height * 0.03, justifyContent: 'center' }} key={index}>
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
                            setColor(!color);

                            let data = [];

                            if (!selectAll) {
                                for(const i in deps_3){ // 기존에 선택 됐던 읍/면/동 삭제
                                    for(let j in check){
                                        if (deps_3[i] === check[j]) {
                                            check.splice(j, 1);
                                            j--;
                                        }
                                    }
                                }
                                deps_3.forEach((element) => { check.push(element) }); // 시/군/구 하위 행정구역 전부 선택

                                for (const i in check) {    // 현재 시/군/구에 포함된 읍/면/동 확인 및 저장
                                    for (const j in deps_3) {
                                        if (deps_3[j].code === check[i].code) {
                                            data.push(check[i]);
                                        }
                                    }
                                }
                                setSelectAll(true);
                            } else {
                                for(const i in deps_3){     // 현재 선택된 읍/면/동 전체 해제
                                    for(let j in check){
                                        if (deps_3[i].code === check[j].code) {
                                            check.splice(j, 1);
                                            j--;
                                        }
                                    }
                                }
                                setSelectAll(false);
                            }
                            
                            setdongStack(data);     // 현재 선택된 시/군/구에 맞는 읍/면/동 저장
                        }} style={{ justifyContent: 'center' }}>
                            {selectAll ? <Text style={{ alignSelf: 'center' }}>전체해제</Text> : <Text style={{ alignSelf: 'center' }}>전체선택</Text>}
                        </Pressable>
                    </View>
                    <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>
                            {deps_3 === undefined ? "" : deps_3.map((dong, index) => (
                                <Pressable onPress={() => {
                                    setColor(!color);
                                    
                                    let data = [];

                                    if(check.find((element)=>element.code === dong.code)){      // 읍/면/동 중복 체크 
                                        check.splice(check.findIndex((element)=>element.code === dong.code),1); // 짝수번 클릭 시 선택해제
                                    }
                                    else{
                                        check.push(dong);   // 홀수번 클릭 시 선택 저장
                                    }

                                    for (const i in check) {
                                        for (const j in deps_3) {
                                            if (deps_3[j].code === check[i].code) {
                                                data.push(check[i]);
                                            }
                                        }
                                    }
                                    setdongStack(data);

                                }} style={{ borderWidth: 1, width: D_Width * 0.28, height: D_Height * 0.03, justifyContent: 'center', flexDirection: 'row' }} key={index}>
                                    <Text style={{ alignSelf: 'center' }}>{dong.name}</Text>
                                    {
                                        check.find(element => element.code === dong.code) === undefined ? null :
                                            <LocalSvg asset={Arrow} width={10} height={10} fill={"#000000"} style={{ backgroundColor: 'red' }} />
                                    }
                                </Pressable>
                            ))}
                        </Text>
                    </View>
                </View>
            }
            <Pressable onPress={() => {
                console.log(totalStack);
                // console.log(dongStack);
                if (sido === undefined) {
                    return alert("시/도 를 선택해주세요");
                }
                else if (gugun === undefined) {
                    return alert("시/군/구 를 선택해주세요");
                }
                else if (dongStack === undefined || dongStack < 1) {
                    return alert("읍/면/동 을 선택해주세요");
                }

                let temp = [];
                if(totalStack === undefined){ // 배송지 선택 처음일때
                    temp.push({
                        "sido":sido+" "+gugun,
                        "dong":dongStack
                    });
                    setTotalStack(temp);
                }
                else{       // 입력된 배송지가 존재 할 때

                    temp = temp.concat(totalStack);
                    let obj = temp.find((element)=>element.sido===sido+" "+gugun);
                    if(obj){// 배송지 선택 시 같은 시군구가 존재할때

                        if(obj.dong === dongStack){ 
                        }
                        else{   // 변경사항 적용이 안됐을때 적용
                            obj.dong = dongStack;
                        }
                        setTotalStack(temp);    // 전체 데이터에 저장 및 랜더링

                        // console.log('temp : : ');
                        // console.log(temp);
                        // console.log('DDDDDDongSSSSStack : : ');
                        // console.log(dongStack);
                        // obj.dong.splice(0); // 기존에 존재하던 읍/면/동 삭제
                        // console.log('DDDDDDongSSSSStack22222222222222222222222 : : ');
                        // console.log(dongStack);
                        // // temp.find((element)=>element.sido===sido+" "+gugun).dong.push(dongStack);
                        // // setdongStack(obj.dong);

                        // // console.log("dongStack 저장 값 : : ");
                        // // console.log(dongStack);
                        // // console.log("Here")
                        // // dongStack.forEach((element)=>obj.dong.push(element));   // 현재 선택된 읍/면/동 저장
                    }
                    else{
                        // console.log("")
                        temp.push({ // 같은 시/군/구 가 존재하지 않을 때 새롭게 저장
                            "sido":sido+" "+gugun,
                            "dong":dongStack
                        });
                        setTotalStack(temp);    // 전체 데이터에 저장
                    }
                }
                
                // console.log(dongStack);
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
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>{total.sido}</Text>
                            <Text onPress={() => {
                                let deleteTotal = [];
                                let tempDong = [];
                                deleteTotal = deleteTotal.concat(totalStack);
                                // 삭제 할 시/군/구에 포함되어 있는 읍/면/동 가져오기
                                deleteTotal[index].dong.forEach((element)=>tempDong.push(element));
                                // 시/군/구 삭제 시 포함 되어있는 읍/면/동 찾아서 삭제
                                for(const i in tempDong){
                                    for(const j in check){
                                        if(tempDong[i].code===check[j].code){
                                            check.splice(j,1);
                                        }
                                    }
                                }
                                // 시/군/구 삭제
                                deleteTotal.splice(index, 1);
                                setdongStack();
                                setTotalStack(deleteTotal);
                                setSelectAll(false);
                            }} 
                            style={{ paddingHorizontal:3 }}> X{" \n"}</Text>
                        </View>
                        <Text style={{flexDirection:'row', flexWrap:'wrap'}}>{total.dong.map((dong, index) =>
                            <View key={index} style={{ flexDirection: 'row', paddingVertical:3 }}>
                                <Text key={index}>{dong.name}</Text>
                                <View style={{ justifyContent:'center'}}>
                                <Text
                                    onPress={() => {
                                        let temp = [];
                                        let temp2 = [];
                                        temp = temp.concat(totalStack);
                                        temp2 = temp.find((element) => element.sido === total.sido).dong;
                                        temp2.splice((temp2.findIndex((element) => element.code === dong.code)), 1);
                                        check.splice((check.findIndex((element) => element.code === dong.code)), 1);
                                        if(temp2.length < 1){
                                            temp.splice(temp.findIndex((element)=>element.sido === total.sido), 1);
                                        }
                                        // console.log(temp2);

                                        setdongStack(temp2);
                                        // setdongStack();
                                        setTotalStack(temp);
                                    }}
                                    style={{ paddingHorizontal:3 }}
                                >X{" "}</Text></View>
                            </View>
                        )}{"\n"}
                        </Text>
                    </View>
                )}
                </Text>
            </View>
        </ScrollView>
    </>

}

export default TestTab;