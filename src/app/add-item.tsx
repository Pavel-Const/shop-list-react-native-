import {View, TextInput, FlatList, Text, TouchableOpacity} from "react-native";
import {useState, useMemo, useCallback} from "react";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import {useStore} from "@/store/useStore";
import {POPULAR_ITEMS} from "@/constants/popularItems";
import {useHeaderStore} from "@/store/useHeaderStore";
import {CategoryPicker} from "@/components/CategoryPicker";
import {AppInput} from "@/components/ui/AppInput";

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
  }, [name, listId, categoryId]);

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
    </View>
  );
}