import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Button, Dimensions, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import NumberFormat from 'react-number-format';
import Arrow from '../img/arrow.svg';
import db from '../config.json';

const Product_2 = ({navigation}) => {

    const [p_cate, setP_cate] = React.useState(0);
    
    const [data, setData] = React.useState();

    const [trans_pic_img, setTrans_pic_img] = React.useState();

    const [review_data, setReview_data] = React.useState();


    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    // props 변수 값 으로 대체 해야함
    const [categoryStack, setCategoryStack] = React.useState("서울 송파구 선촌호수로 222(석촌동, J타워) > 축하화환 > 축하3단 > 축하화환3단");

    const route = useRoute();
    const [p_count, setP_count] = React.useState(1);
    const doBack = () => {
        navigation.goBack();
    }

    let guid = route.params.Uid;

    const getDetailData = () => {
        // console.log(guid);
        var userid = 'flroad';
        fetch(`${db.detail}${guid}?userid=${userid}`,{
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        })
        .then((response)=>response.json())
        .then((json)=>{
            setData(json.recordsets[0][0]);
            return json;
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }
    React.useEffect(()=>{
        getDetailData();
    },[]);

    React.useEffect(() => {
        review()
        trans_pic()
        detailRouter(p_cate)
    }, [p_cate]);


    const review = () => {
        
            fetch(`${db.review}${guid}`)
            .then((response) => response.json())
            .then((json) => setReview_data(json.recordsets[0]))
            .catch((err) => console.log(err));
            }

    const trans_pic = () => {

        fetch(`${db.trans_pic}${guid}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setTrans_pic_img(json.recordsets[0])
            })
            .catch((err) => console.log(err));
    }



    const detailRouter = () => {
        switch (p_cate) {
            case 0:         // 상세페이지
                return <>
                    {data === undefined ?
                        <View>
                            <Text>
                                로딩중
                            </Text>
                        </View>
                        :
                        <View style={{ width: deviceWidth, height: (deviceHeight * 0.7) }}>
                            <Text style={{ height: '10%', flexDirection: 'row', alignSelf: 'center', fontSize: 24, paddingTop: 8, paddingBottom: 8, fontWeight: 'bold' }}>{data.Title}</Text>
                            <Image source={{ uri: 'http://flda.co.kr/data/flda/goods/' + data.DealerID + '/small/' + data.ImgS }} style={{ width: deviceWidth, height: '90%' }} />
                        </View>
                    }
                </>
            case 1:         // 실제배송사진
                return <>
                    {data === undefined && trans_pic_img === undefined ?
                        <View style={{width:deviceWidth, height:deviceHeight*0.3}}>
                            <Text>
                                로딩중
                            </Text>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', borderTopWidth: 1, borderTopColor: 'rgb(222,222,222)', paddingHorizontal: 8, paddingTop: 16, paddingBottom: 16 }}>
                            <Text>
                            {trans_pic_img.length===0 ? <View><Text style={{ paddingHorizontal:20, fontWeight: 'bold' }}>배송사진이 없습니다.</Text></View> :
                             trans_pic_img.map((item, index) => (
                                <View key={index} style={{ paddingTop: 16, paddingLeft: 6 }}>
                                    <Image source={{ uri: 'http://flda.co.kr/data/flda/minishop/' + data.uid + '/' + item.img }} style={{ width: (deviceWidth * 0.3), height: (deviceWidth * 0.3) }} />
                                </View>
                            ))}
                            </Text>
                        </View>
                    }
                </>
            case 2:         // 이용후기
                return <>
                    {data === undefined && review_data === undefined?
                        <View>
                            <Text>
                                로딩중
                            </Text>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ width: (deviceWidth * 0.85), height: deviceHeight * 0.05, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(76,186,181)' }}>{review_data.length}</Text>
                                    <Text style={{ fontWeight: 'bold' }}> 개의 리뷰가 있습니다.</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    {review_data.map((review, index) => (
                                        <View style={{ flexDirection: 'column', height: deviceHeight * 0.1 }} key={index}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text>내 점수 </Text>
                                                    <Rating
                                                        type='star'
                                                        ratingCount={5}
                                                        startingValue={review.ParPoint}
                                                        imageSize={16}
                                                        readonly='true'
                                                        tintColor='rgb(242,242,242)'
                                                    />
                                                </View>
                                                <View><Text>{review.RegDate}</Text></View>
                                            </View>
                                            <View>
                                                <Text style={{ color: 'grey' }}>
                                                    {review.Content}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    }
                </>
        }
    }
    


    return <>
        
            {data===undefined ?
             <View>
                 <Text>
                     로딩중
                 </Text>
             </View> 
             : <ScrollView horizontal={false} style={{ flex: 1, width: deviceWidth }}>
            <View style={{ width: deviceWidth, height: (deviceHeight * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (deviceWidth * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={()=>doBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>축하화환</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <View style={{ width: deviceWidth, height: (deviceHeight * 0.04), backgroundColor: "white", flexDirection: "column", justifyContent: 'center' }}>
            <Text style={{ maxWidth: deviceWidth, fontSize: 11, color: "grey", paddingLeft: 10 }}>
                {/* 전역 변수 */}
                {categoryStack}
            </Text>
        </View>
        <View style={{ paddingLeft: 12, flexDirection: 'column', justifyContent: 'center', width: deviceWidth, height: (deviceHeight * 0.1), borderTopWidth: 1 }}>
            {/* props 변수 값 들어갈 곳 */}
            <NumberFormat thousandSeparator={true} displayType={'text'} suffix={'원'} value={data.Price} renderText={pay => <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{pay}</Text>} />
            <View style={{ flexDirection: 'row' }}>
                <Rating
                    type='star'
                    ratingCount={5}
                    startingValue={data.avgPoint}
                    imageSize={16}
                    readonly='true'
                    tintColor='rgb(242,242,242)'
                />
                <Text style={{ fontSize: 12, color: 'grey' }}>  리뷰 {data.reviewCnt}  </Text>
                <Text style={{ fontSize: 12, color: 'grey' }}>배송사진 {data.photoCnt}  </Text>
                <Text style={{ fontSize: 12, color: 'grey' }}>주문수 {data.orderCnt}</Text>
            </View>
        </View>
        <View style={{ paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', width: deviceWidth, height: (deviceHeight * 0.09), borderTopWidth: 1, backgroundColor: "rgb(209,206,199)" }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text>판매자</Text><Text style={{ fontWeight: '900', lineHeight:15 }}> {data.Product} </Text>
                    <Rating
                        type='heart'
                        ratingCount={1}
                        startingValue={1}
                        imageSize={16}
                        readonly='true'
                        tintColor='rgb(209,206,199)'
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: 'grey' }}>리뷰 {route.params.review}  </Text>
                    <Text style={{ fontSize: 12, color: 'grey' }}>배송사진 {route.params.image}  </Text>
                    <Text style={{ fontSize: 12, color: 'grey' }}>주문수 0</Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{ width: "80%", display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Text style={{ backgroundColor: 'rgb(153,153,153)', fontSize: 12, height: "40%", color: 'white', lineHeight: 25 }}>단골등록</Text>
                    <Text style={{ backgroundColor: 'rgb(153,153,153)', fontSize: 12, height: "40%", color: 'white', lineHeight: 25 }}>전화걸기</Text>
                </View>
            </View>
        </View>
        <View style={{ paddingHorizontal: 6, flexDirection: 'row', flex: 1, width: deviceWidth, height: (deviceHeight * 0.08), borderTopWidth: 1 }}>
            <Pressable onPress={() => { setP_cate(0) }} style={{ flex: 1, borderBottomColor: 'rgb(96,174,222)', borderBottomWidth: p_cate === 0 ? 3 : 0, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}><Text>상품상세</Text></Pressable>
            <Pressable onPress={() => { setP_cate(1) }} style={{ flex: 1, borderBottomColor: 'rgb(96,174,222)', borderBottomWidth: p_cate === 1 ? 3 : 0, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}><Text>실제배송사진</Text></Pressable>
            <Pressable onPress={() => { setP_cate(2) }} style={{ flex: 1, borderBottomColor: 'rgb(96,174,222)', borderBottomWidth: p_cate === 2 ? 3 : 0, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}><Text>이용후기</Text></Pressable>
        </View>
        {p_cate === undefined ? '' : detailRouter()}
        {/* 하단 주문 하기  */}
        <View>
            <View style={{ justifyContent: 'center', width: deviceWidth, height: (deviceHeight * 0.07), borderTopWidth: 1, flexDirection: 'row' }}>
                <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                    <Text>상품가격</Text>
                </View>
                <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                    <NumberFormat value={data.Price} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay=><Text style={{ textAlign: 'right' }}>{pay}</Text>}/>
                </View>
            </View>
            <View style={{ justifyContent: 'center', width: deviceWidth, height: (deviceHeight * 0.07), borderTopWidth: 1, flexDirection: 'row' }}>
                <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                    <Text>배송비</Text>
                </View>
                <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'right' }}>무료배송</Text>
                </View>
            </View>
            <View style={{ justifyContent: 'center', width: deviceWidth, height: (deviceHeight * 0.07), borderTopWidth: 1, flexDirection: 'row' }}>
                <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                    <Text>수량</Text>
                </View>
                <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ width: '70%', alignSelf: 'flex-end', height: '70%', flexDirection: 'row' }}>
                        <Pressable onPress={() => p_count === 1 ? setP_count(1) : setP_count(p_count - 1)} style={{ flexDirection: 'row', justifyContent: 'center', width: '30%', height: '100%', borderColor: 'rgb(224,224,224)', borderWidth: 1 }}><Text style={{ lineHeight:30, fontWeight:'bold', color: 'rgb(163,163,163)' }}>-</Text></Pressable>
                        <TextInput  style={{ borderColor: 'rgb(224,224,224)', borderWidth:1, textAlign:'center', height:'100%', width:'30%', color: 'rgb(60,158,154)' }} onChangeText={(e)=>setP_count(e)}>{p_count}</TextInput>
                        <Pressable onPress={() => setP_count(p_count + 1)} style={{ flexDirection: 'row', justifyContent: 'center', width: '30%', height: '100%', borderColor: 'rgb(224,224,224)', borderWidth: 1 }}><Text style={{ lineHeight:30, fontWeight:'bold', color: 'rgb(163,163,163)' }}>+</Text></Pressable>
                    </View>
                </View>
            </View>
            <View style={{ height:deviceHeight*0.1, backgroundColor: 'rgb(237,237,237)', justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', justifyContent:'center' }}>
                    <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:12 }}>
                        주문금액 합계
                    </Text>
                        <NumberFormat 
                        value={data.Price*p_count} 
                        displayType={'text'} 
                        thousandSeparator={true}
                        suffix={'원'} 
                        renderText={formattedValue=><Text style={{  textAlign:'center', fontWeight: 'bold', fontSize: 22, color:'rgb(93,180,235)' }}>{formattedValue}</Text>}/>
                </View>
            </View>
            <Button title="주문하기" color="orange" onPress={()=>{alert("준비중입니다.")}}/>
        </View> 
        </ScrollView>
            }
            

       
    </>
}
export default Product_2