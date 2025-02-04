import { Rule } from "antd/es/form"
import moment, { Moment } from "moment";

// export const validateFullName = (val: string) => /^[A-Z][a-z]+\s[A-Z][a-z]$/.test(val)

// export const validateEmail = ({ message = "Invalid Email provided", regex = { pattern: /^[A-Za-z0-9.\-+%]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/, message: "Invalid email supplied" }, required = false, } ): Rule[] => [
//     {
//         message, 
//         async validator(_, val) {
//             if (val === undefined && required === false) {
//                 return true
//             }
//             if (val === undefined) {
//           throw new Error("Field is required!");
//         }
//         if (val.trim() === "") {
//           throw new Error("Field is required!");
//           }
//           if (regex !== undefined && !regex.pattern.test(val)) {
//                 throw new Error("Invalid regex detected!");
//             }
//             return true
//         }
//     }
// ]

// import {
//     DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB,
//     DEFAULT_MAX_FILE_UPLOAD_COUNT,
// } from "@/constants";
// import moment, { Moment } from "moment";
// import { FormInstance, Rule } from "antd/es/form";

export const isEmailValid = (val: string): boolean => {
    // Regular expression pattern to match a valid email address
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Test the provided value against the pattern
    return emailPattern.test(val);
};

const isValidNumber = (value: number | string) =>
    !isNaN(parseFloat(value?.toString())) && isFinite(+value);

export const isPhoneNumberValid = (val: string): boolean => {
    // Regular expression pattern to match a valid North American phone number with dashes
    const phonePattern = /^[0-9]*$/;

    // Test the provided value against the pattern
    return phonePattern.test(val);
};

// export const createFileValidationRule = (
//     props: TCreateFileValidationRuleProps
// ): Rule => {
//     const {
//         required = true,
//         maxFileSize = DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB,
//         allowedFileTypes,
//         maxFileUploadCount = DEFAULT_MAX_FILE_UPLOAD_COUNT,
//     } = props;
//     return {
//         required,

//         validator: async (_, value) => {
//             // non required
//             if (required === false && Array.isArray(value) === false) {
//                 return true;
//             }
//             if (
//                 required === false &&
//                 Array.isArray(value) === true &&
//                 value?.length === 0
//             ) {
//                 return true;
//             }
//             // required
//             if (Array.isArray(value) === false || value?.length === 0) {
//                 throw new Error("Please upload a file");
//             }
//             if (Array.isArray(value) === true && value?.length > maxFileUploadCount) {
//                 throw new Error(
//                     "You can only upload a maximum of " + maxFileUploadCount + " files"
//                 );
//             }
//             (value as any[]).forEach((item, i) => {
//                 const file = item?.originFileObj;
//                 const isLt2M = file.size / 1024 / 1024 <= maxFileSize;

//                 if (!isLt2M) {
//                     throw new Error(
//                         `File ${i + 1} must smaller than or equal to ${maxFileSize}MB!`
//                     );
//                 }
//                 if (!allowedFileTypes.includes(file.type as TFileType)) {
//                     throw new Error(
//                         `File ${i + 1}: This file type (${file.type}) is not allowed!`
//                     );
//                 }
//             });

//             return true;
//         },
//     };
// };

export const generalValidationRules = (
    props: { required?: boolean; message?: string } = {
        required: true,
        message: "Field is required!",
    }
): Rule[] => {
    const { message, required } = props;
    return [{ message, required }];
};
export const emailValidationRules = (
    props: { required?: boolean; message?: string } = {
        required: true,
        message: "Field is required!",
    }
): Rule[] => {
    const { message, required } = props;
    return [
        {
            required,
            message,
        },
        {
            type: "email",
            message: "Invalid Email Address",
        },
    ];
};
export const comparePasswordValidationRules = ({
    pwdFieldName = "password",
    required = true,
}: {
    pwdFieldName?: string;
    required?: boolean;
}): Rule[] => {
    return [
        {
            required,
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue(pwdFieldName) === value) {
                    return Promise.resolve();
                }
                return Promise.reject(
                    new Error("The confirm password that you entered do not match!")
                );
            },
        }),
    ];
};
export const passwordValidationRules = (
    props: { required?: boolean; message?: string } = {
        required: true,
        message: "Field is required!",
    }
): Rule[] => {
    const { message, required } = props;

    return [
        {
            required,
            message,
        },

        {
            validator: async (_, value) => {
                const paswd =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

                if (!paswd.test(value))
                    throw new Error(
                        "Password should contain at least one digit and special character and a letter in uppercase, and least 8 characters"
                    );
                // if (false) throw new Error("Something wrong!");
                return true;
            },
        },
    ];
};
export const textValidationRules = (
    props: {
        required?: boolean;
        message?: string;
        whitespace?: boolean;
        max?: number;
        min?: number;
        regex?: { pattern: RegExp; message?: string };
    } = {
            required: true,
            message: "Field is required!",
            whitespace: true,
        }
): Rule[] => {
    const { message, required, whitespace, max, min, regex } = props;
    return [
        {
            message,
            required,
            whitespace,
            validator: async (_, value?: string) => {
                if (value === undefined && required === false) {
                    return true;
                }
                if (value === undefined) {
                    throw new Error("Field is required!");
                }
                if (value.trim() === "") {
                    throw new Error("Field is required!");
                }
                if (max !== undefined && value.length > max) {
                    throw new Error(`A maximum of ${max} characters are allowed!`);
                }
                if (min !== undefined && value.length < min) {
                    throw new Error(`A minimum of ${min} characters are allowed!`);
                }
                if (regex !== undefined && !regex.pattern.test(value)) {
                    throw new Error(regex.message ?? "Regex pattern mismatch!");
                }

                return true;
            },
        },
    ];
};

export const phoneNumberValidationRules = (
    props: { required?: boolean; message?: string; whitespace?: boolean } = {
        required: true,
        message: "Please enter a valid phone number",
        whitespace: true,
    }
): Rule[] => {
    const { message, required, whitespace } = props;

    return [
        {
            required,
            whitespace,
            validator: async (_, value?: string | number) => {
                if ((value === undefined || !value) && required)
                    throw new Error("Field is required!");
                if (
                    typeof value === "number" &&
                    isPhoneNumberValid(value.toString()) === false
                )
                    throw new Error(message);
                if (typeof value === "string" && isPhoneNumberValid(value) === false)
                    throw new Error(message);
                return true;
            },
        },
    ];
};

export const fullNameHasToHaveFirstAndLastNameRule = (
    required: boolean = true
): Rule => {
    return {
        required,
        validator: async (val, value: string) => {
            if (typeof value !== "string") {
                throw new Error("Please enter a valid string!");
            }
            // check if the first and last name exist
            const fullName = value.split(" ");
            if (fullName.length < 2) {
                throw new Error("Please enter a first and last name!");
            }
            if (fullName?.[0]?.trim() === "") {
                throw new Error("Please enter a non empty first name!");
            }
            if (fullName?.[1]?.trim() === "") {
                throw new Error("Please enter a non empty last name!");
            }

            return true;
        },
    };
};

export const numberHasToBeInRangeRule = (_min: number, _max: number): Rule => ({
    validator: async (_, value?: string | number) => {
        if (value === undefined) {
            throw new Error("Please enter a number!");
        }
        if (typeof value !== "number") {
            throw new Error("Please enter a valid number!");
        }
        if ((+value >= _min && +value <= _max) === false) {
            throw new Error(`Please enter a within the range of ${_min} to ${_max}`);
        }

        return true;
    },
});

export const numberHasToBeLesserThanValueRule = (props: {
    required?: boolean;
    value: number;
}): Rule => {
    const { required = true, value: compareValue } = props;
    return {
        required,
        validator: async (_, value?: string | number) => {
            if (value === undefined) {
                throw new Error("Please enter a number!");
            }
            if (!isValidNumber) {
                throw new Error("Please enter a valid number!");
            }
            if (+value >= compareValue) {
                throw new Error(`Please enter a number lesser than ${compareValue}`);
            }

            return true;
        },
    };
};
export const numberHasToBeGreaterThanValueRule = (props: {
    required?: boolean;
    value: number;
}): Rule => {
    const { required = true, value: compareValue } = props;
    return {
        required,
        validator: async (_, value?: string | number) => {
            if (value === undefined) {
                throw new Error("Please enter a number!");
            }
            if (!isValidNumber) {
                throw new Error("Please enter a valid number!");
            }
            if (+value <= compareValue) {
                throw new Error(`Please enter a number greater than ${compareValue}`);
            }

            return true;
        },
    };
};
export const numberValidationRule = (props: { required?: boolean }): Rule => {
    const { required = true } = props;
    return {
        required,
        validator: async (_, value?: string | number) => {
            if (value === undefined) {
                throw new Error("Please enter a number!");
            }
            if (!isValidNumber) {
                throw new Error("Please enter a valid number!");
            }

            return true;
        },
    };
};

// export const validateFormFieldsBeforeProceeding = async ({
//     onProceed,
//     form,
//     fieldsToValidate,
// }: {
//     onProceed: () => void;
//     form: FormInstance;
//     fieldsToValidate: string[];
// }) => {
//     let hasErrors = false;
//     try {
//         await form.validateFields();
//     } catch (error: unknown) {
//         let validationErr = error as TAntdFormValidationError;
//         if (
//             validationErr.errorFields.some((vals) =>
//                 fieldsToValidate.some((field) => vals.name.includes(field))
//             )
//         )
//             hasErrors = true;
//     } finally {
//         if (!hasErrors) onProceed();
//     }
// };

export const isDateGreaterThanCurrentDay = (date: Moment) => {
    const currentDate = moment();
    if (!date) return;
    return date.isAfter(currentDate, "day"); // Check if selected date is greater than the current day
};

export const validateMultipleEmailsRule = (props: {
    required?: boolean;
}): Rule => {
    const { required = true } = props;
    return {
        required,
        validator: async (_, value) => {
            // non required
            if (typeof value !== "string") {
                throw new Error("Please enter a valid email!");
            }

            const emailValues = value.split(",").map((item) => item.trim());

            emailValues.forEach((item, i) => {
                if (isEmailValid(item) === false) {
                    throw new Error(`Please enter a valid email at ${i + 1}`);
                }
            });

            return true;
        },
    };
};
export const dateHasToBeGreaterThanCurrentDayRule = (): Rule => ({
    validator: async (_, value) => {
        if (!isDateGreaterThanCurrentDay(value)) {
            throw new Error("Please select a date greater than the current day");
        }

        return true;
    },
});
