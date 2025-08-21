import { useState } from 'react';
import { z, type ZodEffects, type ZodObject, type ZodTypeAny } from 'zod';


export function useFormValidation<T extends Record<string, unknown>>(
    initialValues: T,
    schema: ZodObject<{ [K in keyof T]: ZodTypeAny }> | ZodEffects<ZodObject<{ [K in keyof T]: ZodTypeAny }>>
) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const validateField = <K extends keyof T>(field: K, value: T[K]) => {
        try {
            const baseSchema = 'innerType' in schema ? schema.innerType() : schema;
            const fieldSchema = z.object({
                [field]: (baseSchema as ZodObject<{ [P in keyof T]: ZodTypeAny }>).shape[field]
            });

            fieldSchema.parse({ [field]: value });
            setErrors(prev => ({ ...prev, [field]: undefined }));
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
            }
        }
    };

    const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
        console.log(field, value);
        setValues(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const validateForm = () => {
        try {
            console.log(values);
            schema.parse(values);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMap: Partial<Record<keyof T, string>> = {};
                error.errors.forEach(err => {
                    if (err.path[0]) {
                        const field = err.path[0] as keyof T;
                        errorMap[field] = err.message;
                    }
                });
                setErrors(errorMap);
            }
            return false;
        }
    };

    const isFormValid = () => {
      console.log(JSON.stringify(errors, null, 2));
      
      console.log("Values\n", JSON.stringify(values, null, 2), "\n");
      
      
        return Object.values(errors).every(error => !error);
    };

    return {
        values,
        errors,
        setErrors,
        handleChange,
        validateForm,
        isFormValid,
        setValues
    };
}