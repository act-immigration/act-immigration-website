import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import { Typography, Card, Button } from "@material-tailwind/react";
import SectionTitle from "../components/SectionTitle";
import ContentContainer from "../components/ContentContainer";
import SectionContainer from "../components/SectionContainer";
import MessageAlert from "../components/alerts/MessageAlerts";
import { MdCheckCircle } from "react-icons/md";

interface FormValuesInterface {
  [key: string]: string | undefined | Date | File | File[];
}

interface EnquiryManagerProps {
  formValues: FormValuesInterface;
  onSubmit: (formData: FormValuesInterface) => void;
}

const EnquiryManager = ({ formValues }: EnquiryManagerProps) => {
  const location = useLocation();
  const extractedFormValues: FormValuesInterface =
    location.state?.formValues || {};
  const mergedFormValues = { ...formValues, ...extractedFormValues };

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowAlert(false); // Hide the alert when the component mounts
  }, []);

  // const handleAlertActionClick = () => {
  //   setShowAlert(false);
  //   navigate("/login");
  // };

  const handleAlertActionClick = () => {
    setShowAlert(false);
    navigate("/signup", { state: { prefillEmail: mergedFormValues.email } });
  };


  const formatDate = (date: string | Date | File | File[]) => {
    if (date instanceof Date) {
      // Check if the date is not invalid
      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
      }
      return "";
    } else if (date instanceof File) {
      // handle File type
      return date.name;
    } else if (
      Array.isArray(date) &&
      date.every((item) => item instanceof File)
    ) {
      // handle File[] type
      return date.map((file) => file.name).join(", ");
    } else {
      return date;
    }
  };

const handleSubmit = async () => {
  try {
    console.log("Merged Form Values:", mergedFormValues);
    const formData = new FormData();
    // Append document uploads to formData
    if (Array.isArray(mergedFormValues.documentUpload)) {
      mergedFormValues.documentUpload.forEach((file, index) => {
        formData.append(`enquiry[document_upload][${index}]`, file);
      });
    }

    const enquiryInput = {
      name: mergedFormValues.name || "",
      surname: mergedFormValues.surname || "",
      phonenumber: mergedFormValues.phonenumber || "",
      email: mergedFormValues.email || "",
      gender: mergedFormValues.gender || "",
      dob: formatDate(mergedFormValues.dob || ""),
      maritalStatus: mergedFormValues.maritalStatus || "",
      residentialAddress: mergedFormValues.residentialAddress || "",
      immigrationStatus: mergedFormValues.immigrationStatus || "",
      entryDate: formatDate(mergedFormValues.entryDate || ""),
      passportNumber: mergedFormValues.passportNumber || "",
      referenceNumber: mergedFormValues.referenceNumber || "",
      serviceType: mergedFormValues.serviceType || "",
      elaborate: mergedFormValues.elaborate || "",
      contact_info: {
        name: mergedFormValues.name || "",
        surname: mergedFormValues.surname || "",
        phonenumber: mergedFormValues.phonenumber || "",
        email: mergedFormValues.email || "",
      },
    };
    // Append enquiryInput object to formData
    Object.entries(enquiryInput).forEach(([key, value]) => {
      // Exclude 'document_upload' key
      if (key !== "document_upload") {
        if (key === "contact_info") {
          formData.append(`enquiry[${key}]`, JSON.stringify(value));
        } else {
          formData.append(`enquiry[${key}]`, String(value));
        }
      }
    });

    console.log("Enquiry Input in Manger:", enquiryInput);
    const response = await axios.post("http://127.0.0.1:3000/enquiries", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); // POST request to the API endpoint
    console.log("Form Submitted:", response.data);
    setShowAlert(true); // Show success alert on successful submit
  } catch (error) {
    console.error("Error submitting form:", error);
    console.log("Error response data:", (error as any).response.data);
  }
};

  const serviceType = mergedFormValues["serviceType"];
  return (
    <div className="mt-8">
      <SectionContainer>
        <SectionTitle title={String(serviceType) + " PreConsultation"} />
        <ContentContainer>
          <Card placeholder="" className="mb-8">
            <div className="card-body">
              {showAlert && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                  <MessageAlert
                    open={true}
                    message="Thank you for your Submission. Please proceed to signup to track your Pre-Consultation "
                    actionText="Continue"
                    onActionClick={handleAlertActionClick}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-1 items-center justify-center mb-4">
                {Object.entries(mergedFormValues).map(([key, value]) => (
                  <div key={key} className="mb-4 flex justify-center">
                    <Typography placeholder="" className="font-bold mr-2">
                      {key}:
                    </Typography>
                    <div className="flex items-center">
                      {Array.isArray(value) && value.length > 0 ? (
                        <ul>
                          {value.map((file: File, index: number) => (
                            <li key={index} className="mr-2">
                              <FaFilePdf className="mr-2" />
                              <a
                                href={URL.createObjectURL(file)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                              >
                                {file.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : typeof value === "object" && value instanceof File ? (
                        <a
                          href={URL.createObjectURL(value)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaFilePdf className="mr-2" />
                          {value.name}
                        </a>
                      ) : (
                        <>
                          <MdCheckCircle className="text-green-500 mr-2" />
                          <Typography placeholder="">
                            {value?.toString()}
                          </Typography>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 mb-4 flex items-center justify-center">
                <Button placeholder="" color="green" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </Card>
        </ContentContainer>
      </SectionContainer>
    </div>
  );
};

export default EnquiryManager;
