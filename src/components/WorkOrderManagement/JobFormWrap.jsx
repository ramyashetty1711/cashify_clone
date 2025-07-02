import React, { useState } from 'react';
import DynamicDeviceForm from './WorksheetForm'; // Step 1
import WorkOrderRepairProcess from './WorkOrderRepairProcess'; // Step 2
import RepairedForm from './RepairedForm'; // Step 3

import { Stepper, Step, StepLabel, Box } from '@mui/material';

function JobFormWrap() {
  const [step, setStep] = useState(1);
  const steps = ['Customer Info', 'Job Info', 'Confirm'];

  const renderStepComponent = () => {
    switch (step) {
      case 1: return <DynamicDeviceForm setStep={setStep} />;
      case 2: return <WorkOrderRepairProcess setStep={setStep} />;
      case 3: return <RepairedForm />;
      default: return null;
    }
  };

  return (
    <Box sx={{ p: 4, mx: 'auto' }}>
      {/* Stepper Progress Bar */}
      <Stepper activeStep={step - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Dynamic Step Content */}
      <Box sx={{ mt: 4 }}>
        {renderStepComponent()}
      </Box>
    </Box>
  );
}

export default JobFormWrap;
