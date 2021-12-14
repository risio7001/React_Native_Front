import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Drop from '../img/dropDownBox.svg'

const Product_More_CS_FAQ = ({navigation}) => {

    const [toggle, setToggle] = React.useState(0);
    const [viewMore, setViewMore] = React.useState(false);

    const Root = () => {
        switch (toggle) {
            case 0:
                return <>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'grey' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginRight: 10, width: D_Height * 0.03, height: D_Height * 0.03, backgroundColor: 'orange', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Q</Text>
                            </View>
                            <Text style={{ fontWeight: 'bold' }}>상품보다 배송지를 먼저 선택하는 이유가 뭔가요?</Text>
                        </View>
        
                        <View style={{ alignSelf: 'center', transform: [{ rotate: viewMore === true ? '180deg' : '0deg' }] }}>
                            <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                        </View>
                    </View>
        
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'grey' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginRight: 10, width: D_Height * 0.03, height: D_Height * 0.03, backgroundColor: 'orange', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Q</Text>
                            </View>
                            <Text>플다에선 왜 무통장입금이 안되나요?</Text>
                        </View>
                        <View style={{ alignSelf: 'center', transform: [{ rotate: viewMore === true ? '180deg' : '0deg' }] }}>
                            <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                        </View>
                    </View>
        
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'grey' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginRight: 10, width: D_Height * 0.03, height: D_Height * 0.03, backgroundColor: 'orange', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Q</Text>
                            </View>
                            <Text>가상계좌 주문을 취소한 경우 환불은 언제되나요?</Text>
                        </View>
                        <View style={{ alignSelf: 'center', transform: [{ rotate: viewMore === true ? '180deg' : '0deg' }] }}>
                            <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                        </View>
                    </View>
        
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'grey' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginRight: 10, width: D_Height * 0.03, height: D_Height * 0.03, backgroundColor: 'orange', borderRadius: (D_Height * 0.08) / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Q</Text>
                            </View>
                            <Text>수주화원에서 수주승인을 안하면 주문은 어떻게 되나요?</Text>
                        </View>
                        <View style={{ alignSelf: 'center', transform: [{ rotate: viewMore === true ? '180deg' : '0deg' }] }}>
                            <LocalSvg asset={Drop} width={15} height={15} fill={"grey"} />
                        </View>
                    </View>
                </>
            case 1:
                return <>
                    <View>
                        <Text>수발주관련</Text>
                    </View>
                </>
            case 2:
                return <>
                    <View>
                        <Text>결제관련</Text>
                    </View>
                </>
            case 3:
                return <>
                    <View>
                        <Text>일반운영관련</Text>
                    </View>
                </>
            case 4:
                return <>
                    <View>
                        <Text>입점관련</Text>
                    </View>
                </>
        }
    }

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>FAQ</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <View style={{flexDirection:'row', flexWrap:'wrap', marginVertical:10}}>
            <Pressable onPress={()=>setToggle(0)} style={[{backgroundColor: toggle === 0 ? 'green' : 'grey'},styles.toggle_box]}>
                <Text style={styles.toggle_text}>전체</Text>
            </Pressable>
            <Pressable onPress={()=>setToggle(1)} style={[{backgroundColor: toggle === 1 ? 'green' : 'grey' ,marginLeft:'0.5%'},styles.toggle_box]}>
                <Text style={styles.toggle_text}>수발주관련</Text>
            </Pressable>
            <Pressable onPress={()=>setToggle(2)} style={[{backgroundColor: toggle === 2 ? 'green' : 'grey' ,marginLeft:'0.5%'},styles.toggle_box]}>
                <Text style={styles.toggle_text}>결제관련</Text>
            </Pressable>
            <Pressable onPress={()=>setToggle(3)} style={[{backgroundColor: toggle === 3 ? 'green' : 'grey' ,marginTop:1},styles.toggle_box]}>
                <Text style={styles.toggle_text}>일반운영관련</Text>
            </Pressable>
            <Pressable onPress={()=>setToggle(4)} style={[{backgroundColor: toggle === 4 ? 'green' : 'grey' ,marginTop:1, marginLeft:'0.5%'},styles.toggle_box]}>
                <Text style={styles.toggle_text}>입점관련</Text>
            </Pressable>
        </View>
        {Root()}
    </>

}

export default Product_More_CS_FAQ;

const styles = StyleSheet.create({
    toggle_text:{
        color:'white',
        fontSize:14,
        alignSelf:'center'
    },
    toggle_box:{
        
        paddingVertical:15 ,
        width:'33%',

    }
})

{/* <View style={{flexDirection:'row', justifyContent:'space-between'}}>
<Pressable style={{width:'33%', backgroundColor:'red'}}>marginLeft:'0.5%'
    <Text>전체</Text>
</Pressable>
<Pressable style={{width:'33%', backgroundColor:'red'}}>
    <Text>전체</Text>
</Pressable>
<Pressable style={{width:'33%', backgroundColor:'red'}}>
    <Text>전체</Text>
</Pressable>
</View>
<View style={{flexDirection:'row', justifyContent:'space-between'}}>
<Pressable style={{width:'33%', backgroundColor:'red'}}>
    <Text>전체</Text>
</Pressable>
<Pressable style={{width:'33%', backgroundColor:'red'}}>
    <Text>전체</Text>
</Pressable>
</View> */}