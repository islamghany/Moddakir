import React from "react";
import {
  Container,
  Header,
  Item,
  Button,
  Body,
  Text,
  Tabs,
  Left,
  Icon,
  Right,
  Title,
} from "native-base";
import { useSelector } from "react-redux";
import { Search } from "../../assets/icons/";
import Input from "../../components/InputNative.jsx";
import RenderAyahsFromSearch from "./RenderAyahsFromSearch";
const SearchScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.theme);
  const font = useSelector((state) => state.font);
  const onPress = (item) => {
    navigation.navigate("Ayahs3", { ...item,scrollTo:item.numberInSurah});
  };
  return (
    <Container>
      <Header
        searchBar
        rounded
        noShadow
        style={{ backgroundColor: theme.PRIMARY, borderBottomWidth: 0 }}
      >
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: theme.SECONDARY_BG,
                fontFamily: font.app.fontName,
              }}
            >
              الغاء
            </Text>
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              fontFamily: font.app.fontName,
              color: theme.BG,
            }}
          >
            ابحث عن اية او سورة
          </Title>
        </Body>
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
        <Input theme={theme} type="MAKE_SEARCH" />
      </Item>
      <RenderAyahsFromSearch
      font={font}
        theme={theme}
        onPress={(item) => {
          onPress(item);
        }}
      />
    </Container>
  );
};
export default SearchScreen;
