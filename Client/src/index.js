import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './custom.css';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
