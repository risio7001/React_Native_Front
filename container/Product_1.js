import * as React from 'react';
import { Dimensions, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import Arrow from '../img/arrow.svg';
import NumberFormat from 'react-number-format';
import db from '../config.json';
import ping from '../img/ping.png';
import { useRoute } from '@react-navigation/native';

const Product_1 = ({navigation, route}) => {
    const getRoute = useRoute();
    let getParams = getRoute.params
    const flatListRef = React.useRef();

    const goDetail = (e) => {
        navigation.navigate("productDetail", e);
    }

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    const [testStack, setTestStack] = React.useState(1);

    const [categoryStack, setCategoryStack] = React.useState("서울 송파구 선촌호수로 222(석촌동, J타워) > 축하화환"); // 임시 데이터

    const [select_fliter, setSelect_fliter] = React.useState('ASC');

    React.useEffect(() => {
        getData();
        flatListRef.current.scrollToOffset({animated:false, offset:0});
    }, [select_fliter,testStack]);

    const [data, setData] = React.useState();

    const getData = async () => {
        var adcode = 1130510200;
        var userid = 'flroad';
        let url = db.db + getParams.cate + '/' + adcode + '/' + select_fliter + '?page=' + testStack + '&userid=' + userid;
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': 'application/json'
                }
            });
            const json = await response.json();
            setData(json.recordsets[0]);
        } catch (err) {
            console.log(err)
        }
    }
    const MainListItem = ({ items }) => {
        return <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: (deviceWidth * 0.95), paddingBottom: 8 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: (deviceWidth * 0.2), height: (deviceHeight * 0.12) }}>
                        <Image source={{ uri: 'http://flda.co.kr/data/flda/goods/' + items.DealerID + '/small/' + items.ImgS }} style={{ width: '100%', height: '100%' }} />
                        </View>
                        <View style={{ paddingLeft: 8, flexDirection: 'column', justifyContent: 'center' }}>
    
                            <Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'grey' }}>{items.Title}{"\n"}</Text>
                                <NumberFormat value={items.Price} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay => <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'black' }}>{pay}{"\n"}</Text>} />
                                <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'grey' }}>상품코드 : {items.GoodsCode}{"\n"}</Text>
                                {/* 배송사진 쿼리수정 필요 211103 */}
                                <Text style={{ fontWeight: 'normal', fontSize: 12, color: 'grey' }}>리뷰 {items.userCnt} 배송사진 {items.photoCnt}</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: (deviceWidth * 0.07), height: (deviceHeight * 0.12), flexDirection: 'column', justifyContent: 'center' }}>
                        <ImageBackground source={ping} resizeMode='contain' style={{ width: "100%", height: "100%" }} />
                    </View>
                </View>
        </>
    }
    return <>
        
        <View style={{ width: deviceWidth, height: (deviceHeight * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (deviceWidth * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={()=>navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>{getParams.name}</Text>
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
        <View style={{ backgroundColor: "grey", width: deviceWidth, height: (deviceHeight * 0.06), flexDirection: 'column', justifyContent: 'center' }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

                <Text style={{ color: select_fliter === 'ASC' ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { setSelect_fliter('ASC'); }}>낮은 가격순</Text>
                <Text style={{ color: select_fliter === 'high' ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { setSelect_fliter('high'); }}>높은 가격순</Text>
                <Text style={{ color: select_fliter === 'fav' ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { setSelect_fliter('fav');}}>인기상품순</Text>
                <Text style={{ color: select_fliter === 'like' ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { setSelect_fliter('like');}}>상품평 많은순</Text>
                <Text style={{ color: select_fliter === 4 ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { alert("준비중") }}>단골업체만</Text>
                <Text style={{ color: select_fliter === 5 ? 'black' : 'white', fontSize: 13, fontWeight: '800' }} onPress={() => { alert("준비중") }}>거리순</Text>

            </View>

        </View>
        <FlatList
            ref={flatListRef}
            data={data}
            keyExtractor={(items, index) => index.toString()}
            renderItem={({item})=><Pressable onPress={()=>goDetail(item)}><MainListItem items = {item}/></Pressable>}
        />
    </>
}
export default Product_1