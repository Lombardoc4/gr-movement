/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Heroes } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function HeroesUpdateForm(props) {
  const {
    id: idProp,
    heroes,
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
    email: "",
    heroName: "",
    heroEmail: "",
    bio: "",
    heroProfile: "",
    heroPhotos: [],
    heroVideo: "",
    framePhoto: [],
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [heroName, setHeroName] = React.useState(initialValues.heroName);
  const [heroEmail, setHeroEmail] = React.useState(initialValues.heroEmail);
  const [bio, setBio] = React.useState(initialValues.bio);
  const [heroProfile, setHeroProfile] = React.useState(
    initialValues.heroProfile
  );
  const [heroPhotos, setHeroPhotos] = React.useState(initialValues.heroPhotos);
  const [heroVideo, setHeroVideo] = React.useState(initialValues.heroVideo);
  const [framePhoto, setFramePhoto] = React.useState(initialValues.framePhoto);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = heroesRecord
      ? { ...initialValues, ...heroesRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setEmail(cleanValues.email);
    setHeroName(cleanValues.heroName);
    setHeroEmail(cleanValues.heroEmail);
    setBio(cleanValues.bio);
    setHeroProfile(cleanValues.heroProfile);
    setHeroPhotos(cleanValues.heroPhotos ?? []);
    setCurrentHeroPhotosValue("");
    setHeroVideo(cleanValues.heroVideo);
    setFramePhoto(cleanValues.framePhoto ?? []);
    setCurrentFramePhotoValue("");
    setErrors({});
  };
  const [heroesRecord, setHeroesRecord] = React.useState(heroes);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Heroes, idProp) : heroes;
      setHeroesRecord(record);
    };
    queryData();
  }, [idProp, heroes]);
  React.useEffect(resetStateValues, [heroesRecord]);
  const [currentHeroPhotosValue, setCurrentHeroPhotosValue] =
    React.useState("");
  const heroPhotosRef = React.createRef();
  const [currentFramePhotoValue, setCurrentFramePhotoValue] =
    React.useState("");
  const framePhotoRef = React.createRef();
  const validations = {
    firstName: [],
    lastName: [],
    email: [],
    heroName: [],
    heroEmail: [],
    bio: [],
    heroProfile: [],
    heroPhotos: [],
    heroVideo: [],
    framePhoto: [],
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
          email,
          heroName,
          heroEmail,
          bio,
          heroProfile,
          heroPhotos,
          heroVideo,
          framePhoto,
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
            Heroes.copyOf(heroesRecord, (updated) => {
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
      {...getOverrideProps(overrides, "HeroesUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              email,
              heroName,
              heroEmail,
              bio,
              heroProfile,
              heroPhotos,
              heroVideo,
              framePhoto,
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
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              email,
              heroName,
              heroEmail,
              bio,
              heroProfile,
              heroPhotos,
              heroVideo,
              framePhoto,
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
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email: value,
              heroName,
              heroEmail,
              bio,
              heroProfile,
              heroPhotos,
              heroVideo,
              framePhoto,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Hero name"
        isRequired={false}
        isReadOnly={false}
        value={heroName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              heroName: value,
              heroEmail,
              bio,
              heroProfile,
              heroPhotos,
              heroVideo,
              framePhoto,
            };
            const result = onChange(modelFields);
            value = result?.heroName ?? value;
          }
          if (errors.heroName?.hasError) {
            runValidationTasks("heroName", value);
          }
          setHeroName(value);
        }}
        onBlur={() => runValidationTasks("heroName", heroName)}
        errorMessage={errors.heroName?.errorMessage}
        hasError={errors.heroName?.hasError}
        {...getOverrideProps(overrides, "heroName")}
      ></TextField>
      <TextField
        label="Hero email"
        isRequired={false}
        isReadOnly={false}
        value={heroEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              heroName,
              heroEmail: value,
              bio,
              heroProfile,
              heroPhotos,
              heroVideo,
              framePhoto,
            };
            const result = onChange(modelFields);
            value = result?.heroEmail ?? value;
          }
          if (errors.heroEmail?.hasError) {
            runValidationTasks("heroEmail", value);
          }
          setHeroEmail(value);
        }}
        onBlur={() => runValidationTasks("heroEmail", heroEmail)}
        errorMessage={errors.heroEmail?.errorMessage}
        hasError={errors.heroEmail?.hasError}
        {...getOverrideProps(overrides, "heroEmail")}
      ></TextField>
      <TextField
        label="Bio"
        isRequired={false}
        isReadOnly={false}
        value={bio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              heroName,
              heroEmail,
              bio: value,
              heroProfile,
              heroPhotos,
              heroVideo,
              framePhoto,
            };
            const result = onChange(modelFields);
            value = result?.bio ?? value;
          }
          if (errors.bio?.hasError) {
            runValidationTasks("bio", value);
          }
          setBio(value);
        }}
        onBlur={() => runValidationTasks("bio", bio)}
        errorMessage={errors.bio?.errorMessage}
        hasError={errors.bio?.hasError}
        {...getOverrideProps(overrides, "bio")}
      ></TextField>
      <TextField
        label="Hero profile"
        isRequired={false}
        isReadOnly={false}
        value={heroProfile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              heroName,
              heroEmail,
              bio,
              heroProfile: value,
              heroPhotos,
              heroVideo,
              framePhoto,
            };
            const result = onChange(modelFields);
            value = result?.heroProfile ?? value;
          }
          if (errors.heroProfile?.hasError) {
            runValidationTasks("heroProfile", value);
          }
          setHeroProfile(value);
        }}
        onBlur={() => runValidationTasks("heroProfile", heroProfile)}
        errorMessage={errors.heroProfile?.errorMessage}
        hasError={errors.heroProfile?.hasError}
        {...getOverrideProps(overrides, "heroProfile")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              heroName,
              heroEmail,
              bio,
              heroProfile,
              heroPhotos: values,
              heroVideo,
              framePhoto,
            };
            const result = onChange(modelFields);
            values = result?.heroPhotos ?? values;
          }
          setHeroPhotos(values);
          setCurrentHeroPhotosValue("");
        }}
        currentFieldValue={currentHeroPhotosValue}
        label={"Hero photos"}
        items={heroPhotos}
        hasError={errors?.heroPhotos?.hasError}
        errorMessage={errors?.heroPhotos?.errorMessage}
        setFieldValue={setCurrentHeroPhotosValue}
        inputFieldRef={heroPhotosRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Hero photos"
          isRequired={false}
          isReadOnly={false}
          value={currentHeroPhotosValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.heroPhotos?.hasError) {
              runValidationTasks("heroPhotos", value);
            }
            setCurrentHeroPhotosValue(value);
          }}
          onBlur={() =>
            runValidationTasks("heroPhotos", currentHeroPhotosValue)
          }
          errorMessage={errors.heroPhotos?.errorMessage}
          hasError={errors.heroPhotos?.hasError}
          ref={heroPhotosRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "heroPhotos")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Hero video"
        isRequired={false}
        isReadOnly={false}
        value={heroVideo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              heroName,
              heroEmail,
              bio,
              heroProfile,
              heroPhotos,
              heroVideo: value,
              framePhoto,
            };
            const result = onChange(modelFields);
            value = result?.heroVideo ?? value;
          }
          if (errors.heroVideo?.hasError) {
            runValidationTasks("heroVideo", value);
          }
          setHeroVideo(value);
        }}
        onBlur={() => runValidationTasks("heroVideo", heroVideo)}
        errorMessage={errors.heroVideo?.errorMessage}
        hasError={errors.heroVideo?.hasError}
        {...getOverrideProps(overrides, "heroVideo")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              heroName,
              heroEmail,
              bio,
              heroProfile,
              heroPhotos,
              heroVideo,
              framePhoto: values,
            };
            const result = onChange(modelFields);
            values = result?.framePhoto ?? values;
          }
          setFramePhoto(values);
          setCurrentFramePhotoValue("");
        }}
        currentFieldValue={currentFramePhotoValue}
        label={"Frame photo"}
        items={framePhoto}
        hasError={errors?.framePhoto?.hasError}
        errorMessage={errors?.framePhoto?.errorMessage}
        setFieldValue={setCurrentFramePhotoValue}
        inputFieldRef={framePhotoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Frame photo"
          isRequired={false}
          isReadOnly={false}
          value={currentFramePhotoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.framePhoto?.hasError) {
              runValidationTasks("framePhoto", value);
            }
            setCurrentFramePhotoValue(value);
          }}
          onBlur={() =>
            runValidationTasks("framePhoto", currentFramePhotoValue)
          }
          errorMessage={errors.framePhoto?.errorMessage}
          hasError={errors.framePhoto?.hasError}
          ref={framePhotoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "framePhoto")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || heroes)}
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
              !(idProp || heroes) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
