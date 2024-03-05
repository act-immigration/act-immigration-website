import { useState, useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import StepWizard from "react-step-wizard";
import { Button } from "@material-tailwind/react";
import { RiMailSendLine } from "react-icons/ri";
import ContactInfoFields from "../formsteps/ContactInfoFields";
import PersonalInfoFields from "../formsteps/PersonalInfoFields";
import GeneralServiceFormFields from "../formsteps/GeneralServiceFormFields";
import ImmigrationStatusFields from "../formsteps/ImmigrationStatusFields";

const EnquiryForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    _subject: "Enquiry",
    phonenumber: "",
    email: "",
    gender: "",
    dob: new Date(),
    maritalStatus: "",
    residentialAddress: "",
    entryDate: new Date(),
    passportNumber: "",
    referenceNumber: "",
    serviceType: "",
    elaborate: "",
    documentUpload: [] as File[],
    immigrationStatus: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRefreshClick = () => {
    // refresh the page
    setFormSubmitted(false);
    window.location.reload();
  };

  const handleSubmit = () => {
    console.log("Form Values:", formValues);
    if (
      !formValues.name ||
      !formValues.surname ||
      !formValues.phonenumber ||
      !formValues.email ||
      !formValues.serviceType
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Navigate to the respective page
    navigate("/formmanager", { state: { formValues } });
    setFormSubmitted(true);
  };

  const handleGenderChange = useCallback((value: string | undefined) => {
    console.log("Gender Change Value:", value);
    if (value) {
      setFormValues((prevState) => ({ ...prevState, gender: value }));
    }
  }, []);

  const handleImmigrationStatusChange = (value: string | undefined) => {
    console.log("handleImmigrationStatusChange :", value);
    if (value) {
      setFormValues((prevState) => ({
        ...prevState,
        immigrationStatus: value,
      }));
    }
  };

  const handleMaritalStatusChange = useCallback((value: string | undefined) => {
    console.log("Service Change Value:", value);
    if (value) {
      setFormValues((prevState) => ({ ...prevState, maritalStatus: value }));
    }
  }, []);

  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setFormValues({ ...formValues, elaborate: value });
    }
  };

  const handleServiceChange = useCallback((value: string | undefined) => {
    console.log("Service Change Value:", value);
    if (value) {
      setFormValues((prevState) => ({ ...prevState, serviceType: value }));
    }
  }, []);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormValues((prevState) => ({
        ...prevState,
        appointmentDate: date,
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        appointmentDate: new Date(),
      }));
    }
  };

  const onFileChange = (files: File[]) => {
    setFormValues((prevState) => ({ ...prevState, documentUpload: files }));
  };

  const nextStep = () => {};

  return (
    <div className="mt-8">
      {formSubmitted ? (
        <div>
          <div
            style={{
              backgroundColor: "#6FA1EB",
              color: "white",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            Thank you for your message! We will respond shortly.
          </div>
          <br />
          <Button
            placeholder="Refresh Page"
            className="sendagain"
            onClick={handleRefreshClick}
          >
            <RiMailSendLine
              className="w-4 h-4 me-2"
              style={{ marginRight: "12px" }}
            />
            Send Another Enquiry
          </Button>
        </div>
      ) : (
        <StepWizard>
          <Step1
            formValues={formValues}
            handleChange={handleChange}
            nextStep={nextStep}
          />
          <Step2
            formValues={formValues}
            handleChange={handleChange}
            handleGenderChange={handleGenderChange}
            handleDateChange={handleDateChange}
            handleMaritalStatusChange={handleMaritalStatusChange}
            nextStep={nextStep}
          />
          <Step3
            formValues={formValues}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleImmigrationStatusChange={handleImmigrationStatusChange}
            nextStep={nextStep}
          />
          <Step4
            formValues={formValues}
            handleChange={handleChange}
            handleServiceChange={handleServiceChange}
            handleChangeTextarea={handleChangeTextarea}
            onFileChange={onFileChange}
            handleSubmit={handleSubmit}
          />
        </StepWizard>
      )}
    </div>
  );
};

const Step1 = ({
  formValues,
  handleChange,
  nextStep,
}: {
  formValues: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}) => (
  <>
    <ContactInfoFields formValues={formValues} handleChange={handleChange} />
    <Button
      style={{ backgroundColor: "#0e5a97" }}
      type="button"
      placeholder=""
      onClick={nextStep}
    >
      Next
    </Button>
  </>
);
const Step2 = ({
  formValues,
  handleChange,
  handleGenderChange,
  handleDateChange,
  handleMaritalStatusChange,
  nextStep,
}: {
  formValues: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenderChange: (value: string | undefined) => void;
  handleDateChange: (date: Date | undefined) => void;
  handleMaritalStatusChange: (value: string | undefined) => void;
  nextStep: () => void;
}) => (
  <>
    <PersonalInfoFields
      formValues={formValues}
      handleChange={handleChange}
      handleGenderChange={handleGenderChange}
      handleDateChange={handleDateChange}
      handleMaritalStatusChange={handleMaritalStatusChange}
      nextStep={nextStep}
    />
    <Button
      style={{ backgroundColor: "#0e5a97" }}
      type="button"
      placeholder=""
      onClick={nextStep}
    >
      Next
    </Button>
  </>
);

const Step3 = ({
  formValues,
  handleChange,
  handleDateChange,
  handleImmigrationStatusChange,
  nextStep,
}: {
  formValues: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImmigrationStatusChange: (value: string | undefined) => void;
  handleDateChange: (date: Date) => void;
  nextStep: () => void;
}) => (
  <>
    <ImmigrationStatusFields
      formValues={formValues}
      handleChange={handleChange}
      handleDateChange={handleDateChange}
      handleImmigrationStatusChange={handleImmigrationStatusChange}
      nextStep={nextStep}
    />

    <Button
      style={{ backgroundColor: "#0e5a97" }}
      type="button"
      placeholder=""
      onClick={nextStep}
    >
      Next
    </Button>
  </>
);

const Step4 = ({
  formValues,
  handleChangeTextarea,
  handleServiceChange,
  handleChange,
  handleSubmit,
  onFileChange,
}: {
  formValues: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTextarea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleServiceChange: (value: string | undefined) => void;
  onFileChange: (files: File[]) => void;
}) => (
  <>
    <GeneralServiceFormFields
      formValues={formValues}
      handleChange={handleChange}
      handleChangeTextarea={handleChangeTextarea}
      handleServiceChange={handleServiceChange}
      onFileChange= {onFileChange}
      handleSubmit={handleSubmit}
    />

    <Button
      className="w-full mt-4"
      placeholder={"Button"}
      size="lg"
      type="submit"
      style={{ backgroundColor: "#0e5a97" }}
      onClick={handleSubmit}
    >
      Submit Enquiry
    </Button>
  </>
);

export default EnquiryForm;
