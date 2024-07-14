import {
  AcknowledgementsForm,
  ConfirmationForm,
  CourseSelectionForm,
  InformationForm,
} from "@/util/types";
import React from "react";

type Props = {
  isValidAck?: boolean;
  setIsValidAck: React.Dispatch<React.SetStateAction<boolean>>;

  isValidCourseSelection?: boolean;
  setIsValidCourseSelection: React.Dispatch<React.SetStateAction<boolean>>;

  isValidInformation?: boolean;
  setIsValidInformation: React.Dispatch<React.SetStateAction<boolean>>;

  isValidConfirmation?: boolean;
  setIsValidConfirmation: React.Dispatch<React.SetStateAction<boolean>>;

  acknowledgementsForm?: AcknowledgementsForm;
  setAcknowledgementsForm: React.Dispatch<
    React.SetStateAction<AcknowledgementsForm | undefined>
  >;

  courseSelectionForm?: CourseSelectionForm;
  setCourseSelectionForm: React.Dispatch<
    React.SetStateAction<CourseSelectionForm | undefined>
  >;

  informationForm?: InformationForm;
  setInformationForm: React.Dispatch<
    React.SetStateAction<InformationForm | undefined>
  >;

  confirmationForm?: ConfirmationForm;
  setConfirmationForm: React.Dispatch<
    React.SetStateAction<ConfirmationForm | undefined>
  >;
};

const AcademicFormContext = React.createContext<Props>({
  isValidAck: false,
  setIsValidAck: () => false,
  isValidCourseSelection: false,
  setIsValidCourseSelection: () => false,
  isValidInformation: false,
  setIsValidInformation: () => false,
  isValidConfirmation: false,
  setIsValidConfirmation: () => false,
  acknowledgementsForm: undefined,
  setAcknowledgementsForm: () => undefined,
  courseSelectionForm: undefined,
  setCourseSelectionForm: () => undefined,
  informationForm: undefined,
  setInformationForm: () => undefined,
  confirmationForm: undefined,
  setConfirmationForm: () => undefined,
});

export default AcademicFormContext;
