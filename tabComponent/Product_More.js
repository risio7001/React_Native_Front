import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScrollView, Text } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Width, D_Height } from '../utils/deviceSize';

const Product_More = ({navigation}) => {

    const goNavi = (title) =>{
        navigation.navigate(title);
    }

    return <>
        <ScrollView>

            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable style={{ flex: 1 }}>
                        {/* <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} /> */}
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>더보기</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>

            <Pressable style={styles.box}
                onPress={()=>goNavi("deposit")}
            >
                <Text style={styles.box_text}>플로드 충전금 관리</Text>
            </Pressable>

            <Pressable style={styles.box}
                onPress={()=>goNavi("words")}
            >
                <Text style={styles.box_text}>리본문구관리</Text>
            </Pressable>

            <Pressable style={styles.box}
                onPress={()=>goNavi("notice")}
            >
                <Text style={styles.box_text}>공지사항</Text>
            </Pressable>

            <Pressable style={styles.box}
                onPress={()=>goNavi("event")}
            >
                <Text style={styles.box_text}>이벤트</Text>
            </Pressable>

            <Pressable style={styles.box}
                onPress={()=>goNavi("cs")}
            >
                <Text style={styles.box_text}>고객센터</Text>
            </Pressable>

            <Pressable style={styles.box}
                onPress={()=>goNavi("member")}
            >
                <Text style={styles.box_text}>계정설정</Text>
            </Pressable>

            <Pressable style={styles.box}
                onPress={()=>{
                    alert("로그아웃되었습니다.")
                    goNavi("login");
                }}
            >
                <Text style={styles.box_text}>로그아웃</Text>
            </Pressable>
        </ScrollView>
    </>
}
export default Product_More

const styles = StyleSheet.create({
    box:{
        borderBottomWidth:1,
        borderColor:'grey'
    },
    box_text:{
        flex:1,
        paddingVertical:20,
        alignSelf:'center',
        fontWeight:'bold',
        color:'grey'
    }
})
    