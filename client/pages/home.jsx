import React from 'react';
import Navbar from '../components/Navbar';
import SubNavbar from '../components/Sub-Navbar';
import Container from '../components/Container';

export default function Home(props) {
  return (
    <div>
      <Navbar />
      <SubNavbar />
      <Container />
    </div>
  );
}
