import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, Text, View, Dimensions, Pressable, FlatList } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import NumberFormat from 'react-number-format';
import Arrow from '../img/arrow.svg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Api from '../config.json';

const Product_Out_Before_Detail = ({navigation}) => {

    const [data, setData] = React.useState("");

    const route = useRoute();

    // let guid = route.params.Uid;

    const _getData = async() => {
        let url = `${Api.naviPushDetail}${guid}`
        await fetch(url)
        .then(res=>res.json())
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    }
    React.useEffect(()=>{
        _getData();
        console.log(data);
    },[]);

    return <>
        <ScrollView style={{backgroundColor:'rgb(245,240,229)'}}>

            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>주문상세</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>

            <Text />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 10 }}>발주정보</Text>
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>발주꽃집</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white' }}>
                        {/* <Text>{data.DealerName }</Text> */}
                    </View>
                </View>
                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>꽃집 연락처</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        {/* <Text>{data.OrdMobile}</Text> */}
                    </View>
                </View>

                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>받는사람</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        {/* <Text>{data.OrdMobile}</Text> */}
                    </View>
                </View>
                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>연락처</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        {/* <Text>{data.OrdMobile}</Text> */}
                    </View>
                </View>
                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>배송일시</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        {/* <Text>{data.OrdMobile}</Text> */}
                    </View>
                </View>
                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>배송상세</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        {/* <Text>{data.OrdMobile}</Text> */}
                    </View>
                </View>
                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>주소</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        {/* <Text>{data.OrdMobile}</Text> */}
                    </View>
                </View>
                <View style={{ borderWidth: 1, flexDirection: 'row', borderColor: 'grey' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgb(224,224,224)', paddingVertical: 15, paddingLeft: 10 }}>
                        <Text>기타요청사항</Text>
                    </View>
                    <View style={{ flex: 2, paddingVertical: 15, paddingLeft: 10, backgroundColor: 'white'  }}>
                        {/* <Text>{data.OrdMobile}</Text> */}
                    </View>
                </View>
            </View>

            <Text />
            
            

            <Text />
            <View style={{ width: D_Width, borderTopWidth: 1, backgroundColor: 'rgb(219,214,203)'  }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>상품가격</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        {/* <NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay => <Text style={{ textAlign: 'right' }}>{pay}</Text>} /> */}
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>수량</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        {/* <Text style={{ textAlign: 'right' }}>{data.ea}</Text> */}
                    </View>
                </View>
            </View>
            <View style={{ width: D_Width, borderTopWidth: 1, backgroundColor: 'rgb(219,214,203)', borderBottomWidth:1 }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{fontWeight:'bold'}}>합계</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        {/* <NumberFormat value={data.price * data.ea} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay => <Text style={{ textAlign: 'right', color:'rgb(217,112,45)' }}>{pay}</Text>} /> */}
                    </View>
                </View>
            </View>
            <Text/><Text/>
            <Pressable onPress={()=>alert('주문접수')} style={{marginHorizontal:10, height:D_Height*0.08, backgroundColor:'rgb(144,176,89)', justifyContent:'center'}}><Text style={{alignSelf:'center', color:'white', fontSize:18, fontWeight:'bold'}}>주문접수</Text></Pressable>
            <Pressable onPress={()=>alert('주문거부')} style={{marginHorizontal:10, height:D_Height*0.08, backgroundColor:'rgb(153,153,153)', justifyContent:'center'}}><Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>주문거부</Text></Pressable>
        </ScrollView>
    </>
}
export default Product_Out_Before_Detail