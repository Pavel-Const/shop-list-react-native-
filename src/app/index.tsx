import {View, Text, Button, FlatList} from "react-native";
import {router, useFocusEffect} from "expo-router";
import {useStore} from "@/store/useStore";
import {useCallback, useEffect} from "react";
import {useHeaderStore} from "@/store/useHeaderStore";
import {ListCard} from "@/components/ListCard";

export default function Home() {
  const {lists} = useStore();
  const {setAction, setTitle, clearAction} = useHeaderStore();

  useFocusEffect(
    useCallback(() => {
      setTitle("Списки");
      setAction({
        isVisible: true,
        title: "Добавить",
        onPress: () => router.push("/create-list"),
      });

      return () => {
        clearAction();
      };
    }, [])
  );
  return (
    <View style={{flex: 1, padding: 20, backgroundColor: "#fff"}}>
      <FlatList
        style={{marginTop: 20}}
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListCard
            id={item.id}
            title={item.name}
            itemsCount={item.items.length}
          />
        )}
      />
    </View>
  );
}