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
export declare type HeroesCreateFormInputValues = {
    firstName?: string;
    lastName?: string;
    email?: string;
    heroName?: string;
    heroEmail?: string;
    state?: string;
    bio?: string;
    heroPhotos?: string[];
    heroVideo?: string;
    framePhoto?: string[];
    heroProfile?: string;
};
export declare type HeroesCreateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    heroName?: ValidationFunction<string>;
    heroEmail?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    bio?: ValidationFunction<string>;
    heroPhotos?: ValidationFunction<string>;
    heroVideo?: ValidationFunction<string>;
    framePhoto?: ValidationFunction<string>;
    heroProfile?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HeroesCreateFormOverridesProps = {
    HeroesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    heroName?: PrimitiveOverrideProps<TextFieldProps>;
    heroEmail?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    bio?: PrimitiveOverrideProps<TextFieldProps>;
    heroPhotos?: PrimitiveOverrideProps<TextFieldProps>;
    heroVideo?: PrimitiveOverrideProps<TextFieldProps>;
    framePhoto?: PrimitiveOverrideProps<TextFieldProps>;
    heroProfile?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HeroesCreateFormProps = React.PropsWithChildren<{
    overrides?: HeroesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HeroesCreateFormInputValues) => HeroesCreateFormInputValues;
    onSuccess?: (fields: HeroesCreateFormInputValues) => void;
    onError?: (fields: HeroesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HeroesCreateFormInputValues) => HeroesCreateFormInputValues;
    onValidate?: HeroesCreateFormValidationValues;
} & React.CSSProperties>;
export default function HeroesCreateForm(props: HeroesCreateFormProps): React.ReactElement;
