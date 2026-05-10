import {View, Text, Button, FlatList} from "react-native";
import {router, useFocusEffect} from "expo-router";
import {useStore} from "@/store/useStore";
import {useCallback, useEffect} from "react";
import {useHeaderStore} from "@/store/useHeaderStore";

export default function Home() {
  const {lists, removeList} = useStore();
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
        renderItem={({item}) => (
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              marginBottom: 10,
            }}
          >
            <Text
              onPress={() => router.push({
                pathname: "/list/[id]",
                params: {id: item.id},
              })}
            >
              {item.name}
            </Text>

            <Button
              title="Delete"
              onPress={() => removeList(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}