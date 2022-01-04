import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, Text, View, Dimensions, Pressable, FlatList, TextInput, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import Arrow from '../img/arrow.svg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Api from '../config.json';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const Product_Review_Rewrite = ({ navigation }) => {

    const route = useRoute();
    let items = route.params;

    const [review, setReview] = React.useState(items.Content);
    const [starRating, setStarRating] = React.useState(items.ParPoint);
    const [imgPath , setImgPath] = React.useState(items.file);


    const putData = async () =>{    // 수정하기
        let url = `${Api.naviReviewInsert}`
        // console.log(url);
        try{
            const result = await axios({
                method:'post',
                url:url,
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                data:{
                    // infouid:items.OrderinfoUid,
                    infouid:"13812",
                    content:review,
                    userid:"flroad",
                    username:"플로드",
                    parPoint:starRating,
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    const _pickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            setImgPath(result.uri);
        }
        else {
            return alert("취소 되었습니다.");
        }
    };

    return <>

        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>리뷰 수정</Text>
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
                startingValue={items.ParPoint}
                imageSize={16}
                tintColor='rgb(242,242,242)'
                onFinishRating={setStarRating}
            />

            <Text style={{ alignSelf:'center', fontWeight: 'bold' }}>{starRating}</Text>
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>상품평</Text>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 10, height: D_Height * 0.05 }}>
            <TextInput style={{ flex: 5, borderWidth: 1, borderColor: "grey", paddingHorizontal: 8 }}
                placeholder={items.Content}
                onChangeText={setReview}
            />
            {/* <Pressable style={{ flex: 1, backgroundColor: 'rgb(144,176,89)', justifyContent:'center' }}><Text style={{alignSelf:'center'}}>등록</Text></Pressable> */}
        </View>
        <Text/>
        <Pressable onPress={()=>_pickImage()} style={{marginHorizontal:10, justifyContent:'center',width:D_Width*0.2, backgroundColor:'rgb(144,176,89)', height:D_Height*0.05}}><Text style={{alignSelf:'center', color:'white'}}>파일첨부</Text></Pressable>
        <Text/>

        <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Image source={{uri:imgPath}} style={{width:250, height:250}}/>
        </View>
        

        <Pressable onPress={()=>{
            alert('등록되었습니다.');
            putData();
            navigation.goBack()
        }} style={{marginVertical:10, marginHorizontal:10, justifyContent:'center', backgroundColor:'rgb(144,176,89)', height:D_Height*0.05}}><Text style={{alignSelf:'center', color:'white'}}>등록</Text></Pressable>
    </>
}
export default Product_Review_Rewrite