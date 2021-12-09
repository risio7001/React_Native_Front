import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';

const Product_More_Event = () => {

    const [toggle, setToggle] = React.useState(true);


    const styles = StyleSheet.create({
        toggle_box: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',

        },
        toggle_text: {
            fontSize: 16,
            paddingVertical: 8,

        }
    })

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>이벤트</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'red' }}>
                <Pressable onPress={() => setToggle(true)} style={[styles.toggle_box, { backgroundColor: toggle === true ? 'orange' : "white" }]}>
                    <Text style={[styles.toggle_text, { color: toggle === true ? 'white' : 'grey' }]}>진행중인 이벤트</Text>
                    <Text style={[styles.toggle_text, { color: toggle === true ? 'white' : 'grey' }]}>(0)</Text>
                </Pressable>

                <Pressable onPress={() => setToggle(false)} style={[styles.toggle_box, { backgroundColor: toggle === false ? 'orange' : "white" }]}>
                    <Text style={[styles.toggle_text, { color: toggle === false ? 'white' : 'grey' }]}>종료된 이벤트</Text>
                    <Text style={[styles.toggle_text, { color: toggle === false ? 'white' : 'grey' }]}>(1)</Text>
                </Pressable>
            </View>
            {toggle === true ? 
                        null 
            :
                <View style={{ marginVertical: 10, width: '100%', height: '45%', zIndex: 0 }}>
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>플다 오픈 이벤트!</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'grey' }}>등록일) </Text>
                            <Text style={{ color: 'red' }}>2019-11-04 - 2019-11-30</Text>
                        </View>
                        <Text style={{ color: 'white', fontSize: 24, alignSelf: 'center' }}>종료된이벤트</Text>
                    </View>
                </View>
            }
        </View>

    </>

}

export default Product_More_Event;
