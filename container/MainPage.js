import * as React from 'react';
import { Dimensions, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const MainPage = ({navigation}) => {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    const cate_main = [
        {
            "name":"축하화환"
        },
        {
            "name":"근조화환"
        },
        {
            "name":"서양란"
        },
        {
            "name":"동양란"
        },
        {
            "name":"관엽식물"
        },
        {
            "name":"꽃바구니"
        },
        {
            "name":"쌀화환"
        },
    ]
    const cate_img = [
        {
            "name":"근조3단",
            "path":"https://flda.co.kr/data/flda/banner/app_index_03.png",
            "cate":"63173"
        },
        {
            "name":"축하3단",
            "path":"https://flda.co.kr/data/flda/banner/app_index_chuk3.png",
            "cate":"63172"
        },
        {
            "name":"근조바구니",
            "path":"https://flda.co.kr/data/flda/banner/근조바구니.png",
            "cate":"63236"
        },
        {
            "name":"꽃바구니",
            "path":"https://flda.co.kr/data/flda/banner/꽃바구니.png",
            "cate":"63164"
        },
        {
            "name":"만천홍",
            "path":"https://flda.co.kr/data/flda/banner/mch.png",
            "cate":"63212"
        },
        {
            "name":"동양란",
            "path":"https://flda.co.kr/data/flda/banner/app_index_dong.png",
            "cate":"63166"
        },
        {
            "name":"관엽식물",
            "path":"https://flda.co.kr/data/flda/banner/happy_2.png",
            "cate":"63168"
        },
        {
            "name":"신비디움",
            "path":"https://flda.co.kr/data/flda/banner/app_index_seo.png",
            "cate":"63167"
        }
    ]
    const goDetail = () => {
        navigation.navigate('test')
    }
    const goList = (items) => {
        navigation.navigate('product1', items);
    }

    return<>
    <ScrollView nestedScrollEnabled={true} >
            <View style={{width:deviceWidth, height:deviceHeight*0.2, backgroundColor:'rgb(234,234,234)', justifyContent:'center', flexDirection:'column'}}>
                <View style={{paddingHorizontal:10, width:'100%', height:'80%', flexDirection:'row'}}>
                    
                    <View style={{ width: '70%', height: '100%', justifyContent:'space-between' }}>
                        <Pressable onPress={()=>alert("주소찾기 API 연결 예정")} style={{width:'100%', height:'45%', borderWidth:2, borderColor:'rgb(119,167,73)',justifyContent:'center'}}>
                        {/* <TextInput 
                            keyboardType='default'
                            textContentType='none'
                            placeholder='서울 송파구 석촌호수로 222 (석촌동, J타워)'
                        /> */}
                        <Text style={{fontSize:12, alignSelf:'center', color:'grey'}}>
                            서울 송파구 석촌호수로 222 (석촌동, J타워)
                        </Text>
                        </Pressable>
                        <TextInput style={{width:'100%', height:'45%', borderWidth:2, borderColor:'rgb(119,167,73)', paddingHorizontal:10}}
                            keyboardType='default'
                            textContentType='none'
                            placeholder='상품명 입력 또는 메뉴에서 선택'
                        />
                    </View>
                    <View style={{width:'30%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                        <Pressable onPress={()=>alert("준비중")} style={{ width: deviceHeight * 0.10, height: deviceHeight * 0.10, backgroundColor: 'rgb(119,167,73)', borderRadius: (deviceHeight * 0.1) / 2, justifyContent:'center', alignItems:'center' }}>
                        
                            <Text style={{color:'white', fontWeight:'bold'}}>
                                찾기
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <ScrollView nestedScrollEnabled={true}  horizontal={true} scroll showsHorizontalScrollIndicator={false} style={{backgroundColor:'rgb(119,167,73)'}}>
                <View style={{ height: deviceHeight * 0.08, backgroundColor: 'rgb(119,167,73)', flexDirection: 'row', paddingHorizontal: 10 }}>
                    {cate_main.map((cate, index) => (
                        <Pressable onPress={()=>alert("준비중")} key={index} style={{justifyContent:'center'}}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, paddingHorizontal: 5 }}>{cate.name}</Text>
                        </Pressable>
                ))}
                </View>
            </ScrollView>

            <View style={{width:deviceWidth, height:deviceHeight*0.45, backgroundColor:'rgb(234,234,234)', paddingHorizontal:25, flexDirection:'column', paddingVertical:20}}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>자주 쓰는</Text><Text style={{ fontSize: 20 }}> 상품</Text>
                </View>
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: '100%', width: '100%' }}>
                        {cate_img.map((items, index) => (
                            <Pressable onPress={()=>goList(items)} style={{width:'25%', height:'50%'}} key={index}>
                                <View style={{height:'80%'}}>
                                    <Image source={{uri : items.path}} style={{width:'100%', height:'100%'}}></Image>
                                </View>
                                <Text style={{textAlign:'center', lineHeight:23, fontWeight:'bold'}}>{items.name}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
            <View style={{height:deviceHeight*2}}>

            </View>
        </ScrollView>

    </>
}
export default MainPage