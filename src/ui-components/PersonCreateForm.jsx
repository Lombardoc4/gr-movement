/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Person } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PersonCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    foreverAge: "",
    country: "",
    state: "",
    imgUrl: "",
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [foreverAge, setForeverAge] = React.useState(initialValues.foreverAge);
  const [country, setCountry] = React.useState(initialValues.country);
  const [state, setState] = React.useState(initialValues.state);
  const [imgUrl, setImgUrl] = React.useState(initialValues.imgUrl);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setForeverAge(initialValues.foreverAge);
    setCountry(initialValues.country);
    setState(initialValues.state);
    setImgUrl(initialValues.imgUrl);
    setErrors({});
  };
  const validations = {
    firstName: [{ type: "Required" }],
    lastName: [{ type: "Required" }],
    foreverAge: [],
    country: [],
    state: [],
    imgUrl: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          firstName,
          lastName,
          foreverAge,
          country,
          state,
          imgUrl,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Person(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "PersonCreateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              foreverAge,
              country,
              state,
              imgUrl,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={true}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              foreverAge,
              country,
              state,
              imgUrl,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Forever age"
        isRequired={false}
        isReadOnly={false}
        value={foreverAge}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              foreverAge: value,
              country,
              state,
              imgUrl,
            };
            const result = onChange(modelFields);
            value = result?.foreverAge ?? value;
          }
          if (errors.foreverAge?.hasError) {
            runValidationTasks("foreverAge", value);
          }
          setForeverAge(value);
        }}
        onBlur={() => runValidationTasks("foreverAge", foreverAge)}
        errorMessage={errors.foreverAge?.errorMessage}
        hasError={errors.foreverAge?.hasError}
        {...getOverrideProps(overrides, "foreverAge")}
      ></TextField>
      <TextField
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              foreverAge,
              country: value,
              state,
              imgUrl,
            };
            const result = onChange(modelFields);
            value = result?.country ?? value;
          }
          if (errors.country?.hasError) {
            runValidationTasks("country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("country", country)}
        errorMessage={errors.country?.errorMessage}
        hasError={errors.country?.hasError}
        {...getOverrideProps(overrides, "country")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              foreverAge,
              country,
              state: value,
              imgUrl,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="Img url"
        isRequired={false}
        isReadOnly={false}
        value={imgUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              foreverAge,
              country,
              state,
              imgUrl: value,
            };
            const result = onChange(modelFields);
            value = result?.imgUrl ?? value;
          }
          if (errors.imgUrl?.hasError) {
            runValidationTasks("imgUrl", value);
          }
          setImgUrl(value);
        }}
        onBlur={() => runValidationTasks("imgUrl", imgUrl)}
        errorMessage={errors.imgUrl?.errorMessage}
        hasError={errors.imgUrl?.hasError}
        {...getOverrideProps(overrides, "imgUrl")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
