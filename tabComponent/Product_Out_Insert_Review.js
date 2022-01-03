import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, Text, View, Dimensions, Pressable, FlatList, TextInput } from 'react-native';
import { Rating } from 'react-native-ratings';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import Arrow from '../img/arrow.svg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Api from '../config.json';
import axios from 'axios';

const Product_Out_Insert_Review = ({ navigation }) => {

    const [review, setReview] = React.useState(null);
    const [starRating, setStarRating] = React.useState(0);

    const route = useRoute();
    let ruid = route.params
    
    React.useEffect(()=>{
        const _getData = async () => {
            let url = `${Api.naviReview}${ruid}`
            fetch(url)
            .then(res=>res.json())
            .then(res=>{
                if(res === null){

                }
                else{
                    setReview(res.content);
                    setStarRating(res.ParPoint);
                }
            })
            .catch(err=>console.log(err))
        }
        _getData();
    },[]);
    
    const handlReview = async () =>{
        try{
            const result = await axios({
                method:'post',
                url:"http://localhost:5000/sun/sun/order/review/insert",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data:{
                    'infouid':ruid,
                    'content':review,
                    'userid':'flroad',  // 수정필요 전역관리
                    'username':'플로드',    //수정필요 전역관리 
                    'parPoint':starRating
                }
            })

        }catch(err){
            console.log(err);
        }
        
    }
    

    return <>
        
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>리뷰 남기기</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>

        <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection:'row' }}>
            <Text style={{ fontWeight: 'bold' }}>전체 이용자 평점{"   "}</Text>
            <Rating
                type='star'
                ratingCount={5}
                startingValue={5}
                imageSize={16}
                tintColor='rgb(242,242,242)'
                readonly={true}
            />
            <Text style={{fontSize:20, lineHeight:20, paddingHorizontal:5, fontWeight:'bold'}}>0</Text>
            <Text style={{color:'grey'}}>참여 0 명</Text>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', marginHorizontal: 10, width:D_Width*0.5, height: D_Height * 0.05, borderWidth: 1, borderColor:'grey' }}>
            <View  style={{borderRightWidth:1,paddingHorizontal:10, borderColor:'black', justifyContent:'center', borderColor:'grey'}}>
            <Text style={{alignSelf:'center'}}>평가하기</Text>
            </View>
            <Rating
                style={{alignSelf:'center', paddingHorizontal:10}}
                type='star'
                ratingCount={5}
                startingValue={starRating}
                imageSize={16}
                tintColor='rgb(242,242,242)'
                onFinishRating={setStarRating}
            />
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>상품평</Text>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10, height: D_Height * 0.05 }}>
            <TextInput style={{ flex: 5, borderWidth: 1, borderColor: "grey", paddingHorizontal: 8 }}
                placeholder={review ? review : '최대 한글 200자까지 가능합니다.'}
                onChangeText={setReview}
            />
            {/* <Pressable style={{ flex: 1, backgroundColor: 'rgb(144,176,89)', justifyContent:'center' }}><Text style={{alignSelf:'center'}}>등록</Text></Pressable> */}
        </View>
        <Text/>
        <Pressable onPress={()=>alert("파일첨부 expo <-> cli 모듈 다름으로 미구현")} style={{marginHorizontal:10, justifyContent:'center',width:D_Width*0.2, backgroundColor:'rgb(144,176,89)', height:D_Height*0.05}}><Text style={{alignSelf:'center', color:'white'}}>파일첨부</Text></Pressable>
        <Text/>

        <Pressable onPress={() => {
            alert('등록완료')
            handlReview();
            // navigation.goBack();
        }} style={{ marginHorizontal: 10, justifyContent: 'center', backgroundColor: 'rgb(144,176,89)', height: D_Height * 0.05 }}><Text style={{ alignSelf: 'center', color: 'white' }}>
                {review === null ? "등록" : "수정" }
            </Text>
        </Pressable>
    </>
}
export default Product_Out_Insert_Review