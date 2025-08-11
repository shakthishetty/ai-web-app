import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Control, Controller, Path } from "react-hook-form";
import { Input } from "./ui/input";

import { FieldValues } from "react-hook-form";

interface FormFieldType<T extends FieldValues> {
  control: Control<T>;
  type: "text" | "email" | "password";
  placeholder: string;
  name: Path<T>;
  label: string;
}

const FormField = <T extends FieldValues>({ control, type, label, placeholder, name }: FormFieldType<T>) => {
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