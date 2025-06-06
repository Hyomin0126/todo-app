import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const backgroundImg = require("../assets/images/homeBG.png");

const HomeScreen = () => {
  return (
    <ImageBackground source={backgroundImg} style={styles.bgImage}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", paddingBottom: 200 }}>
          Today
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
