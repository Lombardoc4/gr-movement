/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ImgPersonCreateFormInputValues = {
    name?: string;
    image_id?: string;
    forever_age?: number;
    description?: string;
};
export declare type ImgPersonCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    image_id?: ValidationFunction<string>;
    forever_age?: ValidationFunction<number>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ImgPersonCreateFormOverridesProps = {
    ImgPersonCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    image_id?: PrimitiveOverrideProps<TextFieldProps>;
    forever_age?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ImgPersonCreateFormProps = React.PropsWithChildren<{
    overrides?: ImgPersonCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ImgPersonCreateFormInputValues) => ImgPersonCreateFormInputValues;
    onSuccess?: (fields: ImgPersonCreateFormInputValues) => void;
    onError?: (fields: ImgPersonCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ImgPersonCreateFormInputValues) => ImgPersonCreateFormInputValues;
    onValidate?: ImgPersonCreateFormValidationValues;
} & React.CSSProperties>;
export default function ImgPersonCreateForm(props: ImgPersonCreateFormProps): React.ReactElement;
