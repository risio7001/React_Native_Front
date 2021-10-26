import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Button, Dimensions, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import NumberFormat from 'react-number-format';
import Arrow from '../img/arrow.svg';
import reviewData from '../data/reviewData.json';
import img from '../data/imgData.json';

const Product_2 = ({navigation}) => {

    const [p_cate, setP_cate] = React.useState(0);
    const [starLev, setStarLev] = React.useState(0);

    React.useEffect(() => {
        detailRouter(p_cate)
    }, [p_cate]);

    const detailRouter = () => {
        switch (p_cate) {
            case 0:
                return<>
                <View style={{ width: deviceWidth, height: (deviceHeight * 0.7) }}>
                    <Text style={{ height: '10%', flexDirection: 'row', alignSelf: 'center', fontSize: 24, paddingTop: 8, paddingBottom: 8, fontWeight: 'bold' }}>{route.params.name}</Text>
                    <Image source={{ uri: route.params.imageUri }} style={{ width: deviceWidth, height: '90%' }} />
                </View>
                </>
            case 1:
                return<>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', borderTopWidth: 1, borderTopColor: 'rgb(222,222,222)', paddingHorizontal: 8, paddingTop: 16, paddingBottom: 16 }}>
                    {img.map((item, index) => (
                        <View key={index} style={{ paddingTop: 16, paddingLeft: 6 }}>
                            <Image source={{ uri: item.imgUrl }} style={{ width: (deviceWidth * 0.3), height: (deviceWidth * 0.3) }} />
                        </View>
                    ))}
                </View>
                </>
            case 2:
                return<>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ width: (deviceWidth * 0.85), height: deviceHeight * 0.05, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(76,186,181)' }}>{route.params.review}</Text>
                                <Text style={{ fontWeight: 'bold' }}> 개의 리뷰가 있습니다.</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                {reviewData.map((review, index) => (
                                    <View style={{ flexDirection:'column', height:deviceHeight*0.1}} key={index}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text>내 점수 </Text>
                                                <Rating
                                                    type='star'
                                                    ratingCount={5}
                                                    startingValue={5}
                                                    imageSize={16}
                                                    readonly='true'
                                                    tintColor='rgb(242,242,242)'
                                                // onFinishRating={setStarLev()}
                                                />
                                            </View>
                                            <View><Text>{review.date}</Text></View>
                                        </View>
                                        <View>
                                            <Text style={{color:'grey'}}>
                                                {review.content}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </>
        }
    }

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    // props 변수 값 으로 대체 해야함
    const [categoryStack, setCategoryStack] = React.useState("서울 송파구 선촌호수로 222(석촌동, J타워) > 축하화환 > 축하3단 > 축하화환3단");

    const route = useRoute();

    const [p_count, setP_count] = React.useState(1);

    const [favoriteBtn, setFavoriteBtn] = React.useState(false);

    const doBack = () => {
        navigation.goBack();
    }
    
    return <>
        <ScrollView horizontal={false} style={{ flex: 1, width: deviceWidth }}>

            <View style={{ width: deviceWidth, height: (deviceHeight * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (deviceWidth * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={()=>doBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    {/* <View style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        
                    </View> */}
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
                <NumberFormat thousandSeparator={true} displayType={'text'} suffix={'원'} value={route.params.price} renderText={pay => <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{pay}</Text>} />
                <View style={{ flexDirection: 'row' }}>
                    <Rating
                        type='star'
                        ratingCount={5}
                        startingValue={5}
                        imageSize={16}
                        readonly='true'
                        tintColor='rgb(242,242,242)'
                    // onFinishRating={setStarLev()}
                    />
                    {/* <Pressable onPress={() => setStarLating(1)}>
                        <WithLocalSvg
                            width={15}
                            height={15}
                            fill={star1 ? "#ffe600" : "#ffffff"}
                            asset={Star} />
                    </Pressable>
                    <Pressable onPress={() => setStarLating(2)}>
                        <WithLocalSvg
                            width={15}
                            height={15}
                            fill={star2 ? "#ffe600" : "#ffffff"}
                            asset={Star} />
                    </Pressable>
                    <Pressable onPress={() => setStarLating(3)}>
                        <WithLocalSvg
                            width={15}
                            height={15}
                            fill={star3 ? "#ffe600" : "#ffffff"}
                            asset={Star} />
                    </Pressable>
                    <Pressable onPress={() => setStarLating(4)}>
                        <WithLocalSvg
                            width={15}
                            height={15}
                            fill={star4 ? "#ffe600" : "#ffffff"}
                            asset={Star} />
                    </Pressable>
                    <Pressable onPress={() => setStarLating(5)}>
                        <WithLocalSvg
                            width={15}
                            height={15}
                            fill={star5 ? "#ffe600" : "#ffffff"}
                            asset={Star} />
                    </Pressable> */}
                    <Text style={{ fontSize: 12, color: 'grey' }}>  리뷰 {route.params.review}  </Text>
                    <Text style={{ fontSize: 12, color: 'grey' }}>배송사진 {route.params.image}  </Text>
                    <Text style={{ fontSize: 12, color: 'grey' }}>주문수 0</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', width: deviceWidth, height: (deviceHeight * 0.09), borderTopWidth: 1, backgroundColor: "rgb(209,206,199)" }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                    {/* , width:deviceWidth, height:(deviceHeight*0.09), borderTopWidth:1, backgroundColor:"rgb(209,206,199)" */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text>판매자</Text><Text style={{ fontWeight: '900' }}> 에덴플라워 </Text>
                        <Rating
                            type='heart'
                            ratingCount={1}
                            startingValue={1}
                            imageSize={16}
                            readonly='true'
                            tintColor='rgb(209,206,199)'
                        // onFinishRating={setStarLev()}
                        />
                        {/* <Pressable onPress={() => favoriteBtn ? setFavoriteBtn(0) : setFavoriteBtn(1)}>
                            <WithLocalSvg width={15} height={15} fill={favoriteBtn ? '#FF0000' : '#ffffff'} asset={Favorite} />
                        </Pressable> */}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Star width='100' height='100' fill='rgb(255,255,0)' /> */}
                        {/* <S xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg> */}
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
            {/* <View style={{ width: deviceWidth, height: (deviceHeight*0.7) }}>
                <Text style={{height:'10%', flexDirection: 'row', alignSelf: 'center', fontSize: 24, paddingTop: 8, paddingBottom: 8, fontWeight: 'bold' }}>{route.params.name}</Text>
                <Image source={{ uri: route.params.imageUri }} style={{ width: deviceWidth, height: '90%' }} />
            </View> */}
            {/* <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'flex-start', borderTopWidth:1, borderTopColor:'rgb(222,222,222)', paddingHorizontal:8, paddingTop:16, paddingBottom:16}}>
                {img.map((item,index)=>(
                    <View key={index} style={{paddingTop:16, paddingLeft:6}}>
                        <Image source={{uri:item.imgUrl}} style={{width:(deviceWidth*0.3), height:(deviceWidth*0.3)}}/>
                    </View>
                ))}
            </View> */}
            {/* 하단 주문 하기  */}
            <View>
                <View style={{ justifyContent: 'center', width: deviceWidth, height: (deviceHeight * 0.07), borderTopWidth: 1, flexDirection: 'row' }}>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>상품가격</Text>
                    </View>
                    <View style={{ width: "45%", flexDirection: 'column', justifyContent: 'center' }}>
                        {/* <Text style={{ textAlign: 'right' }}>{route.params.price}원</Text> */}
                        <NumberFormat value={route.params.price} displayType={'text'} thousandSeparator={true} suffix={'원'} renderText={pay=><Text style={{ textAlign: 'right' }}>{pay}</Text>}/>
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
                            {/* <Pressable style={{ flexDirection: 'row', justifyContent: 'center', width: '40%', height: '100%', borderColor: 'rgb(224,224,224)', borderWidth: 1 }}>
                                <Text style={{ color: 'rgb(60,158,154)' }}>{p_count}</Text> 
                                <TextInput style={{ color: 'rgb(60,158,154)' }} onChangeText={(e)=>setP_count(e)}></TextInput>
                            </Pressable> */}
                            <Pressable onPress={() => setP_count(p_count + 1)} style={{ flexDirection: 'row', justifyContent: 'center', width: '30%', height: '100%', borderColor: 'rgb(224,224,224)', borderWidth: 1 }}><Text style={{ lineHeight:30, fontWeight:'bold', color: 'rgb(163,163,163)' }}>+</Text></Pressable>
                        </View>
                    </View>
                </View>
                <View style={{ height:deviceHeight*0.1, backgroundColor: 'rgb(237,237,237)', justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', justifyContent:'center' }}>
                        <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize:12 }}>
                            주문금액 합계
                        </Text>
                            {/* {().toLocaleString('ko-KR')}원 */}
                            <NumberFormat 
                            value={route.params.price*p_count} 
                            displayType={'text'} 
                            thousandSeparator={true}
                            suffix={'원'} 
                            renderText={formattedValue=><Text style={{  textAlign:'center', fontWeight: 'bold', fontSize: 22, color:'rgb(93,180,235)' }}>{formattedValue}</Text>}/>
                    </View>
                </View>
                <Button title="주문하기" color="orange" onPress={()=>{alert("준비중입니다.")}}/>
            </View>

        </ScrollView>
    </>
}
export default Product_2