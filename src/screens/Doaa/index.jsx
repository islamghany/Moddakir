import React from 'react';
import {Container,Header,Button,Body,Tab, Tabs,Content,Left,Icon,Right,Title} from 'native-base';
import {useSelector,useDispatch} from 'react-redux';
import {Search} from '../../assets/icons/'
import {Text,View,FlatList} from 'react-native';
import {RightArrowIOS} from '../../assets/icons'
const data=[{
  name: "أذكار الصباح",
  number: 31
}, {
  name: "أذكار المساء",
  number: 30
}, {
  name: "أذكار الاستيقاظ من النوم",
  number: 4
}, {
  name: "دعاء لبس الثوب الجديد",
  number: 5
}, {
  name: "أذكار دخول وخروج الخلاء",
  number: 2
}, {
  name: "أذكار الوضوء",
  number: 4
}, {
  name: "أذكار دخول وخروج المنزل",
  number: 3
}, {
  name: "أذكار المسجد",
  number: 3
}, {
  name: "أذكار الآذان",
  number: 5
}, {
  name: "دعاء الاستفتاح",
  number: 5
}, {
  name: "أذكار الصلاة",
  number: 33
}, {
  name: "أذكار بعد الصلاة",
  number: 9
}, {
  name: "أذكار النوم",
  number: 17
}, {
  name: "أذكار متفرقة",
  number: 30
}, {
  name: "أدعية للميّت",
  number: 13
}, {
  name: "الرقية الشرعية",
  number: 33
}, {
  name: "التسبيح",
  number: 19
}, {
  name: "أذكار الحج",
  number: 7
}]
// function Divider(props) {
//   return (
//     <Svg
//       data-name="Layer 1"
//       viewBox="0 0 1200 120"
//       preserveAspectRatio="none"
//       {...props}
//     >
//       <Path
//         d="M0 0v7.23c0 58.29 268.63 105.54 600 105.54s600-47.25 600-105.54V0z"
//         className="prefix__shape-fill"
//       />
//     </Svg>
//   )
// }
// const ZkrItem= ()=>{
// 	return   <View>
//         <View style={{
//           marginHorizontal:10,
//           marginBottom:10,
//           backgroundColor:theme.BG,
//           padding:10,
//           borderRadius:20,
//               shadowOffset: {
//             width: 0,
//             height: 1,
//             },
//             shadowOpacity: 0.20,
//             shadowRadius: 1.41,
//            justifyContent:'center',
//            alignItems:'center',
//           elevation: 2,
//         shadowColor: theme.SECONDARY_TEXT
//         }}>
//         <View>
//         <Text style={{
//           color:theme.PRIMARY,
//           fontSize:17,
//           textAlign:'center'
//         }}>{zkr.category}</Text>
//         </View>
//         <View style={{
//            marginVertical:10,
//            borderRightWidth:2,
//            borderColor:theme.SECONDARY_TEXT,
//            paddingRight:10,
//            borderTopRightRadius:2,
//            borderBottomRightRadius:2,
//         }}>
//         <Text style={{
//           fontSize:17,
//           textAlign:'right'
//         }}>{zkr.zekr}</Text>
//          {zkr.reference && <Text style={{
//           textAlign:'right'
//         }}>
//          {zkr.reference}
//          </Text>}
//         </View>
//         <View s>
//         {zkr.count && <Text style={{
//           textAlign:'right',
//           color:theme.SECONDARY_TEXT
//         }}>
//          مرات التكرار : 1
//          </Text>}
//           {zkr.count && <Text style={{
//           textAlign:'right',
//           color:theme.SECONDARY_TEXT
//         }}>
//           فضل هذا الدعاء : {zkr.description}
//          </Text>}
//         </View>
//         </View>
//       </View>
// }
// const List=()=>{
// 	return <View style={{
//        backgroundColor:theme.PRIMARY,
//        height:100
//      }}>
//      </View>
//      <View style={{
//        flex:1,
//        backgroundColor:theme.ACCENT,
//        position:"relative",
//        paddingTop:80,
//      }}>
//       <View style={{
//        position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         overflow: 'hidden'
//      }}>
//       <Divider fill={theme.PRIMARY} width={width} height={60}/>
//      </View>
//       <View style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           alignItems:'center'
//       }}>
//         <View style={{
//           backgroundColor:theme.BG,
//           paddingHorizontal:30,
//           minHeight:100,
//           borderRadius:20,
//            shadowOffset: {
//             width: 0,
//             height: 1,
//             },
//             shadowOpacity: 0.20,
//             shadowRadius: 1.41,
//            justifyContent:'center',
//            alignItems:'center',
//           elevation: 2,
//         shadowColor: theme.SECONDARY_TEXT
//         }}>
//         <Text style={{
//          fontSize:18,
//          color:theme.PRIMARY_TEXT,
//          fontWeight:'400',
//          paddingBottom:5,
//        }}>ذكار الصباح</Text>
//         <Text style={{
//          color:theme.SECONDARY_TEXT,
//        }}>عدد الاجزاء : 11</Text>
//         </View>
//       </View>  
//      </View>
// }

// const AzkarItem = ()=>{
// 	return  <Button style={{
//         marginHorizontal:10,
//         backgroundColor:theme.BG,
//         padding:10,
//         paddingHorizontal:15,
//         borderRadius:15,
//         flexDirection:'row',
//         justifyContent:'space-between',
//         alignItems:"center"   ,
//         shadowOffset: {
//         width: 0,
//         height: 1,
//         },
//         shadowOpacity: 0.20,
//         shadowRadius: 1.41,
// 		elevation: 2,
// 		shadowColor: theme.SECONDARY_TEXT
//       }}>
//        <View>
//        <Text style={{
//          fontSize:18,
//          color:theme.PRIMARY_TEXT,
//          fontWeight:'400',
//          paddingBottom:5,
//        }}>
//          أذكار الصباح
//        </Text>
//        <Text style={{
//          color:theme.SECONDARY_TEXT,
//        }}>
//           عدد الاذكار : 7
//        </Text>
//        </View> 
//        <View>
//          <Text>></Text>
//        </View>
//       </Button>
// }

const DoaaScreen=({navigation})=>{
	const theme = useSelector(state=>state.theme);
  const font = useSelector(state=>state.font);
	const dispatch= useDispatch();
	const onNavigate=(index)=>{
		dispatch({
       	type:'GET_AZKAR',
       	payload:index,
       })
       navigation.navigate('Azkar',{index});
      
	} 
	return <Container>
		<Header style={{backgroundColor:theme.PRIMARY}}> 
			<Left/>
			<Body>
				<Title style={{
					fontFamily:font.app.fontName,
					color:theme.BG
				}}>الاذكار</Title>
			</Body>
			<Right />
		</Header>
		<View style={{
            flex:1,
            backgroundColor:theme.BG
		}}>
		<FlatList 
          keyExtractor={(item)=>item.name}
          data={data}
          style={{flex:1}}
          renderItem={({item,index})=><View
          style={{
          	marginVertical:8,
          	shadowOffset: {
	        width: 0,
	        height: 1,
        },
        minHeight:70,
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
		elevation: 2,
		shadowColor: theme.SECONDARY_TEXT,
        marginHorizontal:10,
        backgroundColor:theme.SECONDARY_BG,
        borderRadius:10,
          }}
          ><Button onPress={()=>onNavigate(index)} transparent style={{
         paddingHorizontal:15,       
         flex:1,
        justifyContent:'space-between',
        alignItems:"center",
      }}>
     
       <View>
       <Text style={{
         fontSize:18,
         color:theme.PRIMARY_TEXT,
         fontWeight:'400',
         fontFamily:font.app.fontName
       }}>
        {item.name}
       </Text>
       <Text style={{
         color:theme.SECONDARY_TEXT,
         fontFamily:font.app.fontName
       }}>
          عدد الاذكار : {item.number}
       </Text>
       </View> 
       <View>
         <RightArrowIOS color={theme.PRIMARY_TEXT} size={24} />
       </View>
      </Button>
      </View>
  }
		/>
		</View>

	</Container>
}
export default DoaaScreen;