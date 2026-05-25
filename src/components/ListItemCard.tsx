import {View, Text, Button, Pressable, TouchableOpacity} from "react-native";
import {router} from "expo-router";
import {useStore} from "@/store/useStore";

type Props = {
  item: {
    id: string;
    title: string;
    done: boolean;
    categoryId?: string;
  };
  
  listId: string;
  
  category?: {
    id: string;
    name: string;
    color?: string;
  };
  
  onRemove: (
    listId: string,
    itemId: string
  ) => void;
  onToggle: (
    listId: string,
    itemId: string
  ) => void;
};

export const ListItemCard = (
  {
    item,
    listId,
    category,
    onRemove,
    onToggle
  }: Props) => {
  
  const {mode} = useStore();
  
  const isShopping =
    mode === "shopping";
  
  return (
    <Pressable
      disabled={isShopping}
      onPress={() =>
        router.push({
          pathname: "/edit-item",
          params: {
            listId,
            itemId: item.id,
          },
        } as any)
      }
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
        padding: 12,
        
        borderWidth: 1,
        borderColor:
          category?.color || "#E5E5EA",
        
        borderRadius: 12,
        
        marginBottom: 10,
        backgroundColor:
          item.done
            ? "#F4F5F6"
            : "#fff",
        
        opacity: item.done
          ? 0.6
          : 1,
      }}
    >
      {/* LEFT */}
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: item.done
              ? "#8E8E93"
              : "#1F2024",
            textDecorationLine:
              item.done
                ? "line-through"
                : "none",
          }}
        >
          {item.title}
        </Text>
        
        {category && (
          <View
            style={{
              alignSelf: "flex-start",
              
              marginTop: 6,
              
              paddingHorizontal: 8,
              paddingVertical: 4,
              
              borderRadius: 999,
              
              backgroundColor:
                category.color ||
                "#F4F5F6",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#1F2024",
              }}
            >
              {category.name}
            </Text>
          </View>
        )}
      </View>
      
      {/* RIGHT */}
      {isShopping ? (
          <TouchableOpacity
            onPress={() =>
              onToggle(
                listId,
                item.id
              )
            }
            style={{
              width: 28,
              height: 28,
              
              borderRadius: 999,
              
              borderWidth: 2,
              
              borderColor:
                item.done
                  ? "#34C759"
                  : "#D1D1D6",
              
              backgroundColor:
                item.done
                  ? "#34C759"
                  : "#fff",
              
              alignItems: "center",
              justifyContent:
                "center",
            }}
          >
            {item.done && (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                ✓
              </Text>
            )}
          </TouchableOpacity>
        ) :
        <Button
          title="X"
          onPress={() =>
            onRemove(listId, item.id)
          }
        />}
    </Pressable>
  );
};