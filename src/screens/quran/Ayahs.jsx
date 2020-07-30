import React,{useEffect} from 'react';
import {Container,Header,Button,Body,Left,Icon,Right,Title} from 'native-base';
import {useSelector,useDispatch} from 'react-redux';
import {LeftArrowIOS} from '../../assets/icons/'
import AyahsList from './AyahsList';
import {AyahContent,AyahHeader,PlayerHeader} from './RenderAyah.jsx';

const Ayahs=({navigation,route})=>{
	const {name,number,scrollTo} = route.params;
	const theme = useSelector(state=>state.theme);
    const font = useSelector(state=>state.font)
  
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
					color:theme.BG
				}}>{name}</Title>
			</Body>
			<Right />
		</Header>	
          <AyahsList number={number} name={name} font={font} scrollTo={scrollTo} theme={theme} />
	</Container>
}
export default Ayahs;