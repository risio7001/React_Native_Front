import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Notice from '../img/noticeMark.svg';

const Product_More_Notice = ({navigation}) => {

    return <>
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                        <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                    </Pressable>
                    <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>공지사항</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            <View style={{flexDirection:'row', marginVertical:10}}>
                <View style={{marginHorizontal:10, justifyContent:'center'}}>
                <LocalSvg asset={Notice} width={25} height={25} fill={"#000000"} />
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold'}}>(주)플로드 공지사항 입니다.</Text>
                    <Text style={{fontWeight:'bold'}}>(주)플로드 에서 전해드리는 소식들을 꼭 읽어주세요.</Text>
                </View>
            </View>
            <View style={{marginHorizontal:10}}>
                <Text style={{fontWeight:'bold'}}>플다 오픈 공지</Text>
                <Text style={{paddingVertical:10, color:'grey'}}>2019.02.08</Text>
            </View>

            <View style={{ backgroundColor: 'rgb(246,246,246)', marginVertical: 10 }}>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text />
                    <Text style={styles.font}>안녕하세요</Text>
                    <Text />
                    <Text style={styles.font}>플라워다이렉트('플다')가 오픈을 앞두고 있습니다.</Text>
                    <Text />
                    <Text style={styles.font_bold}>플다에 대해 간단히 소개를 드리자면, 수발주 화원간 직거래 쇼핑몰이랍니다.</Text>
                    <Text style={styles.font_bold}>발주화원은 전국의 모든 화훼 상품의 가격을 비교해 보고 발주할 수 있고</Text>
                    <Text style={styles.font_bold}>수주화원은 내 상품을 좋은 가격에 '플다'에 올려 놓으면 내 지역으로 발주하는 화원으로 부터 직접 주문을 받을 수 있답니다.</Text>
                    <Text />
                    <Text style={styles.font_bold}>모든 결제는 카드를 통해 이루어지고 발주가 완료되면 카드사에서 수주화원에 바로 판매대금을 입금해주기 때문에 미수가 발생할 수 없습니다.</Text>
                    <Text />
                    <Text style={styles.font}>플로드 웹사이트에 '플다'를 만화로 알기 쉽게 설명해 놓았으니 재밌게 보시다보면 '플다'를 쉽게 이해하실 수 있을 거에요.</Text>
                    <Text style={styles.font}>그리고 컴퓨터를 잘 못하시는 분도 쉽게 이용하실 수 있도록 하단의 '이용안내'에 사용 방법을 준비중에 있답니다.</Text>
                    <Text />
                    <Text style={styles.font}>현재, '플다'는 운영을 위한 모든 준비가 순조롭게 마무리 단계에 있구요</Text>
                    <Text />
                    <Text style={styles.font}>입점신청일과 그랜드오픈일은 추구 공지하겠습니다.</Text>
                    <Text />
                    <Text style={styles.font}>궁금하신 부분이 있으시면 고객센터로 문의 바랍니다.</Text>
                    <Text />
                    <Text style={styles.font}>감사합니다.</Text>
                    <Text />
                </View>
            </View>
        </ScrollView>
    </>

}

export default Product_More_Notice;

const styles = StyleSheet.create({
    font: {
        color: 'grey',

    },
    font_bold: {
        color: 'grey',
        fontWeight: 'bold'
    }
})