import React from "react";
import {
  Container,
  Header,
  Button,
  Body,
  Tab,
  Tabs,
  Left,
  Right,
  Title,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Search } from "../../assets/icons/";
import SurahsList from "./SurahsList";

const QuranScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const font = useSelector((state) => state.font);

  const handleChange = (item) => {
    navigation.navigate("Ayahs", { ...item,number: item.number - 1,scrollTo:item.scrollTo || 0});
  };
  return (
    <Container style={{ backgroundColor: "transparent" }}>
      <Header hasTabs style={{ backgroundColor: theme.PRIMARY }}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Search")}>
            <Search size={24} color={theme.BG} />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              fontFamily: font.app.fontName,
              color: theme.BG,
            }}
          >
            المصحف
          </Title>
        </Body>
        <Right />
      </Header>

      <Tabs noShadow tabBarUnderlineStyle={{ backgroundColor: theme.BG }}>
        <Tab
          activeTabStyle={{
            backgroundColor: theme.PRIMARY,
          }}
          activeTextStyle={{
            color: theme.BG,
            fontFamily: font.app.fontName,
          }}
          tabStyle={{
            backgroundColor: theme.PRIMARY,
          }}
          textStyle={{
            color: theme.SECONDARY_BG,
            fontFamily: font.app.fontName,
          }}
          heading="السور"
        >
          <SurahsList
            onPress={(item) => {
              handleChange(item);
            }}
          />
        </Tab>
        <Tab
          activeTabStyle={{
            backgroundColor: theme.PRIMARY,
          }}
          activeTextStyle={{
            color: theme.BG,
            fontFamily: font.app.fontName,
          }}
          tabStyle={{
            backgroundColor: theme.PRIMARY,
          }}
          textStyle={{
            color: theme.SECONDARY_BG,
            fontFamily: font.app.fontName,
          }}
          heading="الاجزاء"
        >
          <SurahsList
            listName="juz"
            onPress={(item) => {
              handleChange(item);
            }}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default QuranScreen;
