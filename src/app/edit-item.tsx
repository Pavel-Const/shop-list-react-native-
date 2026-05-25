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
import {AppInput} from "@/components/ui/AppInput";
import {POPULAR_ITEMS} from "@/constants/popularItems";
import {AppButton} from "@/components/ui/AppButton";

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
  
  const suggestions = useMemo(() => {
    if (!name.trim()) return [];
    
    return POPULAR_ITEMS.filter((item) =>
      item.toLowerCase().includes(name.toLowerCase())
    );
  }, [name]);
  
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
        alignItems: "center"
      }}
    >
      <AppInput
        label="Товар"
        placeholder="Введите товар"
        value={name}
        onChangeText={setName}
        suggestions={suggestions}
        onSuggestionPress={(value) => {
          setName(value);
        }}
      />
      <CategoryPicker
        value={categoryId}
        onChange={setCategoryId}
      />
      <AppButton variant={"danger"} onPress={handleRemove}
                 title="Удалить товар"
      />
    </View>
  );
}