import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import {useMemo, useState, useCallback, useRef, useEffect} from "react";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  suggestions?: string[];
  onSuggestionPress?: (value: string) => void;
};

export const AppInput = (
  {
    label,
    error,
    style,
    suggestions = [],
    onSuggestionPress,
    ...props
  }: Props) => {
  const {value} = props;
  
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const filteredSuggestions = useMemo(
    () => suggestions.filter((s): s is string => Boolean(s)),
    [suggestions]
  );
  
  // Убираем задержку при повторном фокусе
  const handleFocus = useCallback(() => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setOpen(true);
    setFocused(true);
  }, []);
  
  // Задержка onBlur, чтобы избежать конфликта с onPress на подсказке
  const handleBlur = useCallback(() => {
    blurTimeoutRef.current = setTimeout(() => {
      setFocused(false);
    }, 150);
  }, []);
  
  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);
  
  useEffect(() => {
    if (suggestions.length > 1) {
      setOpen(true);
    }
  }, [filteredSuggestions]);
  
  const handleSuggestionPress = useCallback(
    (value: string) => {
      setOpen(false);
      onSuggestionPress?.(value);
    },
    [onSuggestionPress]
  );
  
  return (
    <View style={{marginBottom: 20, position: "relative", width: "100%"}}>
      {/* LABEL */}
      {label && (
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 8,
            color: "#71727A",
          }}
        >
          {label}
        </Text>
      )}
      
      {/* INPUT */}
      <TextInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor="#9E9E9E"
        style={[
          {
            borderWidth: 1,
            borderColor: error
              ? "#FF3B30"
              : focused
                ? "#0A84FF"
                : "#E5E5EA",
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 14,
            fontSize: 16,
            color: "#1F2024",
            backgroundColor: "#fff",
          },
          style,
        ]}
      />
      
      {/* DROPDOWN */}
      {open && (
        <View
          style={{
            zIndex: 10,
            position: "absolute",
            top: "100%",
            marginTop: 4,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#E5E5EA",
            borderRadius: 12,
            overflow: "hidden",
            // z-index убран: в RN важен порядок рендера (дропдаун идёт после инпута → будет сверху)
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: {width: 0, height: 4},
            elevation: 6,
          }}
        >
          {filteredSuggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion}
              activeOpacity={0.7}
              onPress={() => handleSuggestionPress(suggestion)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: "#F4F5F6",
              }}
            >
              <Text style={{fontSize: 16, color: "#1F2024"}}>
                {suggestion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {/* ERROR */}
      {error && (
        <Text
          style={{
            marginTop: 6,
            fontSize: 12,
            color: "#FF3B30",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};