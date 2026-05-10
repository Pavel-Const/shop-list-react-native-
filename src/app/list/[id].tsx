import {View, Text, Button, FlatList, Pressable} from "react-native";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import {useStore} from "@/store/useStore";
import {useHeaderStore} from "@/store/useHeaderStore";
import {useCallback} from "react";

export default function ListScreen() {
  const {id} = useLocalSearchParams();

  const {
    lists,
    categories,
    removeItem,
  } = useStore();

  const {
    setAction,
    setTitle,
    clearAction,
  } = useHeaderStore();

  const list = lists.find(
    (l) => l.id === id
  );

  if (!list) {
    return <Text>List not found</Text>;
  }

  useFocusEffect(
    useCallback(() => {
      setTitle(list.name);

      setAction({
        isVisible: true,
        title: "Готово",
        onPress: () => router.back(),
      });

      return () => clearAction();
    }, [list.name])
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Button
        title="Add item"
        onPress={() =>
          router.push({
            pathname: "/add-item",
            params: {
              listId: list.id,
            },
          } as any)
        }
      />

      <FlatList
        style={{marginTop: 20}}
        data={list.items}
        keyExtractor={(i) => i.id}
        renderItem={({item}) => {
          const category =
            categories.find(
              (c) =>
                c.id === item.categoryId
            );

          return (
            <Pressable
              onPress={() =>
                router.push({
                  pathname:
                    "/edit-item",
                  params: {
                    listId:
                    list.id,
                    itemId:
                    item.id,
                  },
                } as any)
              }
              style={{
                flexDirection: "row",
                justifyContent:
                  "space-between",
                alignItems: "center",
                padding: 12,

                borderWidth: 1,
                borderColor: category?.color || "#E5E5EA",

                borderRadius: 12,

                marginBottom: 10,
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
                    color: "#1F2024",
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
                      alignSelf:
                        "flex-start",

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
              <Button
                title="X"
                onPress={() =>
                  removeItem(
                    list.id,
                    item.id
                  )
                }
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}