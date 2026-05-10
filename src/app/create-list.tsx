import {View, TextInput, Button} from "react-native";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import {useStore} from "@/store/useStore";
import {useHeaderStore} from "@/store/useHeaderStore";

export default function CreateList() {
  const [name, setName] = useState("");
  const {addList} = useStore();
  const {setAction, setTitle, clearAction} = useHeaderStore();

  const handleCreate = () => {
    if (!name.trim()) return;
    const newList = addList(name);
    router.replace({
      pathname: "/list/[id]",
      params: {id: newList.id},
    });
  };

  useEffect(() => {
    setTitle("Новый список");
    setAction({
      isVisible: true,
      title: "Создать",
      onPress: handleCreate,
    });

    return () => clearAction();
  }, [name]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
      <TextInput
        placeholder="Название списка"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />
    </View>
  );
}