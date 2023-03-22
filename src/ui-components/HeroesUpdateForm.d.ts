/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Heroes } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HeroesUpdateFormInputValues = {
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
export declare type HeroesUpdateFormValidationValues = {
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
export declare type HeroesUpdateFormOverridesProps = {
    HeroesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type HeroesUpdateFormProps = React.PropsWithChildren<{
    overrides?: HeroesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    heroes?: Heroes;
    onSubmit?: (fields: HeroesUpdateFormInputValues) => HeroesUpdateFormInputValues;
    onSuccess?: (fields: HeroesUpdateFormInputValues) => void;
    onError?: (fields: HeroesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HeroesUpdateFormInputValues) => HeroesUpdateFormInputValues;
    onValidate?: HeroesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HeroesUpdateForm(props: HeroesUpdateFormProps): React.ReactElement;
