import React, { createContext, useEffect, useState } from 'react';
import {
  getStores,
  getCustomObject,
  getPaymentMethods,
  uploadImages,
  testConnection,
} from '../../ct-methods';
import Core from '../../ct-methods/core';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CONFIG from '../../../configuration';

export const PaymentContext = createContext();
const { CONTAINER_NAME } = CONFIG;

const PaymentProvider = ({ children }) => {
  const projectKey = useApplicationContext((context) => context.project.key);
  const apiHost = useApplicationContext(
    (context) => context.environment.apiHost
  );
  const [activeStore, setActiveStore] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customObject, setCustomObject] = useState({});
  const [toaster, setToaster] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    transition: Slide,
    severity: 'success',
    message: '',
    autoHideDuration: 3000,
  });
  const { vertical, horizontal, open, transition } = toaster;

  const fetchStores = async () => {
    setLoader(true);
    try {
      const { results } = await getStores(projectKey);
      setLoader(false);
      return results;
    } catch (err) {
      console.error('Failed to fetch stores');
      showToaster({
        severity: 'error',
        open: true,
        message: 'Failed to fetch stores',
      });
      setLoader(false);
    }
  };

  const fetchCustomObjects = async (activeStore) => {
    setLoader(true);
    if (activeStore?.key) {
      try {
        const response = await getCustomObject(projectKey, activeStore?.key);
        setLoader(false);
        hideToaster();
        if (response.value) {
          return response;
        } else {
          return {};
        }
      } catch (err) {
        console.error('Failed to fetch custom objects');
        showToaster({
          severity: 'error',
          open: true,
          message: 'Failed to fetch custom objects',
        });
        setLoader(false);
      }
    }
  };

  const saveCustomObject = async (payload) => {
    setLoader(true);
    if (activeStore?.key) {
      try {
        payload.key = activeStore.key;
        payload.container = CONTAINER_NAME;
        const response = await Core.createCustomObject(payload, projectKey);
        if (response.id) {
          showToaster({
            severity: 'success',
            open: true,
            message: 'Payment settings saved successfully',
          });
          const response = await fetchCustomObjects(activeStore);
          setCustomObject(response);
        }
      } catch (err) {
        console.error('Error saving custom object', err);
        showToaster({
          severity: 'error',
          open: true,
          message: 'Failed to save data',
        });
        setLoader(false);
      }
    } else {
      console.error('No store selected');
      showToaster({
        severity: 'error',
        open: true,
        message: 'No store selected',
      });
      setLoader(false);
    }
  };

  const fetchPaymentOptions = async (activeStore) => {
    setLoader(true);
    if (activeStore?.key) {
      try {
        const response = await getPaymentMethods(
          projectKey,
          activeStore?.key,
          apiHost
        );
        if (response.statusCode === 200) {
          const { result } = response;
          setLoader(false);
          showToaster({
            severity: 'success',
            open: true,
            message: 'Refresh Payment Methods: Success',
          });
          return result;
        } else {
          setLoader(false);
          showToaster({
            severity: 'error',
            open: true,
            message: 'Failed to refresh payment methods',
          });
          return null;
        }
      } catch (err) {
        setLoader(false);
        showToaster({
          severity: 'error',
          open: true,
          message: 'Failed to refresh payment methods',
        });
        return null;
      }
    }
  };

  const imageUploader = async (files, toasterFlag) => {
    setLoader(true);
    try {
      var formdata = new FormData();
      for (let file of files) {
        formdata.append('images', file, file.name);
      }
      const response = await uploadImages(projectKey, formdata, apiHost);
      if (response) {
        const { result, statusCode } = response;
        if (statusCode === 200) {
          setLoader(false);
          if (toasterFlag)
            showToaster({
              severity: 'success',
              open: true,
              message: 'Image uploaded',
            });
          return result;
        } else {
          showToaster({
            severity: 'error',
            open: true,
            message: response?.message,
          });
        }
      }
    } catch (err) {
      console.error('Error saving image', err);
      showToaster({
        severity: 'error',
        open: true,
        message: 'Failed to upload Image',
      });
      setLoader(false);
    }
  };

  const checkConnection = async (payload) => {
    setLoader(true);
    try {
      const response = await testConnection(projectKey, apiHost, payload);
      if (response.statusCode === 200) {
        setLoader(false);
        return response.result;
      } else {
        showToaster({
          severity: 'error',
          open: true,
          message: 'Warning: Please enter correct PSPID, API Key & API Secret.',
        });
      }
    } catch (err) {
      console.error(
        'Warning: Please enter correct PSPID, API Key & API Secret.',
        err.message
      );
      setLoader(false);
    }
  };

  useEffect(async () => {
    const response = await fetchCustomObjects(activeStore);
    setCustomObject(response);
    setLoader(false);
    hideToaster();
  }, [activeStore]);

  const showToaster = async (options) => {
    setToaster({
      ...toaster,
      ...options,
    });
  };

  const hideToaster = async () => {
    setToaster({ ...toaster, open: false, message: '' });
  };

  const setLoader = async (flag) => {
    setLoading(flag);
  };

  return (
    <PaymentContext.Provider
      value={{
        fetchStores,
        showToaster,
        hideToaster,
        setLoader,
        fetchCustomObjects,
        setStores,
        setActiveStore,
        setCustomObject,
        saveCustomObject,
        fetchPaymentOptions,
        imageUploader,
        checkConnection,
        customObject,
        activeStore,
        stores,
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
      <Snackbar
        className="snack-bar"
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
        autoHideDuration={3000}
        TransitionComponent={transition}
      >
        <Alert
          onClose={() => {
            hideToaster();
          }}
          severity={toaster.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toaster.message}
        </Alert>
      </Snackbar>
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
