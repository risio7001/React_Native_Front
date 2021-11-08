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
            Product_Review
        </Text>
    </ScrollView>
    </>
}
export default Product_Review



// url 주소+/goods/list/+cate+'/'+bcode+'/'+sort+'?page='+skip+'&userid='+userid