import * as React from 'react';
import { Dimensions, Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import Arrow from '../img/arrow.svg';
import ping from '../img/ping.png';
import NumberFormat from 'react-number-format';
import db from '../config.json';

const Product_1 = ({navigation, route}) => {
    const goDetail = (e) => {
        // console.log("type : " + parseInt(e.price).toLocaleString('ko-KR'));
        navigation.navigate("product2",e);
        // console.log(e);
    }
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    const [categoryStack, setCategoryStack] = React.useState("서울 송파구 선촌호수로 222(석촌동, J타워) > 축하화환"); // 임시 데이터

    const [select_fliter, setSelect_fliter] = React.useState('ASC');

    // const data = [      // 임시 데이터
    //     {
    //         "name": "축하화환3단",
    //         "price": "38000",
    //         "p_code": "313731",
    //         "review": "1",
    //         "imageUri": "https://placeimg.com/64/64/1",
    //         "image": "1"
    //     },
    //     {
    //         "name": "축하3단",
    //         "price": "31000",
    //         "p_code": "313732",
    //         "review": "40",
    //         "imageUri": "https://placeimg.com/64/64/2",
    //         "image": "55"
    //     },
    //     {
    //         "name": "축하화환2단",
    //         "price": "23000",
    //         "p_code": "313733",
    //         "review": "2",
    //         "imageUri": "https://placeimg.com/64/64/3",
    //         "image": "23"
    //     },
    //     {
    //         "name": "축하화환1단",
    //         "price": "11000",
    //         "p_code": "313734",
    //         "review": "30",
    //         "imageUri": "https://placeimg.com/64/64/7",
    //         "image": "11"
    //     },
    //     {
    //         "name": "축하화환33단",
    //         "price": "900000",
    //         "p_code": "313735",
    //         "review": "2",
    //         "imageUri": "https://placeimg.com/64/64/8",
    //         "image": "84"
    //     },
    //     {
    //         "name": "축하화환33단",
    //         "price": "900000",
    //         "p_code": "313735",
    //         "review": "2",
    //         "imageUri": "https://placeimg.com/64/64/11",
    //         "image": "42"
    //     },
    //     {
    //         "name": "축하화환33단",
    //         "price": "900000",
    //         "p_code": "313735",
    //         "review": "2",
    //         "imageUri": "https://placeimg.com/64/64/45",
    //         "image": "49"
    //     },
    //     {
    //         "name": "축하화환33단",
    //         "price": "900000",§
    //         "p_code": "313735",
    //         "review": "2",
    //         "imageUri": "https://placeimg.com/64/64/12",`₩
    //         "image": "40"
    //     },
    //     {
    //         "name": "축하화환33단",
    //         "price": "900000",
    //         "p_code": "313735",
    //         "review": "2",
    //         "imageUri": "https://placeimg.com/64/64/14",
    //         "image": "22"
    //     },
    // ]

    const [data, setData] = React.useState();
    const getData = () => {
        var cate = 63162;
        var adcode = 1130510200;
        var skip = 1;
        var userid = 'flroad';

        return fetch(`${db.db}${cate}/${adcode}/${select_fliter}?page=${skip}&userid=${userid}`,{
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        })
        .then((response)=>response.json())
        .then((json)=>{
            // console.log("eeeeeeedeeeeee : " + JSON.stringify(json.recordsets));
            setData(json.recordsets[0]);
            return json;
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    React.useEffect(()=>{
        getData();
    },[select_fliter]);
    



    return <>
        <ScrollView>
            <View style={{ width: deviceWidth, height: (deviceHeight * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (deviceWidth * 0.95), height: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </View>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>축하화환</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            <View style={{ width: deviceWidth, height: (deviceHeight * 0.04), backgroundColor: "white", flexDirection: "column", justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: "grey", paddingLeft: 20 }}>
                    {/* 전역 변수 */}
                    {categoryStack}
                </Text>
            </View>
            {/* <ScrollView nestedScrollEnabled={true} horizontal={true} style={{backgroundColor:'g'}}> */}
            <View style={{ backgroundColor: "grey", width: deviceWidth, height: (deviceHeight * 0.06), flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    
                    <Text style={{ color: select_fliter === 'ASC' ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { setSelect_fliter('ASC') }}>낮은 가격순</Text>
                    <Text style={{ color: select_fliter === 'high' ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { setSelect_fliter('high') }}>높은 가격순</Text>
                    <Text style={{ color: select_fliter === 'fav' ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { setSelect_fliter('fav') }}>인기상품순</Text>
                    <Text style={{ color: select_fliter === 'like' ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { setSelect_fliter('like') }}>상품평 많은순</Text>
                    <Text style={{ color: select_fliter === 4 ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { alert("준비중") }}>단골업체만</Text>
                    <Text style={{ color: select_fliter === 5 ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { alert("준비중") }}>거리순</Text>
                    
                </View>

            </View>
            {/* </ScrollView> */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                <Text>
                    {
                        data === undefined ? '' :
                    data.map((product, index) => (
                        <Pressable key={index} onPress={() => { goDetail(product) }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: (deviceWidth * 0.95), paddingBottom: 8 }} key={index}>
                                {/* 이미지 */}
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: (deviceWidth * 0.2), height: (deviceHeight * 0.12) }}>
                                        {/* <Image source={{uri:item.imgUrl}} style={{width:(deviceWidth*0.3), height:(deviceWidth*0.3)}}/> */}
                                        <Image source={{ uri: 'http://flda.co.kr/data/flda/goods/'+product.DealerID+'/small/'+product.ImgS }} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                    <View style={{ paddingLeft: 8, flexDirection: 'column', justifyContent: 'center' }}>
                                        {/* 상품 텍스트 */}
                                        <Text>
                                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'grey' }}>{product.Title}{"\n"}</Text>
                                            <NumberFormat value={product.Price} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay=><Text style={{ fontWeight: 'bold', fontSize: 13, color: 'black' }}>{pay}{"\n"}</Text>}/>
                                            {/* <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'black' }}>
                                                {product.price}원{"\n"}
                                                </Text> */}
                                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'grey' }}>상품코드 : {product.GoodsCode}{"\n"}</Text>
                                            <Text style={{ fontWeight: 'normal', fontSize: 12, color: 'grey' }}>리뷰 {product.userCnt} 배송사진 {product.photoCnt}</Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ width: (deviceWidth * 0.07), height: (deviceHeight * 0.12), flexDirection: 'column', justifyContent: 'center' }}>
                                    <ImageBackground source={ping} resizeMode='contain' style={{ width: "100%", height: "100%" }} />
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </Text>
            </View>
        </ScrollView>
    </>
}
export default Product_1