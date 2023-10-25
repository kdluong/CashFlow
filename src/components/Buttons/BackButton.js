import React from 'react';
import { accentColor } from '../../constants/constants';
import IconSmall from '../Icons/IconSmall';

function BackButton() {
  return <IconSmall name="chevron-back-sharp" color="white" backgroundColor={accentColor} />;
}

export default BackButton;
