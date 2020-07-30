import React from 'react';
import {Container,Header,Button,Body,Tab, Tabs,Content,Left,Icon,Right,Title} from 'native-base';
import {useSelector} from 'react-redux';
import {Search} from '../../assets/icons/'
import {SettingsList} from './SettingsList'
const SettingsSreen=({navigation})=>{
		const theme = useSelector(state=>state.theme);
				const font = useSelector(state=>state.font);

    const onPress= (nav,name,title,index)=>{
    	navigation.navigate(nav,{name,title,index});
    }
	return <Container>
		<Header style={{backgroundColor:theme.PRIMARY}}>
			<Left/>
			<Body>
				<Title style={{
					fontFamily:font.app.fontName,
					color:theme.BG
				}}>الاعدادات</Title>
			</Body>
			<Right />
		</Header>
		<SettingsList font={font} onPress={onPress} theme={theme}/>
 	</Container>
}
export default SettingsSreen;