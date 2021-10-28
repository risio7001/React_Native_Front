import * as React from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import db from '../config.json';

const Product_Review = () => {

    const [data, setData] = React.useState();

    const getData = (event) => {
        var listsort = 'ASC'
        var cate = 63162;
        var adcode = 1130510200;
        var skip = 1;
        var userid = 'flroad';

        if(event){
            console.log(event);
            var listsort = event;
            return fetch(`${db.db}${cate}/${adcode}/${listsort}?page=${skip}&userid=${userid}`,{
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            .then((response)=>response.json())
            .then((json)=>{
                console.log('Success');
                console.log(JSON.stringify(json));
                setData(json.recordsets[0])
                // console.log(data);
                return json;
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        else{
            return fetch(`${db.db}${cate}/${adcode}/${listsort}?page=${skip}&userid=${userid}`,{
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            .then((response)=>response.json())
            .then((json)=>{
                console.log('Success');
                console.log(JSON.stringify(json));
                setData(json.recordsets[0])
                // console.log(data);
                return json;
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        

        
    }
    
    return<>
        <ScrollView>
            <Text>
                테스트용 화면 입니다.
            </Text>
            <Pressable onPress={()=>getData()} style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height*0.1, borderWidth:1}}>
                <Text>
                    push
                </Text>
            </Pressable>
            <Pressable onPress={()=>getData('fav')} style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height*0.1, borderWidth:1}}>
                <Text>
                    push22
                </Text>
            </Pressable>
            <View>
                <Text>
                    {
                        data === undefined ? '' : 
                        data.map((items, index) => (
                            <Text key={index}>
                                {items.Title}{"\n"}
                            </Text>
                        ))
                    }
                </Text>
            </View>

        </ScrollView>
    </>
}
export default Product_Review



// url 주소+/goods/list/+cate+'/'+bcode+'/'+sort+'?page='+skip+'&userid='+userid