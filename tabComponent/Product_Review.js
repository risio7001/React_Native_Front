import * as React from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { ScrollView, Text } from 'react-native';
import { D_Height, D_Width } from '../utils/deviceSize';
import { Rating } from 'react-native-ratings';
import Api from '../config.json';
import { FlatList } from 'react-native-gesture-handler';


const Product_Review = ({ navigation }) => {

    const [toggle, setToggle] = React.useState("myreview");
    const [starValue, setStarValue] = React.useState(5);
    const [isComment, setIsComment] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [list, setList] = React.useState([]);

    const handleToggle = (t) => { //  상단 탭으로 바꿧을 경우 
        setList([]);
        setToggle(t);
        setPage(1);
    }

    const _getData = () => {    // 리스트 가져오기
        let url = `${Api.naviReviewList}${toggle}/?page=${page}&userid=flroad`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if (list.length === 0 || ((page - 1) * 10) / list.length === 1) {
                    setList([...list, ...res.data]);
                    setPage(page + 1);
                }
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        _getData();
    }, [toggle]);

    const _delData = (uid) => { // 삭제
        // let url = `${Api.naviReviewDel}${uid}`
        let url = `${Api.naviReviewDel}1` // 테스트용
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            alert('삭제완료');
        })
        .catch(err=>console.log(err));
    }

    

    const RenderItem = ({ items }) => {
        return <>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text>내점수</Text>
                    <Rating
                        type='star'
                        ratingCount={5}
                        startingValue={items.ParPoint}
                        imageSize={16}
                        tintColor='rgb(242,242,242)'
                        readonly={true}
                    />
                </View>
                <Text>{items.RegDate}</Text>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'grey', paddingTop: 10 }}>{items.Content}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'grey', paddingTop: 2, flex: 1 }}>수주화원</Text><Text style={{ flex: 5 }}>(주)플로드</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'grey', paddingTop: 2, flex: 1, letterSpacing: 5 }}>상품명</Text><Text style={{ flex: 5 }}>{items.GoodsTitle}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'grey', paddingTop: 2, flex: 1, letterSpacing: 5 }}>배송지</Text><Text style={{ flex: 5 }}>{items.rcvaddr} {items.rcvaddrdetail}</Text>
                </View>
                <Text />
                {/* 여기 분기점 */}
                {toggle === "myreview" ?
                    <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Pressable onPress={() => Alert.alert("알림", "수정하시겠습니까?", [{ text: "취소" }, { text: "확인", onPress: () => navigation.navigate("ReviewRewrite", items) }])} style={{ backgroundColor: 'rgb(178,171,154)', paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}><Text style={{ color: 'white' }}>수정</Text></Pressable>
                            <Pressable onPress={() => Alert.alert("알림", "삭제하시겠습니까?", [{ text: "취소" }, { text: "확인", onPress: () => _delData(items.Uid) }])} style={{ backgroundColor: 'rgb(178,171,154)', paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}><Text style={{ color: 'white' }}>삭제</Text></Pressable>
                        </View>
                        {items.AContent === null ?
                    null
                    :
                    <View style={{ backgroundColor: 'rgb(229,229,229) ', paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10 }}>
                        <Text style={{ fontSize: 12 }}>(주)플로드</Text>
                        <Text style={{ fontSize: 12 }}>{items.AContent}</Text>
                    </View>
                    }

                    </View>
                    :
                    <View>
                        {isComment ?
                            <View style={{ backgroundColor: 'rgb(229,229,229) ', paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ fontSize: 12 }}>(주)플로드</Text>
                                    <Text style={{ fontSize: 12 }}>test</Text>
                                </View>
                                <Text
                                    onPress={() => navigation.navigate("ReviewRewrite")}
                                    style={{ backgroundColor: 'rgb(178,171,154)', color: 'white', alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 10, marginHorizontal: 10 }}>
                                    수정
                                </Text>
                            </View>
                            :
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Pressable
                                    onPress={() => navigation.navigate("ReviewRewrite")}
                                    style={{ backgroundColor: 'rgb(178,171,154)', paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 5 }}><Text style={{ color: 'white' }}>
                                        댓글 달기
                                    </Text>
                                </Pressable>
                            </View>
                        }
                    </View>
                }

            </View>

        </>
    }
    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    {/* <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} /> */}
                </View>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>리뷰관리</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>

        <View style={{ width: D_Width, height: D_Height * 0.06, backgroundColor: 'black' }}>
            <View style={{ marginHorizontal: 10, flexDirection: 'row', height: '100%' }}>
                <Pressable onPress={() => handleToggle("myreview")} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === "myreview" ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center', fontWeight: toggle === 1 ? "bold" : "normal", color: toggle === 1 ? "white" : 'grey' }}>내가 쓴 리뷰</Text></Pressable>
                <Pressable onPress={() => handleToggle("csreview")} style={{ justifyContent: 'center', flex: 1, borderBottomWidth: 5, borderColor: toggle === "csreview" ? 'rgb(144,176,89)' : "black" }}><Text style={{ alignSelf: 'center', fontWeight: toggle === 2 ? "bold" : "normal", color: toggle === 2 ? "white" : 'grey' }}>고객리뷰</Text></Pressable>
            </View>
        </View>

        <View style={{ marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgb(76,186,181)' }}>{list.length}</Text>
                        <Text style={{ fontWeight: 'bold' }}> 개의 리뷰가 있습니다.</Text>
                    </View>
                </View>
            </View>
        </View>

        {toggle === 'myreview' && list.length === 0 && (
            <View>
                <Text style={styles.text_none_data}>주문내역이 없습니다.</Text>
            </View>
        )}
        {toggle === 'csreview' && list.length === 0 && (
            <View>
                <Text style={styles.text_none_data}>리뷰내역이 없습니다.</Text>
            </View>
        )}

        <FlatList
        style={{paddingHorizontal:20}}
            data={list}         //  컴포넌트에 들어갈 데이터
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <RenderItem items={item} />}   // 반복시켜 보여줄 컴포넌트
            onEndReached={() => {
                _getData();
            }} //  스크롤의 마지막에 닿았을 때 이벤트
        />

    </>
}
export default Product_Review


const styles = StyleSheet.create({
    text_none_data: {
        fontSize: 16,
        alignSelf: 'center',
        marginVertical: 10
    }
})