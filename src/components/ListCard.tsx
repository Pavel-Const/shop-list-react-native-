import {
  View,
  Text,
  Pressable,
} from "react-native";

import {router} from "expo-router";
import {AppButton} from "@/components/ui/AppButton";
import {useStore} from "@/store/useStore";

type Props = {
  id: string;
  title: string;
  itemsCount: number;
};

export const ListCard = (
  {
    id,
    title,
    itemsCount,
  }: Props) => {
  const {removeList} = useStore();
  
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/list/[id]",
          params: {id},
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        
        padding: 16,
        
        backgroundColor: "#F3F4F6",
        
        borderRadius: 24,
        
        marginBottom: 14,
      }}
    >
      {/* LEFT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          
          flex: 1,
        }}
      >
        {/* ICON */}
        <View
          style={{
            width: 52,
            height: 52,
            
            borderRadius: 26,
            
            backgroundColor: "#E5E7EB",
            
            alignItems: "center",
            justifyContent: "center",
            
            marginRight: 14,
          }}
        >
          <Text
            style={{
              fontSize: 24,
            }}
          >
            💙
          </Text>
        </View>
        
        {/* TEXT */}
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#1F2024",
            }}
          >
            {title}
          </Text>
          
          <Text
            style={{
              marginTop: 4,
              
              fontSize: 16,
              color: "#8E8E93",
            }}
          >
            {itemsCount} товаров
          </Text>
        </View>
      </View>
      
      {/* BUTTON */}
      <AppButton title={"X"} variant={"danger"} onPress={() => removeList(id)} style={{width: 60}}/>
    </Pressable>
  );
};