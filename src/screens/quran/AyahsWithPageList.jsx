import React, { useEffect, useRef, useState } from "react";
import { FlatList, View, Dimensions,TouchableWithoutFeedback,ScrollView,StyleSheet ,Animated} from "react-native";
import Constants from "expo-constants";
import { Button, Icon, Text,Spinner } from "native-base";

import { LinearGradient } from "expo-linear-gradient";
import {
  SurahNameContiner,
  SurahNameContiner2,
  NumberWrapper,
  LeftArrowIOS,
  NumberWrapper2,
  RightArrowIOS,
} from "../../assets/icons/";
import AyahPlayer from "./PagePlayer";
import * as Animatable from "react-native-animatable";

const AnimatedScrollView = Animated.createAnimatedComponent(FlatList);
import quran from "../../store/quranByPages.js";
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
let name=-1;

const RenderAyah = React.memo(({theme,item,font,name,juz,isSelected,stopRead,pageLength,isPlaying,isScrolled})=>{
	const dispatch = useDispatch();
	 return <React.Fragment>
        <TouchableWithoutFeedback opacityactive={.8}  onPress={()=>{
        	dispatch({type:'SET_FOREGROUND',payload:{...item,name,juz,pageLength,stopRead}})
        	}}>
        <Animatable.View duration={1500} animation={isScrolled && !isSelected && !isPlaying ? {
          from:{
            backgroundColor:theme.ACCENT,
          },
          to:{
            backgroundColor:'transparent',
          }
        }:null}  style={{
              	flexSelf:'flex-end',
              	flexDirection:'row-reverse',
                paddingHorizontal:10,
                alignItems:'center',
                justifyContent:'flex-end',
                backgroundColor:isSelected ? theme.ACCENT:isPlaying?theme.ACTIVE: 'transparent',
                zindex:isSelected ? 111 : 0
              }}>
              <Text
                style={{
                  textAlign: "right",
                  fontFamily: font.quran.fontName,
                  fontSize: 21,
                  lineHeight:33,
                  color:theme.color
                }}
              >
                {item.text}
                <Text style={{
                 	textAlign: "right",
                  fontFamily: 'kufy',
                  fontSize: 18,
                  lineHeight:33,
                  color:theme.PRIMARY,
                  letterSpacing:1.5
                 }}>
               ({item.numberInSurah})
              </Text>
              </Text>           
              </Animatable.View>
              </TouchableWithoutFeedback>
              </React.Fragment>
});

 
let counter;
const HEADER_HEIGHT = 44 + Constants.statusBarHeight;

let _previousScrollvalue,_currentScrollValue,_scrollEndTimer;
const AyahsWithPageList = ({ theme, scrollTo=0,name,number,numberInPage,page ,font,goBack}) => {
  const flatListRef = useRef(null);
  const quranPage = useSelector((state) => state.quranPage);
  const dispatch = useDispatch();
  const currentAyah = useSelector((state) => state.currentAyah);
  const foregroundAyah = useSelector(state=>state.foregroundAyah);
  const stop = useSelector((state) => state.stop);
   const [scrollAnim,setScrollAnim] = useState(new Animated.Value(0))
  const [offsetAnim,setOffsetAnim] = useState(new Animated.Value(0));
  let arr=[]
       useEffect(() => {
    if (currentAyah.numberInSurah && quranPage.ayahs && currentAyah.page === quranPage.page) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentAyah.numberInPage,
      });
   }
  }, [currentAyah.numberInPage]);
      useEffect(() => {
       if (quranPage.page && quranPage.ayahs.length && flatListRef &&flatListRef.current){
          	name=quranPage.firstSurahName;
             flatListRef.current.scrollToIndex({
               animated: quranPage.change ? false :true,
               index:quranPage.change ? 0 :scrollTo,
             });}
  }, [quranPage.page]);
       
  useEffect(()=>{
  	scrollAnim.addListener(_handleScroll);
    return ()=> {
    	scrollAnim.removeListener(_handleScroll);
    	dispatch({
         	type:'PAGE_BACK'
         })}

  },[])
 
   

  const _handleScroll = ({ value }) => {
    _previousScrollvalue = _currentScrollValue;
    _currentScrollValue = value;
  };

  const _handleScrollEndDrag = () => {
     _scrollEndTimer = setTimeout(_handleMomentumScrollEnd, 250);
  };

 const  _handleMomentumScrollBegin = () => {
    clearTimeout(_scrollEndTimer);
  };

  const _handleMomentumScrollEnd = () => {
    const previous =_previousScrollvalue;
    const current = _currentScrollValue;

    if (previous > current || current < HEADER_HEIGHT) {
      // User scrolled down or scroll amount was too less, lets snap back our header
      Animated.spring(offsetAnim, {
        toValue: -current,
        tension: 300,
        friction: 35,
      }).start();
    } else {
      Animated.timing(offsetAnim, {
        toValue: 0,
        duration: 500,
      }).start();
    }
  };
  const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp',
    });


   if (!quranPage || !quranPage.page) {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Spinner color={theme.PRIMARY} />
      </View>
    );
  } 
  return (
    <View style={{ flex: 1}}>
    <FlatList
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y:scrollAnim } } },
          ])}
          onMomentumScrollBegin={_handleMomentumScrollBegin}
          onMomentumScrollEnd={_handleMomentumScrollEnd}
          onScrollEndDrag={_handleScrollEndDrag}
          contentContainerStyle={{
          borderColor: theme.PRIMARY,
          borderRadius: 10,
          overflow: "hidden",       
          borderWidth:5,
          alignItems:'flex-end',

        }}
        ref={flatListRef}
        data={quranPage.ayahs}
        keyExtractor={(item) => (item.text ? item.text+item.number : item.name)}
        renderItem={({ item }) => {
           
          if (!item.text) {
            name= item.name;
            return (
              <View
                style={{
                  marginBottom: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  width:width-14
                }}
              >
                <View style={{
                  justifyContent: "center",
                  alignItems: "center",
                  
                }}>
                  <SurahNameContiner  width={width-30} primary={theme.PRIMARY} accent={theme.ACCENT} />
                </View>
                <View
                  style={{
                    position: "absolute",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color:theme.color,
                      fontFamily: font.quran.fontName,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
            );
          } else
            return (
              <RenderAyah font={font} juz={quranPage.juz} number={item.number} stopRead={
                stop && stop.numberInQuran && item.number === stop.numberInQuran
              } isPlaying={currentAyah.number === item.number}  isScrolled={!quranPage.change && scrollTo === item.numberInPage}  pageLength={quranPage.ayahs.length} name={name} isSelected={item.number === foregroundAyah.number} theme={theme} item={item} />
            );
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View
            style={{
             width:(width-10),
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 5,
              borderBottomWidth: 2,
              borderColor: theme.PRIMARY,
              backgroundColor: theme.PRIMARY,
              paddingVertical: 10,
              marginBottom:8,
              paddingTop:HEADER_HEIGHT+10,
             
               
            }}
          >
            <View style={{ flex: 0.4 }}>
              <Text
                style={{
                  fontFamily: font.quran.fontName,
                  fontSize: 17,
                  color: "#fff",
                  textAlign:'left'

                }}
              >
                جزء {quranPage.juz}
              </Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Text
                style={{
                  fontFamily:font.quran.fontName,
                  fontSize: 17,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {quranPage.page}
              </Text>
            </View>
            <View style={{ flex: 0.4 }}>
              <Text
                style={{
                  fontFamily: font.quran.fontName,
                  fontSize: 17,
                  textAlign: "right",
                  color: "#fff",
                }}
              >
                {quranPage.firstSurahName}
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <View
            style={{
              width:(width-10),
              paddingHorizontal: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopWidth: 2,
              borderColor: theme.PRIMARY,
              backgroundColor: theme.PRIMARY,
              paddingVertical: 5,
              marginTop:8,
            }}
          >
            <Button
              onPress={() => {
                counter++;
                dispatch({
                  type: "CHANGE_PAGE",
                  payload: 1,
                });
              }}
              transparent
            >
              <LeftArrowIOS color={"#fff"} size={24} />
              <Text
                style={{
                  textAlign: "right",
                  fontFamily: font.quran.fontName,
                  fontSize: 18,
                  color: "#fff",
                }}
              >
                التالي
              </Text>
            </Button>
            <Button
              onPress={() => {
                dispatch({
                  type: "CHANGE_PAGE",
                  payload: -1,
                });
              }}
              transparent
            >
              <Text
                style={{
                  textAlign: "right",
                  fontFamily: font.quran.fontName,
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                السابق
              </Text>
              <RightArrowIOS color={"#fff"} size={24} />
            </Button>
          </View>
        }
        onScrollToIndexFailed={(error) => {
          flatListRef.current.scrollToOffset({
            offset: error.averageItemLength * error.index,
            animated: true,
          });
          setTimeout(() => {
            if (flatListRef.current !== null) {
              flatListRef.current.scrollToIndex({
                index: error.index,
                animated: true,
              });
            }
          }, 100);
        }}
      />
      <Animated.View style={[{ 
    height: HEADER_HEIGHT,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:5,
    flexDirection:'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.PRIMARY}, { transform: [{ translateY }] }]}>
          <Button style={{flex:10/3 * .1}} transparent onPress={goBack}>
          <LeftArrowIOS size={24} color={theme.BG} />
          </Button>
          <View style={{flex:10/3 * .1}}>
          <Text style={{
              color:theme.BG,
              textAlign:'center'
          }}>{quranPage.page === page ? name : quranPage.firstSurahName}</Text>
          </View>
          <View style={{flex:10/3 * .1}} />
        </Animated.View>
    </View>
  );
};

const PageContainer = ({page,number,scrollTo,name,numberInPage,theme,goBack,font})=>{
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GO_PAGE", payload: page-1 });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1}}>
        <AyahsWithPageList font={font}  scrollTo={scrollTo} page={page} goBack={goBack} name={name} numberInPage={numberInPage} theme={theme} />
      </View>
      <AyahPlayer font={font} theme={theme} />
    </View>
  );
} 
export default PageContainer;
//           <NumberWrapper size={30} color={'#02733E'} />
/*
const RenderHeader = ({item})=>{
     return <Text>
     {"\n"}<Text style={{
                      fontSize: 30,
                      color:theme.color,
                      fontFamily: font.quran.fontName,
                      textAlign:'center',
                      color:theme.PRIMARY
                    }}
                  >
                    {item.name}
                  </Text>
             {"\n"}
             </Text>
}
const TextComponent=({item,font,theme,isSelected,isPlaying,juz,pageLength,stopRead,name})=>{
  const dispatch= useDispatch();
  return <Text 
  style={{ 
    textAlign:'right',  marginLeft:5,
    fontSize:22,
    fontFamily:'hfs',
    backgroundColor:isSelected ? theme.ACCENT:isPlaying?theme.ACTIVE: 'transparent',
   }} 
   onPress={()=>{
          dispatch({type:'SET_FOREGROUND',payload:{...item,name,juz,pageLength,stopRead}})
          }}
           onLayout={({nativeEvent: {layout: {x, y, width, height}}}) => {
                // const layout = event.nativeEvent.layout;
                // arr[item.numberInPage] = layout.y;
                console.log('height2:', height);
                console.log('width:', width);
                console.log('x:', x);
                console.log('y:', y);
              }}
          >
<Text 
  style={{
    textAlign: "center",
     fontFamily: font.quran.fontName,
                  fontSize: 25,
                  lineHeight:45,
                  writingDirection:'rtl',
                  color:theme.color
  }}
   >
    {item.text}
   </Text>
<Text style={{
   fontSize: 16,
   lineHeight:45,
   letterSpacing:2,
   color:theme.PRIMARY
}}>({item.numberInSurah})</Text>
  </Text>
}

   const renderPage = ()=>{
        return quranPage.ayahs.map(item=> item.name ?<RenderHeader item={item} key={ item.name} /> 
          :<TextComponent  key={item.number} font={font} juz={quranPage.juz} number={item.number} stopRead={
                stop && stop.numberInQuran && item.number === stop.numberInQuran
              } isPlaying={currentAyah.number === item.number}  isScrolled={!quranPage.change && scrollTo === item.numberInPage}  pageLength={quranPage.ayahs.length} name={name} isSelected={item.number === foregroundAyah.number} theme={theme} item={item} />)
      }

      const TextComponent=({text})=>{
	const [isSelected,setIsSelected] = useState(false)
	return <Text
	onPress={()=>setIsSelected(e=>!e)}
  style={{ 
  	textAlign:'right',  marginLeft:5,
    fontSize:22,
   fontFamily:'hfs',
   backgroundColor:isSelected ? 'red' : 'transparent'

}}><Text 
	style={{
		fontSize:22,
        fontFamily:'cairo',
        lineHeight:45,
        textAlign:'right'
	}}
	 >
        {text} 
	 </Text>
	<Text style={{lineHeight:50,alignItems:'center',justifyContent:'center'}}><NumberWrapper size={35} color={'#02733E'} /></Text>
	</Text>
}
const RenderHeader = ({name})=>{
     return null
}

const AyahsWithPageList =({theme,scrollTo})=>{	
	    const flatListRef = useRef(null);
      const quranPage = useSelector(state=>state.quranPage);
      const dispatch = useDispatch();
      const renderPage = ()=>{
      	return quranPage.ayahs.map(item=> item.name ?<RenderHeader name={item.name} key={ item.name} /> :<TextComponent text={item.text} key={item.text|| item.name} />)
      }
<View style={{
       	flex:1,
       	borderRadius:10,
       	borderWidth:4,
       	borderColor:'#02733E',
       	margin:5,
       	padding:2
       }}>
        <View style={{
       	flex:1,
       	padding:5,
       	borderRadius:10,
       	borderWidth:2,
       	borderColor:'#02733E',
       	padding:5,

       }}>
       <Text>
          {renderPage()}
        </Text>
        </View>
        </View>
      

        <ScrollView 
    style={{flex:1}}
    ref={listRef}

    >
    <Text>
              <Text  onLayout={({nativeEvent: {layout: {x, y, width, height}}}) => {
                // const layout = event.nativeEvent.layout;
                // arr[item.numberInPage] = layout.y;
                console.log('height1:', height);
                console.log('width:', width);
                console.log('x:', x);
                console.log('y:', y);
              }}>
              i sdndf kfns,md fkdsnf,s,d flksd fksdnf, sdvc sdknvsd fjsnfs
              </Text>
              <Text  onLayout={({nativeEvent: {layout: {x, y, width, height}}}) => {
                // const layout = event.nativeEvent.layout;
                // arr[item.numberInPage] = layout.y;
                console.log('height2:', height);
                console.log('width:', width);
                console.log('x:', x);
                console.log('y:', y);
              }}>
                    lorem i sdndf kfns,md fkdsnf,s,d flksd fksdnf, sdvc sdknvsd fjsnfs
              </Text>
    </Text>
    <View style={{ flex: 1,
 }}><View style={{
        flex:1,
        borderRadius:10,
        borderWidth:4,
        borderColor:theme.PRIMARY,
        margin:5,
        padding:2
       }}>
        <View style={{
        flex:1,
        padding:5,
        borderRadius:10,
        borderWidth:2,
        borderColor:theme.PRIMARY,
        padding:5,

       }}>
       <Text style={{
        writingDirection:'rtl'
       }}>
          {renderPage()}
        </Text>
        </View>
        </View>
    </View>
    </ScrollView>
*/
