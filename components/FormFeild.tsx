import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Control, Controller, Path } from "react-hook-form";
import { Input } from "./ui/input";

interface FormFieldType<T extends string> {
  control: Control<T>;
  type: "text" | "email" | "password";
  input: boolean;
  placeholder: string;
  name: Path<T>;
}

const FormField = <T extends string>({ control, type, label, placeholder, name }: FormFieldType<T>) => {
  return (
    <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} {...field}  type={type} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
  )
}

export default FormField;