import { useStore } from "@/store/useStore";
import {AppSelect} from "@/components/ui/AppSelect";

type Props = {
  value?: string;
  onChange: (categoryId?: string) => void;
  error?: string;
};

export const CategoryPicker = ({ value, onChange, error }: Props) => {
  const { categories } = useStore();
  
  // Преобразуем категории в формат, понятный селекту
  const options = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));
  
  return (
    <AppSelect
      label="Категория"
      placeholder="Выберите категорию"
      options={options}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};