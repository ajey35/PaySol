import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import process from 'process';
import DApp from './components/Dapp';
import { Buffer } from 'buffer';
window.Buffer = Buffer
window.process = process;
ReactDOM.createRoot(document.getElementById('root')).render(
   <DApp/>
);
