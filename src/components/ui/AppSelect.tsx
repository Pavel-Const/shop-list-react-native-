import React, {useState, useCallback, useMemo} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native";

export type SelectOption<T = string> = {
  label: string;
  value: T;
};

type Props<T = string> = {
  options: SelectOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

export const AppSelect = <T extends string | number>(
  {
    options,
    value,
    onChange,
    placeholder = "Выберите...",
    label,
    error,
    style,
    labelStyle,
  }: Props<T>) => {
  const [opened, setOpened] = useState(false);
  
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );
  
  const toggle = useCallback(() => setOpened((prev) => !prev), []);
  const close = useCallback(() => setOpened(false), []);
  
  const handleSelect = useCallback(
    (val: T) => {
      onChange(val);
      close();
    },
    [onChange, close]
  );
  
  return (
    <View style={[{marginBottom: 20, width: "100%"}, style]}>
      {/* LABEL */}
      {label && (
        <Text
          style={[
            {
              fontSize: 14,
              fontWeight: "600",
              marginBottom: 8,
              color: "#71727A",
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      
      {/* TRIGGER BUTTON */}
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.7}
        style={{
          borderWidth: 1,
          borderColor: error ? "#FF3B30" : opened ? "#0A84FF" : "#E5E5EA",
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 14,
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 50,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            color: selectedOption ? "#1F2024" : "#9E9E9E",
            flex: 1,
            marginRight: 8,
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text style={{fontSize: 12, color: "#9E9E9E"}}>
          {opened ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      
      {/* MODAL DROPDOWN */}
      <Modal
        visible={opened}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.2)", // Легкое затемнение фона
            justifyContent: "flex-start", // Позиционируем список сверху вниз
          }}
          onPress={close} // Закрывает при клике на затемненную область
        >
          {/* Контейнер для списка, чтобы клик по нему не закрывал модалку сразу */}
          <Pressable
            style={{
              marginTop: 60, // Отступ сверху (высота кнопки + лейбла примерно)
              marginHorizontal: 16,
              backgroundColor: "#fff",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E5EA",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: {width: 0, height: 4},
              elevation: 8,
              maxHeight: SCREEN_HEIGHT * 0.6, // Максимум 60% экрана
            }}
            onPress={(e) => e.stopPropagation()} // Важно: не закрывать при клике внутри списка
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              {options.length === 0 ? (
                <View style={{padding: 14}}>
                  <Text style={{color: "#9E9E9E", textAlign: "center"}}>
                    Нет вариантов
                  </Text>
                </View>
              ) : (
                options.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <TouchableOpacity
                      key={String(option.value)}
                      onPress={() => handleSelect(option.value)}
                      activeOpacity={0.7}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 14,
                        backgroundColor: isSelected ? "#F4F5F6" : "#fff",
                        borderBottomWidth: 1,
                        borderBottomColor: "#F4F5F6",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: isSelected ? "#0A84FF" : "#1F2024",
                          fontWeight: isSelected ? "500" : "400",
                        }}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
      
      {error && (
        <Text style={{marginTop: 6, fontSize: 12, color: "#FF3B30"}}>
          {error}
        </Text>
      )}
    </View>
  );
};