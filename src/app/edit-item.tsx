import {View, TextInput, Button} from "react-native";
import {useState, useMemo, useCallback, useEffect} from "react";

import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";

import {useStore} from "@/store/useStore";
import {useHeaderStore} from "@/store/useHeaderStore";
import {CategoryPicker} from "@/components/CategoryPicker";

export default function EditItem() {
  const {listId, itemId} = useLocalSearchParams<{
    listId: string;
    itemId: string;
  }>();

  const {lists, updateItem, removeItem} = useStore();

  const {
    setAction,
    setTitle,
    clearAction,
  } = useHeaderStore();

  const item = useMemo(() => {
    const list = lists.find((l) => l.id === listId);

    return list?.items.find((i) => i.id === itemId);
  }, [lists, listId, itemId]);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<string>();

  useEffect(() => {
    if (item) {
      setName(item.title);
      setCategoryId(item.categoryId);
    }
  }, [item]);

  const handleSave = useCallback(() => {
    if (!name.trim()) return;

    if (!listId || !itemId) return;

    updateItem(listId, itemId, name.trim(), categoryId);

    router.back();
  }, [name, listId, itemId, categoryId]);

  const handleRemove = useCallback(() => {
    if (!listId || !itemId) return;
    removeItem(listId, itemId);
    router.back();
  }, [name, listId, itemId]);

  useFocusEffect(
    useCallback(() => {
      setTitle("Редактирование");

      setAction({
        isVisible: true,
        title: "Сохранить",
        onPress: handleSave,
      });

      return () => clearAction();
    }, [handleSave])
  );

  if (!item) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <TextInput
        value={name}
        onChangeText={setName}
        autoFocus
        placeholder="Название товара"
        style={{
          borderWidth: 1,
          borderColor: "#E5E5EA",
          padding: 12,
          borderRadius: 12,
          fontSize: 16,
        }}
      />
      <CategoryPicker
        value={categoryId}
        onChange={setCategoryId}
      />
      <Button
        title="Удалить товар"
        onPress={handleRemove}
      />
    </View>
  );
}