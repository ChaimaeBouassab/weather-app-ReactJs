import React, { useState } from 'react';
import { createRoot } from 'react-dom';
import Weather from './App.js'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Weather />);
