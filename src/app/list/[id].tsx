import {View, Text, Button, FlatList, Pressable} from "react-native";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import {useStore} from "@/store/useStore";
import {useHeaderStore} from "@/store/useHeaderStore";
import {useCallback, useState} from "react";
import {AppButton} from "@/components/ui/AppButton";
import {ListItemCard} from "@/components/ListItemCard";
import {CategoriesBar} from "@/components/CategoriesBar";

export default function ListScreen() {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string>();
  
  const {id} = useLocalSearchParams();
  
  const {
    lists,
    categories,
    removeItem,
    toggleItem,
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
  
  const handleAdd = () => {
    return router.push({
      pathname: "/add-item",
      params: {
        listId: list.id,
      },
    } as any)
  }
  
  const sortedItems = [...list.items].sort(
    (a, b) => Number(a.done) - Number(b.done)
  );
  
  const filteredItems =
    selectedCategoryId
      ? sortedItems.filter(
        (item) =>
          item.categoryId ===
          selectedCategoryId
      )
      : sortedItems;
  
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
        backgroundColor: "#fff",
        paddingTop: 20
      }}
    >
      <AppButton
        title="Добавить товар"
        style={{
          alignSelf: "center",
        }}
        onPress={handleAdd}
      />
      <View
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <FlatList
          style={{marginTop: 20, width: "100%"}}
          data={filteredItems}
          keyExtractor={(i) => i.id}
          renderItem={({item}) => {
            const category =
              categories.find(
                (c) =>
                  c.id === item.categoryId
              );
            return (
              <ListItemCard
                item={item}
                listId={list.id}
                category={category}
                onRemove={removeItem}
                onToggle={toggleItem}
              />
            );
          }}
        />
      </View>
      <CategoriesBar
        categories={categories}
        selectedCategoryId={
          selectedCategoryId
        }
        onSelect={setSelectedCategoryId}
      />
    </View>
  );
}