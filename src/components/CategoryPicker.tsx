import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {useState} from "react";

import {useStore} from "@/store/useStore";

type Props = {
  value?: string;

  onChange: (
    categoryId?: string
  ) => void;
};

export const CategoryPicker = (
  {
    value,
    onChange,
  }: Props) => {
  const {categories} = useStore();

  const [opened, setOpened] =
    useState(false);

  const selectedCategory =
    categories.find(
      (category) =>
        category.id === value
    );

  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 8,
          color: "#71727A",
        }}
      >
        Категория
      </Text>

      {/* SELECT */}
      <TouchableOpacity
        onPress={() =>
          setOpened((prev) => !prev)
        }
        style={{
          borderWidth: 1,
          borderColor: "#E5E5EA",

          borderRadius: 12,

          paddingHorizontal: 14,
          paddingVertical: 14,

          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: selectedCategory
              ? "#1F2024"
              : "#9E9E9E",
          }}
        >
          {selectedCategory?.name ||
            "Выберите категорию"}
        </Text>
      </TouchableOpacity>

      {/* DROPDOWN */}
      {opened && (
        <View
          style={{
            marginTop: 8,

            borderWidth: 1,
            borderColor: "#E5E5EA",

            borderRadius: 12,

            backgroundColor: "#fff",

            overflow: "hidden",
          }}
        >
          {categories.map((category) => {
            const isSelected =
              category.id === value;

            return (
              <TouchableOpacity
                key={category.id}
                onPress={() => {
                  onChange(category.id);

                  setOpened(false);
                }}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 14,

                  backgroundColor:
                    isSelected
                      ? "#F4F5F6"
                      : "#fff",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1F2024",
                  }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};