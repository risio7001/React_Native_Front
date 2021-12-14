import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const openNotice = ()=> {
    return<>
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
    </>
}
export const FAQ = [
    {
        "question":"상품보다 배송지를 먼저 선택하는 이유가 뭔가요?",
        "answer":"배송지를 선택한 후 상품을 선택하시면 선택하신 배송지로 배송이 가능한 도매의 상품이 가격순으로 표시됩니다. 내가 보낼 지역의 상품만 추려서 비교해 볼 수 있기 때문에 더욱 편리하게 발주하실 수 있답니다."
    },
    {
        "question":"플다에선 왜 무통장입금이 안되나요?",
        "answer":"플다는 그동안 체인점들의 고질적인 문제였던 미수를 없애고 거래안정성을 확보하기 위해, 발주화원이 결제하면 결제대금이 카드사에 입금된 후 카드사에서 직접 수주화원으로 송금하고 있습니다. 아직까지 은행에서 직접 송금하기 위해선 카드결제, 페이코 간편결제, 가상계좌결제만 가능한데요 플다에선 꽃집들이 발주할 때 더욱 편리하게 발주 하실 수 있도록 다양한 간편 결제 옵션을 준비하고 있답니다.^^*"
    },
    {
        "question":"플다에선 왜 무통장입금이 안되나요?",
        "answer":"가상계좌로 입금하시게 되면 금액은 카드결제와 마찬가지로 5일 후에 정산 입금됩니다. 카드결제의 경우 결제를 완료해도 은행에 결제대금이 입금되지 않은 상태이기 때문에 즉시 취소가 되지만 가상계좌의 경우엔 결제 후 바로 은행에 입금되기 때문에 취소한 후 환불은 5 영업일이 소요됩니다."
    },
    {
        "question":"플다에선 왜 무통장입금이 안되나요?",
        "answer":"수주한 화원은 수주관리 메뉴의 처리중 화면에서 승인 또는 거부를 해야합니다. 수주화원에서 승인 또는 거부를 하지 않으면, 발주 시간 기준으로 20분 후 자동으로 주문이 취소 됩니다."
    },
]

const styles = StyleSheet.create({
    font: {
        color: 'grey',

    },
    font_bold: {
        color: 'grey',
        fontWeight: 'bold'
    }
})