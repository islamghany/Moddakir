import React from "react";
import {
  ListItem,
  List,
  Left,
  Body,
  Content,
  Text,
  Button,
  Icon,
  Right,
} from "native-base";
import { View } from "react-native";
import { Notification, Palette } from "../../assets/icons";

const Separator = ({ children, style }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export const SettingsList = ({ theme, onPress,font }) => {
  return (
    <Content
      style={{
        backgroundColor: theme.BG,
      }}
    >
      <Separator style={{ backgroundColor: theme.BG, paddingLeft: 20 }}>
        <Notification color={theme.PRIMARY_TEXT} size={24} />
        <Text
          style={{
            fontFamily: font.app.fontName,
            fontSize: 18,
            marginLeft: 10,
            color: theme.PRIMARY_TEXT,
          }}
        >
          التنبيهات
        </Text>
      </Separator>
      <List
        style={{
          backgroundColor: theme.SECONDARY_BG,
        }}
      >
        <ListItem
          onPress={() => onPress("Notification", "elwird", "الورد اليومي")}
          style={{
            backgroundColor: theme.SECONDARY_BG,
          }}
        >
          <Left>
            <Text
              style={{
                color: theme.PRIMARY_TEXT,
                fontFamily: font.app.fontName,
              }}
            >
              الورد اليومي
            </Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem
          onPress={() =>
            onPress("Notification", "azkarElsbah", "أذكار الصباح", 0)
          }
          style={{
            backgroundColor: theme.SECONDARY_BG,
          }}
        >
          <Left>
            <Text
              style={{
                color: theme.PRIMARY_TEXT,
                fontFamily: font.app.fontName,
              }}
            >
              أذكار الصباح
            </Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem
          onPress={() =>
            onPress("Notification", "azkarElmsaa", "أذكار المساء", 1)
          }
          style={{
            backgroundColor: theme.SECONDARY_BG,
          }}
        >
          <Left>
            <Text
              style={{
                color: theme.PRIMARY_TEXT,
                fontFamily: font.app.fontName,
              }}
            >
              أذكار المساء
            </Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem
          onPress={() => onPress("Notification", "eltsbeh", "التسبيح")}
          style={{
            backgroundColor: theme.SECONDARY_BG,
          }}
        >
          <Left>
            <Text
              style={{
                color: theme.PRIMARY_TEXT,
                fontFamily: font.app.fontName,
              }}
            >
              التسبيح
            </Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
      <Separator style={{ backgroundColor: theme.BG, paddingLeft: 20 }}>
        <Palette color={theme.PRIMARY_TEXT} size={24} />
        <Text
          style={{
            fontFamily: font.app.fontName,
            fontSize: 18,
            marginLeft: 10,
            color: theme.PRIMARY_TEXT,
          }}
        >
          الشكل
        </Text>
      </Separator>
      <List
        style={{
          backgroundColor: theme.SECONDARY_BG,
        }}
      >
        <ListItem
          onPress={() => onPress("Theme")}
          style={{
            backgroundColor: theme.SECONDARY_BG,
          }}
        >
          <Left>
            <Text
              style={{
                color: theme.PRIMARY_TEXT,
                fontFamily: font.app.fontName,
              }}
            >
              لون المصحف
            </Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
         <ListItem
          onPress={() => onPress("font")}
          style={{
            backgroundColor: theme.SECONDARY_BG,
          }}
        >
          <Left>
            <Text
              style={{
                color: theme.PRIMARY_TEXT,
                fontFamily: font.app.fontName,
              }}
            >
              الخطوط
            </Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </Content>
  );
};
