import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import { FaWhatsapp } from 'react-icons/fa';
import { CiPhone } from 'react-icons/ci';
import { Tooltip } from 'flowbite-react';
import EnquiryForm from './EnquiryForm';
import AppointmentForm from './AppointmentForm';

const ContactForm = () => {
  const [activeTab, setActiveTab] = React.useState('enquiry');

const handleTabChange = (tab: string) => {
  setActiveTab(tab);
};

  const handleWhatsAppClick = () => {
    window.location.href = 'https://api.whatsapp.com/send?phone=27723876910';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+27419220833';
  };

  return (
    <div className="w-full">
      <Card placeholder="" className="max-w-md overflow-y-auto">
        <CardHeader
        placeholder={"CardHeader"}
          style={{ backgroundColor: '#0e5a97' }}
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center"
        >
          <Typography placeholder="" variant="h5" color="white">
            Contact US
          </Typography>
        </CardHeader>
        <CardBody placeholder="">
          <Tabs value={activeTab} className="overflow-visible">
            <TabsHeader placeholder="" className="relative z-0 ">
              <Tab  placeholder="" value="enquiry" onClick={() => handleTabChange('enquiry')}>
                Enquiry
              </Tab>
              <Tab placeholder="" value="appointments" onClick={() => handleTabChange('contact')}>
                Appointments
              </Tab>
              <Tab placeholder="" value="contact" onClick={() => handleTabChange('contact')}>
                Contact Us
              </Tab>
            </TabsHeader>
            <TabsBody
            placeholder={"TabsBody"}
              className="!overflow-x-hidden !overflow-y-visible"
            >
              <TabPanel value="enquiry" className="p-0">
                <EnquiryForm />
              </TabPanel>
              <TabPanel value="appointments" className="p-0">
                <AppointmentForm />
              </TabPanel>
              <TabPanel value="contact" className="p-0">
                <div className="flex flex-col items-center justify-center gap-6">
                  <Tooltip content="Chat with us on WhatsApp">
                    <Button
                    placeholder={"Button"}
                      size="lg"
                      onClick={handleWhatsAppClick}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <FaWhatsapp className="h-6 w-6 mr-2" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Call Our Office">
                    <Button
                    placeholder={"Button"}
                      size="lg"
                      onClick={handlePhoneClick}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <CiPhone className="h-6 w-6 mr-2" />
                    </Button>
                  </Tooltip>
                </div>
              </TabPanel>
            </TabsBody>

          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactForm;