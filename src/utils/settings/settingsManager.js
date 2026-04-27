// settingsManager.js
import { useState, useEffect, useCallback, useRef } from 'react';
import config from './settingsConfig.json';
import { dispatchDesktopEvent } from '../eventBus';

// Helper to simulate async connection changes
const useAsyncStatus = (initialStatuses, onUpdate) => {
  const [statuses, setStatuses] = useState(initialStatuses);
  const timeouts = useRef({});

  const setStatusWithDelay = useCallback((key, newStatus, delay = 1000) => {
    // Clear existing timeout for this key
    if (timeouts.current[key]) clearTimeout(timeouts.current[key]);
    timeouts.current[key] = setTimeout(() => {
      setStatuses(prev => {
        const updated = { ...prev, [key]: newStatus };
        if (onUpdate) onUpdate(key, newStatus);
        return updated;
      });
      delete timeouts.current[key];
    }, delay);
  }, [onUpdate]);

  const updateImmediate = useCallback((key, status) => {
    setStatuses(prev => ({ ...prev, [key]: status }));
    if (onUpdate) onUpdate(key, status);
  }, [onUpdate]);

  const addStatusKey = useCallback((key, initialStatus = 'disconnected') => {
    setStatuses(prev => {
      if (prev[key]) return prev; // already exists
      const updated = { ...prev, [key]: initialStatus };
      if (onUpdate) onUpdate(key, initialStatus);
      return updated;
    });
  }, [onUpdate]);

  const removeStatusKey = useCallback((key) => {
    setStatuses(prev => {
      const { [key]: _, ...rest } = prev; // remove key
      if (onUpdate) onUpdate(key, null); // notify removal
      return rest;
    });
  }, [onUpdate]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeouts.current).forEach(clearTimeout);
    };
  }, []);

  return { statuses, setStatusWithDelay, updateImmediate, addStatusKey, removeStatusKey };
};

export const useSettings = () => {
  // Toggle states
  const [wifiOn, setWifiOn] = useState(config.toggles.wifi.defaultOn);
  const [bluetoothOn, setBluetoothOn] = useState(config.toggles.bluetooth.defaultOn);
  const [airplaneOn, setAirplaneOn] = useState(config.toggles.airplane.defaultOn);
  const [energyOn, setEnergyOn] = useState(config.toggles.energy.defaultOn);

  // Accessibility toggles
  const [accessibility, setAccessibility] = useState(() => {
    const initial = {};
    Object.keys(config.accessibility).forEach(key => {
      initial[key] = false;
    });
    return initial;
  });

  // Project selection
  const [selectedProject, setSelectedProject] = useState(config.project.default);

  // User info
  const [username, setUsername] = useState(config.user.username);
  const [userEmail, setUserEmail] = useState(config.user.userEmail);

  // Sliders
  const [brightness, setBrightness] = useState(config.sliders.brightness.default);
  const [volume, setVolume] = useState(config.sliders.volume.default);

  // Wi‑Fi network statuses
  const initialWifiStatuses = Object.fromEntries(
    Object.entries(config.toggles.wifi.networks).map(([name, data]) => [name, data.defaultStatus])
  );
  const { statuses: wifiStatuses, setStatusWithDelay: setWifiStatusWithDelay, updateImmediate: updateWifiStatus } =
    useAsyncStatus(initialWifiStatuses);

  // Wi‑Fi network password requirements
  const [wifiRequiresPassword] = useState(() =>
    Object.fromEntries(
      Object.entries(config.toggles.wifi.networks).map(([name, data]) => [name, data.requiresPassword])
    )
  );

  // Bluetooth device statuses
  const initialBluetoothStatuses = Object.fromEntries(
    Object.entries(config.toggles.bluetooth.devices).map(([name, data]) => [name, data.defaultStatus])
  );
  const { statuses: bluetoothStatuses, setStatusWithDelay: setBluetoothStatusWithDelay, updateImmediate: updateBluetoothStatus, addStatusKey: addBluetoothStatusKey, removeStatusKey: removeBluetoothStatusKey } =
    useAsyncStatus(initialBluetoothStatuses);
  // Bluetooth device icons
  const [bluetoothIcons] = useState(() =>
    Object.fromEntries(
      Object.entries(config.toggles.bluetooth.devices).map(([name, data]) => [
        name,
        data.icon
      ])
    )
  );


  // Selected Wi‑Fi network (for showing connect button)
  const [selectedWifi, setSelectedWifi] = useState(null);

  const timeoutsRef = useRef({});
  const brightnessTimeoutRef = useRef(null);
  const volumeTimeoutRef = useRef(null);

  // Cleanup all connection timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
      if (brightnessTimeoutRef.current) clearTimeout(brightnessTimeoutRef.current);
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    };
  }, []);

  // Toggle functions with event dispatching
  const toggleWifi = useCallback((source = '') => {
    setWifiOn(prev => {
      const next = !prev;
      if (next && airplaneOn) return prev; // Can't turn on WiFi if Airplane Mode is on
      if (!next) {
        // Disconnect all networks immediately
        Object.keys(wifiStatuses).forEach(network => {
          updateWifiStatus(network, 'disconnected');
        });
      }
      const eventName = next
        ? `${config.toggles.wifi.eventOn}${source}`
        : `${config.toggles.wifi.eventOff}${source}`;
      dispatchDesktopEvent(eventName);
      return next;
    });
  }, [wifiStatuses, updateWifiStatus, airplaneOn]);

  const toggleBluetooth = useCallback((source = '') => {
    setBluetoothOn(prev => {
      const next = !prev;
      if (next && airplaneOn) return prev; // Can't turn on Bluetooth if Airplane Mode is on
      if (!next) {
        Object.keys(bluetoothStatuses).forEach(device => {
          updateBluetoothStatus(device, 'disconnected');
        });
      }
      const eventName = next
        ? `${config.toggles.bluetooth.eventOn}${source}`
        : `${config.toggles.bluetooth.eventOff}${source}`;
      dispatchDesktopEvent(eventName);
      return next;
    });
  }, [bluetoothStatuses, updateBluetoothStatus, airplaneOn]);

  const toggleAirplane = useCallback(() => {
    setAirplaneOn(prev => {
      const next = !prev;
      if (next) {
        // Turning Airplane Mode ON: disable WiFi and Bluetooth
        setWifiOn(false);
        setBluetoothOn(false);
        // Disconnect all WiFi networks
        Object.keys(wifiStatuses).forEach(network => {
          updateWifiStatus(network, 'disconnected');
        });
        // Disconnect all Bluetooth devices
        Object.keys(bluetoothStatuses).forEach(device => {
          updateBluetoothStatus(device, 'disconnected');
        });
        dispatchDesktopEvent(config.toggles.wifi.eventOff);
        dispatchDesktopEvent(config.toggles.bluetooth.eventOff);
      }
      dispatchDesktopEvent(next ? config.toggles.airplane.eventOn : config.toggles.airplane.eventOff);
      return next;
    });
  }, [wifiStatuses, bluetoothStatuses, updateWifiStatus, updateBluetoothStatus]);

  const toggleEnergy = useCallback(() => {
    setEnergyOn(prev => {
      const next = !prev;
      dispatchDesktopEvent(next ? config.toggles.energy.eventOn : config.toggles.energy.eventOff);
      return next;
    });
  }, []);

  const toggleAccessibility = useCallback((label) => {
    setAccessibility(prev => {
      const next = !prev[label];
      const events = config.accessibility[label];
      if (events) {
        dispatchDesktopEvent(next ? events.eventOn : events.eventOff);
      }
      return { ...prev, [label]: next };
    });
  }, []);

  const setProject = useCallback((label) => {
    setSelectedProject(label);
    const option = config.project.options.find(opt => opt.label === label);
    if (option && option.event) {
      dispatchDesktopEvent(option.event);
    }
  }, []);

  const setBrightnessValue = useCallback((value) => {
    setBrightness(value);
    if (brightnessTimeoutRef.current) clearTimeout(brightnessTimeoutRef.current);
    brightnessTimeoutRef.current = setTimeout(() => {
      dispatchDesktopEvent(config.sliders.brightness.event, { value });
    }, 500);
  }, []);

  const setVolumeValue = useCallback((value) => {
    setVolume(value);
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    volumeTimeoutRef.current = setTimeout(() => {
      dispatchDesktopEvent(config.sliders.volume.event, { value });
    }, 500);
  }, []);

  // Wi‑Fi connection logic
  const toggleWifiConnection = useCallback((network, source = '') => {
    if (!wifiOn) return;

    const networkConfig = config.toggles.wifi.networks[network];
    if (networkConfig && networkConfig.requiresPassword) {
      const userPassword = prompt(`Enter password for ${network}:`);
      if (userPassword === null) {
        // User cancelled the prompt
        return;
      } else if (userPassword !== networkConfig.password) {
        alert('Incorrect password');
        return;
      } else {
        dispatchDesktopEvent(`WiFiNetworkPasswordCorrect${source}`, { networkName: network });
      }
    }

    const currentStatus = wifiStatuses[network];
    if (currentStatus === 'connecting' || currentStatus === 'disconnecting') return;

    if (currentStatus === 'connected') {
      updateWifiStatus(network, 'disconnecting');
      const eventName = `WiFiNetworkDisconnect${source}`;
      dispatchDesktopEvent(eventName, { networkName: network });

      const timeoutId = setTimeout(() => {
        updateWifiStatus(network, 'disconnected');
      }, 1000);
      if (timeoutsRef.current[network]) clearTimeout(timeoutsRef.current[network]);
      timeoutsRef.current[network] = timeoutId;
      return;
    }

    const currentConnected = Object.keys(wifiStatuses).find(n => wifiStatuses[n] === 'connected');
    if (currentConnected) {
      updateWifiStatus(currentConnected, 'disconnecting');
      const disconnectEventName = `WiFiNetworkDisconnect${source}`;
      dispatchDesktopEvent(disconnectEventName, { networkName: currentConnected });

      const disconnectTimeout = setTimeout(() => {
        updateWifiStatus(currentConnected, 'disconnected');

        updateWifiStatus(network, 'connecting');
        const connectEventName = `WiFiNetworkConnect${source}`;
        dispatchDesktopEvent(connectEventName, { networkName: network });

        const connectTimeout = setTimeout(() => {
          updateWifiStatus(network, 'connected');
        }, 1000);
        if (timeoutsRef.current[network]) clearTimeout(timeoutsRef.current[network]);
        timeoutsRef.current[network] = connectTimeout;
      }, 1000);
      if (timeoutsRef.current[currentConnected]) clearTimeout(timeoutsRef.current[currentConnected]);
      timeoutsRef.current[currentConnected] = disconnectTimeout;
    } else {
      updateWifiStatus(network, 'connecting');
      const eventName = `WiFiNetworkConnect${source}`;
      dispatchDesktopEvent(eventName, { networkName: network });

      const connectTimeout = setTimeout(() => {
        updateWifiStatus(network, 'connected');
      }, 1000);
      if (timeoutsRef.current[network]) clearTimeout(timeoutsRef.current[network]);
      timeoutsRef.current[network] = connectTimeout;
    }
  }, [wifiOn, wifiStatuses, updateWifiStatus]);

  // Bluetooth connection logic
  const toggleBluetoothConnection = useCallback((device, source = '') => {
    if (!bluetoothOn) return;

    const currentStatus = bluetoothStatuses[device];
    if (currentStatus === 'connecting' || currentStatus === 'disconnecting') return;

    if (currentStatus === 'connected') {
      updateBluetoothStatus(device, 'disconnecting');
      const eventName = `BluetoothDeviceDisconnect${source}`;
      dispatchDesktopEvent(eventName, { deviceName: device });

      const timeoutId = setTimeout(() => {
        updateBluetoothStatus(device, 'disconnected');
      }, 1000);
      if (timeoutsRef.current[device]) clearTimeout(timeoutsRef.current[device]);
      timeoutsRef.current[device] = timeoutId;
    } else if (currentStatus === 'disconnected') {
      updateBluetoothStatus(device, 'connecting');
      const eventName = `BluetoothDeviceConnect${source}`;
      dispatchDesktopEvent(eventName, { deviceName: device });

      const timeoutId = setTimeout(() => {
        updateBluetoothStatus(device, 'connected');
      }, 1000);
      if (timeoutsRef.current[device]) clearTimeout(timeoutsRef.current[device]);
      timeoutsRef.current[device] = timeoutId;
    }
  }, [bluetoothOn, bluetoothStatuses, updateBluetoothStatus]);

  const addBluetoothDevice = useCallback((deviceName) => {
    addBluetoothStatusKey(deviceName, 'disconnected');
    dispatchDesktopEvent('BluetoothDeviceAdd', { deviceName });
  }, [addBluetoothStatusKey]);

  const removeBluetoothDevice = useCallback((deviceName) => {
    removeBluetoothStatusKey(deviceName);
    dispatchDesktopEvent('BluetoothDeviceRemove', { deviceName });
  }, [removeBluetoothStatusKey]);

  // Return all state and actions
  return {
    // Toggles
    wifiOn, bluetoothOn, airplaneOn, energyOn,
    toggleWifi, toggleBluetooth, toggleAirplane, toggleEnergy,

    // Accessibility
    accessibility, toggleAccessibility,

    // Project
    selectedProject, setProject, projectOptions: config.project.options,

    // Sliders
    brightness, volume, setBrightnessValue, setVolumeValue,

    // User
    username, setUsername, userEmail, setUserEmail,

    // Wi‑Fi
    wifiStatuses, selectedWifi, setSelectedWifi, toggleWifiConnection, wifiRequiresPassword,

    // Bluetooth
    bluetoothStatuses, bluetoothIcons, toggleBluetoothConnection, addBluetoothDevice, removeBluetoothDevice,
  };
};