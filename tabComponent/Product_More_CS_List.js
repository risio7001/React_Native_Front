import * as React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import LocalSvg from 'react-native-svg/src/LocalSvg';
import { D_Height, D_Width } from '../utils/deviceSize';
import Arrow from '../img/arrow.svg';
import Notice from '../img/noticeMark.svg';
import Down from '../img/dropDownBox.svg';
import { useIsFocused } from '@react-navigation/native';

const Product_More_CS_List = ({ navigation }) => {

    const [viewMore, setViewMore] = React.useState(false);
    const [list, setList] = React.useState();
    const [siteid, setSiteid] = React.useState('flda');
    const [userid, setUserid] = React.useState('flroad');
    const [reLoad, setReLoad] = React.useState(false);
    const isFocused = useIsFocused();

    React.useEffect(()=>{
        alert("현재 화면은 테스트용 db 사용중입니다.");
    },[]);
    
    React.useEffect(() => {
        dbConn();
    }, [isFocused, reLoad]);

    const dbConn = () => {
        try {
            // get 방식으로 리스트를 가져온다. 필요 (siteID, userId)
            let url = `http://localhost:5000/sun/sun/cscenter/list/${siteid}/${userid}`;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setList(res.data);
                    console.log(res.data[0].RegDate);
                })
                .catch(err => console.log(err))

        }
        catch (err) {
            console.log(err);
        }
    }

    const delCS = async (num) => {
        try{
            let url = `http://localhost:5000/sun/sun/delCS/${num}`
            fetch(url)
            .then(res=>res.json())
            .then(res=>{
                alert("삭제되었습니다.");
                setReLoad(!reLoad);
            })
            .catch(err=>console.log(err));
        }
        catch(err){
            console.log(err);
        }
    }
    const RenderItem = ({ items }) => {
        return <>
            {/* {items.map((item, index) => ( */}
            <View style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white', marginVertical: 10 }}>
                <Pressable onPress={() => {
                    if(viewMore === items.Uid){
                        setViewMore(null);
                    }
                    else{
                        setViewMore(items.Uid)
                    }
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            {items.answer === null ?
                                <View>
                                    <Text style={{ alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 10, color: 'white', fontSize: 12, backgroundColor: 'green' }}>처리중</Text>
                                </View>
                                :
                                <View>
                                    <Text style={{ alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 10, color: 'white', fontSize: 12, backgroundColor: 'blue' }}>완료</Text>
                                </View>
                            }
                            <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                                <Text style={{ paddingVertical: 3, fontSize: 16, fontWeight: 'bold' }}>{items.Subject}</Text>
                                <Text />
                                <Text>{items.RegDate.substr(0,10)}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', transform: [{ rotate: viewMore === true ? '180deg' : "0deg" }] }}>
                            <LocalSvg asset={Down} width={15} height={15} fill={'grey'} />
                        </View>
                    </View>
                    {viewMore === items.Uid ?

                        <View style={{ marginVertical: 5, paddingVertical: 5, paddingHorizontal: 10 }}>
                            <Text>
                                {items.Content}
                            </Text>
                            {items.answer === null ?
                                <View>
                                    <Text />
                                    <Text>아직 답변이 작성되지 않았습니다.</Text>
                                </View>

                            :
                                <Text>{items.answer.map((item, index)=>(
                                    <View key={index}>
                                        <Text/>
                                        <Text style={{color:'blue', fontSize:16, fontWeight:'bold'}}>답변</Text>
                                        <Text/>
                                        <Text>{item.Content}</Text>
                                        <Text/>
                                        <Text style={{alignSelf:'flex-end'}}>{item.RegDate.substr(0,10)}</Text>
                                    </View>
                                ))}</Text>
                            }
                        </View>
                        :
                        null
                    }
                </Pressable>
                {items.answer === null ?
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text onPress={() => navigation.navigate('csModify', items)} style={{ color: 'white', paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'orange', marginHorizontal: 10 }}>수정</Text>
                        <Text onPress={() => delCS(items.Uid)} style={{ color: 'white', paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'grey' }}>삭제</Text>
                    </View>
                    :
                    null
                }
            </View>
            {/* ))} */}

        </>
    }

    return <>
        <View style={{ width: D_Width, height: (D_Height * 0.08), backgroundColor: "black", flexDirection: "row", justifyContent: "center" }}>
            <View style={{ width: (D_Width * 0.95), height: '100%', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, transform: [{ rotate: '180deg' }], justifyContent: 'center' }}>
                    <LocalSvg asset={Arrow} width={25} height={25} fill={"#ffffff"} />
                </Pressable>
                <View style={{ flex: 10, flexDirection: "column", justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: "white" }}>1:1문의하기</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingVertical: 10 }}>
            <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>
                <LocalSvg asset={Notice} width={25} height={25} fill={"#000000"} />
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 13 }}>플다 이용시, 궁금하신 내용이 있다면</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 13 }}>1:1 문의하기를 이용해 주세요.</Text>
            </View>
        </View>
        <FlatList
            data={list}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <RenderItem items={item} />}
            // onEndReached={dbConn()}
        />
        {/* 플랫리스트 start */}
        {/* <View style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white', marginVertical: 10 }}>
            <Pressable onPress={() => setViewMore(!viewMore)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ alignSelf: 'center', paddingVertical: 5, paddingHorizontal: 10, color: 'white', fontSize: 12, backgroundColor: 'green' }}>처리중</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                            <Text style={{ paddingVertical: 3, fontSize: 16, fontWeight: 'bold' }}>테스트</Text>
                            <Text />
                            <Text>2021-10-12</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', transform: [{ rotate: viewMore === true ? '180deg' : "0deg" }] }}>
                        <LocalSvg asset={Down} width={15} height={15} fill={'grey'} />
                    </View>
                </View>
                {viewMore === true ?

                    <View style={{ marginVertical: 5, paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Text>
                            내용이 들어갈곳
                            내용이 들어갈곳
                            내용이 들어갈곳
                            내용이 들어갈곳
                            내용이 들어갈곳
                        </Text>
                    </View>
                    :
                    null
                }
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text onPress={() => navigation.navigate('csModify')} style={{ color: 'white', paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'orange', marginHorizontal: 10 }}>수정</Text>
                <Text onPress={() => alert('삭제')} style={{ color: 'white', paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'grey' }}>삭제</Text>
            </View>
        </View> */}
        {/* 플랫리스트 end */}
        <Pressable onPress={() => navigation.navigate('csWrite')} style={{ borderRadius: 5, paddingVertical: 10, width: D_Width * 0.9, backgroundColor: 'grey', alignSelf: 'center' }}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }}>글쓰기</Text>
        </Pressable>
    </>

}

export default Product_More_CS_List;