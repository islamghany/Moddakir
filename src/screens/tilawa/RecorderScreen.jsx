import React from 'react';
import {View,Text} from 'react-native';
import {Container,Header,Button,Body,Left,Icon,Right,Title} from 'native-base';
import {useSelector} from 'react-redux';
import {LeftArrowIOS} from '../../assets/icons/'
import ReactBody from './RecordBody'
const RecorderScreen= ({navigation})=>{

	const theme = useSelector(state=>state.theme);
		const font = useSelector(state=>state.font);

	return <Container>
		<Header style={{backgroundColor:theme.PRIMARY}}> 
			<Left>
				<Button transparent onPress={()=>navigation.goBack()}>
                   <LeftArrowIOS size={24} color={theme.BG} />
				</Button>
			</Left>
			<Body>
				<Title style={{
					fontFamily:'hfs',
					color:theme.BG,
					fontSize:18
				}}>سجل تلاوتك</Title>
			</Body>
			<Right />
		</Header>
		<ReactBody font={font} theme={theme} />	
	</Container>
}
export default RecorderScreen;