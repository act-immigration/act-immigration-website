import React from 'react';
import SectionTitle from './SectionTitle';
import ArticleComponent from './ArticleComponent';

const AboutUs = () => (
  <div className="">
    <SectionTitle
      title="About Us"
    />
    <ArticleComponent
      heading="Who we are"
      lead="We are a team of legal practitioners and consultants,
      specialising in Immigration and Labour-Related matters."
      subheading="Our Director"
      paragraph="
      As a practicing attorney for over a decade, and graduating
      from the Nelson Mandela Metropolitan University, our Director
      is an Immigration Law specialist who has changed thousands of
      lives in the labour and immigration avenue"
      subheading2="Our Mission"
      paragraph2="
      Our mission is to help every client with an immigration or
      labour-related issue efficiently, while yielding nothing but satisfaction for our clients.

      We use our legal background,and innate grit, to fight for the rights of our clients.

      Contact us, book an appointment, and prepare for your life to be changed."
    />
  </div>
);
export default AboutUs;