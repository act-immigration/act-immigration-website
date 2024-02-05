import React from 'react';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import Img1 from '../assets/services/1.jpg';
import Img3 from '../assets/services/3.jpg';
import Img4 from '../assets/services/4.jpg';
import Img2 from '../assets/services/2.jpg';

const serviceData = [
  {
    image: Img2,
    title: 'Temporary and permanent residence visas, SCRA reviews and appeals',
    description: 'Temporary and permanent residence visas, SCRA reviews and appeals.',
  },
  {
    image: Img1,
    title: 'Appeals and reviews in terms of the immigration act',
    description: 'An aggrieved applicant may submit representations in the form of an appeal or review  ',
  },
  {
    image: Img4,
    title: 'Types of temporary residence visas',
    description: 'A general work visa may be issued by the Director-General to a foreigner who complies with the prescribed requirements.',
  },
  {
    image: Img3,
    title: 'Permanent residence permit applications',
    description: 'The temporary residence visa must be renewed while the permanent residence application is still pending.',
  },
];
const ServicesSection = () => {
  console.log('ServicesSection rendered');
  return (
    <div id="services">
      <SectionTitle
        title="Services"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2">
        {serviceData.map((service) => (
          <ServiceCard
            key={service.title}
            image={service.image}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;