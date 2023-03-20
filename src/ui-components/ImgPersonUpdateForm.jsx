/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { ImgPerson } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ImgPersonUpdateForm(props) {
  const {
    id: idProp,
    imgPerson,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    image_id: "",
    forever_age: "",
    description: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [image_id, setImage_id] = React.useState(initialValues.image_id);
  const [forever_age, setForever_age] = React.useState(
    initialValues.forever_age
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = imgPersonRecord
      ? { ...initialValues, ...imgPersonRecord }
      : initialValues;
    setName(cleanValues.name);
    setImage_id(cleanValues.image_id);
    setForever_age(cleanValues.forever_age);
    setDescription(cleanValues.description);
    setErrors({});
  };
  const [imgPersonRecord, setImgPersonRecord] = React.useState(imgPerson);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(ImgPerson, idProp)
        : imgPerson;
      setImgPersonRecord(record);
    };
    queryData();
  }, [idProp, imgPerson]);
  React.useEffect(resetStateValues, [imgPersonRecord]);
  const validations = {
    name: [{ type: "Required" }],
    image_id: [],
    forever_age: [],
    description: [],
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
          name,
          image_id,
          forever_age,
          description,
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
          await DataStore.save(
            ImgPerson.copyOf(imgPersonRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ImgPersonUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              image_id,
              forever_age,
              description,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Image id"
        isRequired={false}
        isReadOnly={false}
        value={image_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image_id: value,
              forever_age,
              description,
            };
            const result = onChange(modelFields);
            value = result?.image_id ?? value;
          }
          if (errors.image_id?.hasError) {
            runValidationTasks("image_id", value);
          }
          setImage_id(value);
        }}
        onBlur={() => runValidationTasks("image_id", image_id)}
        errorMessage={errors.image_id?.errorMessage}
        hasError={errors.image_id?.hasError}
        {...getOverrideProps(overrides, "image_id")}
      ></TextField>
      <TextField
        label="Forever age"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={forever_age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              image_id,
              forever_age: value,
              description,
            };
            const result = onChange(modelFields);
            value = result?.forever_age ?? value;
          }
          if (errors.forever_age?.hasError) {
            runValidationTasks("forever_age", value);
          }
          setForever_age(value);
        }}
        onBlur={() => runValidationTasks("forever_age", forever_age)}
        errorMessage={errors.forever_age?.errorMessage}
        hasError={errors.forever_age?.hasError}
        {...getOverrideProps(overrides, "forever_age")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              image_id,
              forever_age,
              description: value,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || imgPerson)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || imgPerson) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
