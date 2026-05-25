import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

type Category = {
  id: string;
  name: string;
  color?: string;
};

type Props = {
  categories: Category[];
  
  selectedCategoryId?: string;
  
  onSelect: (
    categoryId?: string
  ) => void;
};

export const CategoriesBar = (
  {
    categories,
    selectedCategoryId,
    onSelect,
  }: Props) => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: "#F2F2F7",
        paddingTop: 20,
        paddingBottom: 34,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      >
        {/* ALL */}
        <TouchableOpacity
          onPress={() =>
            onSelect(undefined)
          }
          style={{
            alignItems: "center",
            marginRight: 18,
          }}
        >
          <View
            style={{
              width: 52,
              height: 52,
              
              borderRadius: 999,
              
              backgroundColor:
                selectedCategoryId ===
                undefined
                  ? "#1677FF"
                  : "#DCEBFF",
              
              alignItems: "center",
              justifyContent:
                "center",
            }}
          />
          
          <Text
            style={{
              marginTop: 6,
              
              fontSize: 12,
              
              fontWeight: "500",
              
              color:
                selectedCategoryId ===
                undefined
                  ? "#1677FF"
                  : "#71727A",
            }}
          >
            Все
          </Text>
        </TouchableOpacity>
        
        {/* CATEGORIES */}
        {categories.map(
          (category) => {
            const isActive =
              selectedCategoryId ===
              category.id;
            
            return (
              <TouchableOpacity
                key={category.id}
                onPress={() =>
                  onSelect(
                    category.id
                  )
                }
                style={{
                  alignItems:
                    "center",
                  
                  marginRight: 18,
                }}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    
                    borderRadius: 999,
                    
                    backgroundColor:
                      category.color ||
                      "#E5E5EA",
                    
                    borderWidth:
                      isActive
                        ? 3
                        : 0,
                    
                    borderColor:
                      "#1677FF",
                  }}
                />
                
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: 6,
                    
                    fontSize: 12,
                    
                    fontWeight:
                      "500",
                    
                    color: isActive
                      ? "#1677FF"
                      : "#71727A",
                    
                    maxWidth: 70,
                  }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </ScrollView>
    </View>
  );
};