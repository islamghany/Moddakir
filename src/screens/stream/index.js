import React from 'react'
import {View,Text} from 'react-native';
import {Container,Header,Button,Body,Content,Footer,Left,Icon,Right,Title,Item} from 'native-base';
import {useSelector,useDispatch} from 'react-redux';
import {Search,Heart,HeartFill,RightArrowIOS} from '../../assets/icons/'
import RenderStrems from './RenderStreams.js';
import Input from "../../components/InputNative.jsx";
import StreamPlayer from './StreamPlayer'
const Stream = ()=>{
	const theme = useSelector(state=>state.theme);
    const font = useSelector(state=>state.font);
	return <Container>
	  <Header style={{backgroundColor:theme.PRIMARY}}> 
			<Left />
			<Body>
				<Title style={{
					fontFamily:font.app.fontName,
					color:theme.BG
				}}>البث الاذاعي</Title>
			</Body>
			<Right />
		</Header>
		<Item
        style={{
          backgroundColor: theme.SECONDARY_BG,
          flexDirection: "row-reverse",
          margin: 0,
          borderWidth: 0,
        }}
      >
        <Icon name="ios-search" />
        <Input theme={theme} type="GET_STREAMS" />
      </Item>
		<RenderStrems theme={theme} font={font} />
		<StreamPlayer  theme={theme} font={font}/>
	</Container>
}
export default Stream;