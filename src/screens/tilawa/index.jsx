import React from 'react';
import {Container,Header,Button,Body,Tab, Tabs,Content,Left,Fab ,Icon,Right,Title} from 'native-base';
import {useSelector} from 'react-redux';
import {Search,Add} from '../../assets/icons/'
import SavedRecorders from './SavedRecorder'
const TilawaScreen=({navigation})=>{
		const theme = useSelector(state=>state.theme);
	    const font = useSelector(state=>state.font);

	return <Container>
		<Header style={{backgroundColor:theme.PRIMARY}}>
			<Left/>
			<Body>
				<Title style={{
					fontFamily:font.app.fontName,
					color:theme.BG
				}}>تلاوتك</Title>
			</Body>
			<Right>
			 <Button onPress={() =>navigation.navigate('Record') } transparent>
               <Add  color={theme.BG} size={30}  />
			 </Button>
			</Right>
		</Header>
		<SavedRecorders font={font} theme={theme} />
	</Container>
}
export default TilawaScreen;