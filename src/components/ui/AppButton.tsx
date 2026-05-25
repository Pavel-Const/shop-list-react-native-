import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";

type Variant =
  | "primary"
  | "danger";
type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};
export const AppButton = (
  {
    title,
    onPress,
    variant = "primary",
    disabled,
    style,
    textStyle,
  }: Props) => {
  
  const backgroundColor =
    variant === "danger"
      ? "#FF3B30"
      : "#1677FF";
  
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          height: 44,
          borderRadius: 12,
          backgroundColor,
          width: 168,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
          opacity: disabled
            ? 0.5
            : 1,
          shadowColor: backgroundColor,
          shadowOpacity: 0.25,
          shadowRadius: 12,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          elevation: 4,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: "#fff",
            fontSize: 14,
            fontWeight: "700",
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};