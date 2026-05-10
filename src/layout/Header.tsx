import {View, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "expo-router";
import {ModeSwitch} from "@/components/ModeSwitch";
import {useHeaderStore} from "@/store/useHeaderStore";

export const AppHeader = ({route}: any) => {
  const navigation = useNavigation();

  const { action, title } = useHeaderStore();

  const canGoBack = navigation.canGoBack();

  return (
    <View
      style={{
        paddingTop: 70,
        paddingHorizontal: 16,
        paddingBottom: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <ModeSwitch/>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          marginTop: 20,
        }}
      >

        {/* LEFT */}
        <View style={{width: 80}}>
          {canGoBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{fontSize: 14}}>← Назад</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* CENTER */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>

        {/* RIGHT */}
        <View
          style={{
            width: 80,
            alignItems: "flex-end",
          }}
        >
          {action?.isVisible && (
            <TouchableOpacity onPress={action.onPress}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#4CAF50",
                  fontWeight: "600",
                }}
              >
                {action.title}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};