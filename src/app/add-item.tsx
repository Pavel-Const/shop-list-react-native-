import {View, TextInput, FlatList, Text, TouchableOpacity} from "react-native";
import {useState, useMemo, useCallback} from "react";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import {useStore} from "@/store/useStore";
import {POPULAR_ITEMS} from "@/constants/popularItems";
import {useHeaderStore} from "@/store/useHeaderStore";
import {CategoryPicker} from "@/components/CategoryPicker";

export default function AddItem() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<string>();
  const {addItem} = useStore();
  const {setAction, setTitle, clearAction} = useHeaderStore();

  const {listId} = useLocalSearchParams<{ listId: string }>();
  const suggestions = useMemo(() => {
    if (!name.trim()) return [];

    return POPULAR_ITEMS.filter((item) =>
      item.toLowerCase().includes(name.toLowerCase())
    );
  }, [name]);

  const handleAdd = useCallback(() => {
    if (!name.trim() || !listId) return;
    addItem(listId, name.trim(), categoryId);
    router.back();
  }, [name, listId]);

  const handleSuggestionPress = useCallback(
    (value: string) => {
      if (!listId) return;
      addItem(listId, value);
      router.back();
    },
    [listId]
  );
  useFocusEffect(
    useCallback(() => {
      setTitle("Новый товар");

      setAction({
        isVisible: true,
        title: "Готово",
        onPress: handleAdd,
      });

      return () => clearAction();
    }, [handleAdd])
  );

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: "#fff"}}>
      <TextInput
        placeholder="Название товара"
        value={name}
        onChangeText={setName}
        autoFocus
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSuggestionPress(item)}
            style={{
              padding: 10,
              borderBottomWidth: 1,
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <CategoryPicker
        value={categoryId}
        onChange={setCategoryId}
      />
    </View>
  );
}