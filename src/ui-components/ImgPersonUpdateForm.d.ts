/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ImgPerson } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ImgPersonUpdateFormInputValues = {
    name?: string;
    image_id?: string;
    forever_age?: number;
    description?: string;
};
export declare type ImgPersonUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    image_id?: ValidationFunction<string>;
    forever_age?: ValidationFunction<number>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ImgPersonUpdateFormOverridesProps = {
    ImgPersonUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    image_id?: PrimitiveOverrideProps<TextFieldProps>;
    forever_age?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ImgPersonUpdateFormProps = React.PropsWithChildren<{
    overrides?: ImgPersonUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    imgPerson?: ImgPerson;
    onSubmit?: (fields: ImgPersonUpdateFormInputValues) => ImgPersonUpdateFormInputValues;
    onSuccess?: (fields: ImgPersonUpdateFormInputValues) => void;
    onError?: (fields: ImgPersonUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ImgPersonUpdateFormInputValues) => ImgPersonUpdateFormInputValues;
    onValidate?: ImgPersonUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ImgPersonUpdateForm(props: ImgPersonUpdateFormProps): React.ReactElement;
