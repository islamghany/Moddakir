import React,{useState} from 'react';
import {View,Text,FlatList,Dimensions,AsyncStorage} from 'react-native';
import {Header,Container,Spinner,Content,Title,Left,Right,Body,Button,Radio} from 'native-base';
import { useSelector,useDispatch } from "react-redux";
import { LeftArrowIOS } from "../../assets/icons";
import  {Themes} from '../../utils/THEMES';

const {height,width} = Dimensions.get('window');

const LoadingComponent=({PRIMARY})=>{
  return <View style={{
    position:'absolute',
    height:height,
    top:0,
    left:0,right:0,
    justifyContent:'center',
    bottom:0,
    width:width,
    zIndex:4,
    backgroundColor:'transparent'
  }}>
     <Spinner color={PRIMARY} />
  </View>
}

const ThemeScreen= ({navigation})=>{
	const theme = useSelector((state) => state.theme);
  const font = useSelector((state) => state.font);

	return <Container>
      <Header noShadow style={{ backgroundColor: theme.PRIMARY }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <LeftArrowIOS color={theme.BG} size={24} />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              fontFamily: font.app.fontName,
              color: theme.BG,
            }}
          >
          لون المصحف
          </Title>
        </Body>
        <Right />
      </Header>
              <ThemesList theme={theme} />

      </Container>
}
const ThemesList = ({theme})=>{
    const dispatch = useDispatch();
	const [isLoading,setIsLoading] = useState(false);
    const setTheme=async (data)=>{
    	setIsLoading(true);
      try{
      	 await AsyncStorage.setItem('theme',JSON.stringify(data));
      	 dispatch({type:'SET_THEME',payload:data})
      }catch(err){
      	alert('error')
      }
      setIsLoading(false);
    } 
	return <React.Fragment>
	      {isLoading && <LoadingComponent PRIMARY={theme.PRIMARY}/>}
	    <View style={{flex:1,backgroundColor:theme.BG}}>
         <FlatList 
          data={Themes}
          keyExtractor={item=>item.PRIMARY}
          numColumns={3}
          renderItem={({item})=>{
          return <View style={{
          	 width:width/3,
          	 alignItems:'center',
          	 justifyContent:'center',
          	  marginVertical:10,
          }}>
          <View style={{
            width:75,
          	height:75,
          	borderRadius:37.5,
          	borderWidth:2,
          	alignItems:'center',
          	justifyContent:'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          	borderColor:item.PRIMARY === theme.PRIMARY ? item.PRIMARY : 'transparent'
          }}><Button 
          disabled={item.PRIMARY === theme.PRIMARY }
          onPress={()=>setTheme(item)}
          style={{
          	width:60,
          	height:60,
          	borderRadius:30,
          	backgroundColor:item.PRIMARY,
            
          }}></Button>
          </View>
          </View>
      }} />
	    </View>
	</React.Fragment>
}
export default ThemeScreen;