import { View, Text, TouchableOpacity, Animated } from "react-native";
import {useEffect, useRef, useState} from "react";
import { useStore } from "@/store/useStore";

export const ModeSwitch = () => {
  const { mode, setMode } = useStore();
  const anim = useRef(new Animated.Value(mode === "shopping" ? 1 : 0)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: mode === "shopping" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [mode]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, width / 2],
  });

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={{
        width: "100%",
        height: 44,
        backgroundColor: "#F8F9FE",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
      }}
    >
      {/* 🔥 Анимированный бегунок */}
      <Animated.View
        style={{
          position: "absolute",
          width: "50%",
          height: 36,
          borderRadius: 12,
          backgroundColor: "#fff",
          transform: [{ translateX }],
        }}
      />

      <TouchableOpacity
        style={{ flex: 1, alignItems: "center" }}
        onPress={() => setMode("edit")}
      >
        <Text style={{ color: mode === "edit" ? "#1F2024" : "#71727A" }}>
          Дом
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flex: 1, alignItems: "center" }}
        onPress={() => setMode("shopping")}
      >
        <Text style={{ color: mode === "shopping" ? "#1F2024" : "#71727A" }}>
          Магазин
        </Text>
      </TouchableOpacity>
    </View>
  );
};