import * as React from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';

const MainPage = () =>{
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

    return<>
    <ScrollView>
            <View style={{width:deviceWidth, height:deviceHeight*0.2, backgroundColor:'rgb(234,234,234)', justifyContent:'center', flexDirection:'column'}}>
                <View style={{paddingHorizontal:10, width:'100%', height:'80%', flexDirection:'row'}}>
                    
                    <View style={{ width: '70%', height: '100%', justifyContent:'space-between' }}>
                        <View style={{ width:'100%', height:'45%', borderWidth:2, borderColor:'rgb(119,167,73)'}}>
 
                        </View>
                        <View style={{ width:'100%', height:'45%', borderWidth:2, borderColor:'rgb(119,167,73)'}}>

                        </View>
                    </View>
                    <View style={{width:'30%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                        <Pressable onPress={()=>alert("준비중")} style={{ width: deviceHeight * 0.10, height: deviceHeight * 0.10, backgroundColor: 'rgb(119,167,73)', borderRadius: (deviceHeight * 0.1) / 2, justifyContent:'center', alignItems:'center' }}>
                        
                            <Text style={{color:'white'}}>
                                찾기
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <ScrollView nestedScrollEnabled={true} horizontal={true}style={{width:deviceWidth*2, height:deviceHeight*0.08, backgroundColor:'red'}}>
                
                <Text style={{}}>
                    {cate_main.map((cate, index) =>(
                        <Text style={{color:'white', fontWeight:'bold'}} key={index}>    {cate.name}</Text>
                    ))}
                </Text>
                
            </ScrollView>
            {/* <View style={{horizontal:true, width:'fitContents', height:deviceHeight*0.08, backgroundColor:'rgb(119,167,73)', justifyContent:'center', alignItems:'center'}}>
                
            </View> */}

            <View style={{width:deviceWidth, height:deviceHeight*0.45, backgroundColor:'rgb(234,234,234)', paddingHorizontal:25, flexDirection:'column', paddingVertical:20}}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>자주 쓰는</Text><Text style={{ fontSize: 20 }}> 상품</Text>
                </View>
                <View style={{backgroundColor:'red', width:'100%', height:'100%'}}>

                </View>
            </View>
            
            <View style={{width:deviceWidth, height:deviceHeight*2}}>

            </View>
            </ScrollView>

    </>
}
export default MainPage