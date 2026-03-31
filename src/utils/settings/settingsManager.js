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

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeouts.current).forEach(clearTimeout);
    };
  }, []);

  return { statuses, setStatusWithDelay, updateImmediate };
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

  // Sliders
  const [brightness, setBrightness] = useState(config.sliders.brightness.default);
  const [volume, setVolume] = useState(config.sliders.volume.default);

  // Wi‑Fi network statuses
  const initialWifiStatuses = Object.fromEntries(
    Object.entries(config.toggles.wifi.networks).map(([name, data]) => [name, data.defaultStatus])
  );
  const { statuses: wifiStatuses, setStatusWithDelay: setWifiStatusWithDelay, updateImmediate: updateWifiStatus } =
    useAsyncStatus(initialWifiStatuses);

  // Bluetooth device statuses
  const initialBluetoothStatuses = Object.fromEntries(
    Object.entries(config.toggles.bluetooth.devices).map(([name, data]) => [name, data.defaultStatus])
  );
  const { statuses: bluetoothStatuses, setStatusWithDelay: setBluetoothStatusWithDelay, updateImmediate: updateBluetoothStatus } =
    useAsyncStatus(initialBluetoothStatuses);

  // Selected Wi‑Fi network (for showing connect button)
  const [selectedWifi, setSelectedWifi] = useState(null);

  const timeoutsRef = useRef({});

  // Cleanup all connection timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  // Toggle functions with event dispatching
  const toggleWifi = useCallback(() => {
    setWifiOn(prev => {
      const next = !prev;
      if (!next) {
        // Disconnect all networks immediately
        Object.keys(wifiStatuses).forEach(network => {
          updateWifiStatus(network, 'disconnected');
        });
      }
      dispatchDesktopEvent(next ? config.toggles.wifi.eventOn : config.toggles.wifi.eventOff);
      return next;
    });
  }, [wifiStatuses, updateWifiStatus]);

  const toggleBluetooth = useCallback(() => {
    setBluetoothOn(prev => {
      const next = !prev;
      if (!next) {
        Object.keys(bluetoothStatuses).forEach(device => {
          updateBluetoothStatus(device, 'disconnected');
        });
      }
      dispatchDesktopEvent(next ? config.toggles.bluetooth.eventOn : config.toggles.bluetooth.eventOff);
      return next;
    });
  }, [bluetoothStatuses, updateBluetoothStatus]);

  const toggleAirplane = useCallback(() => {
    setAirplaneOn(prev => {
      const next = !prev;
      dispatchDesktopEvent(next ? config.toggles.airplane.eventOn : config.toggles.airplane.eventOff);
      return next;
    });
  }, []);

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
    dispatchDesktopEvent(config.sliders.brightness.event, { value });
  }, []);

  const setVolumeValue = useCallback((value) => {
    setVolume(value);
    dispatchDesktopEvent(config.sliders.volume.event, { value });
  }, []);

  // Wi‑Fi connection logic
  const toggleWifiConnection = useCallback((network) => {
    if (!wifiOn) return;

    const currentStatus = wifiStatuses[network];

    // Prevent multiple clicks while connecting/disconnecting
    if (currentStatus === 'connecting' || currentStatus === 'disconnecting') return;

    // If network is already connected, disconnect it
    if (currentStatus === 'connected') {
      // Immediately set to "disconnecting"
      updateWifiStatus(network, 'disconnecting');
      dispatchDesktopEvent('WiFiNetworkDisconnect', { networkName: network });

      // Schedule final "disconnected" after 1 second
      const timeoutId = setTimeout(() => {
        updateWifiStatus(network, 'disconnected');
      }, 1000);
      // Store timeout for cleanup (optional)
      // We'll use a ref to store timeouts per network
      if (timeoutsRef.current[network]) clearTimeout(timeoutsRef.current[network]);
      timeoutsRef.current[network] = timeoutId;
      return;
    }

    // Otherwise, attempt to connect
    // First, disconnect any currently connected network
    const currentConnected = Object.keys(wifiStatuses).find(n => wifiStatuses[n] === 'connected');
    if (currentConnected) {
      // Disconnect current network immediately
      updateWifiStatus(currentConnected, 'disconnecting');
      dispatchDesktopEvent('WiFiNetworkDisconnect', { networkName: currentConnected });

      // After 1 second, finish disconnect and start connecting to the new network
      const disconnectTimeout = setTimeout(() => {
        updateWifiStatus(currentConnected, 'disconnected');

        // Now connect to the target network
        updateWifiStatus(network, 'connecting');
        dispatchDesktopEvent('WiFiNetworkConnect', { networkName: network });

        const connectTimeout = setTimeout(() => {
          updateWifiStatus(network, 'connected');
        }, 1000);
        if (timeoutsRef.current[network]) clearTimeout(timeoutsRef.current[network]);
        timeoutsRef.current[network] = connectTimeout;
      }, 1000);
      if (timeoutsRef.current[currentConnected]) clearTimeout(timeoutsRef.current[currentConnected]);
      timeoutsRef.current[currentConnected] = disconnectTimeout;
    } else {
      // No current connection – connect directly
      updateWifiStatus(network, 'connecting');
      dispatchDesktopEvent('WiFiNetworkConnect', { networkName: network });

      const connectTimeout = setTimeout(() => {
        updateWifiStatus(network, 'connected');
      }, 1000);
      if (timeoutsRef.current[network]) clearTimeout(timeoutsRef.current[network]);
      timeoutsRef.current[network] = connectTimeout;
    }
  }, [wifiOn, wifiStatuses, updateWifiStatus]);

  // Bluetooth connection logic
  const toggleBluetoothConnection = useCallback((device) => {
    if (!bluetoothOn) return;

    const currentStatus = bluetoothStatuses[device];

    // Prevent multiple clicks
    if (currentStatus === 'connecting' || currentStatus === 'disconnecting') return;

    if (currentStatus === 'connected') {
      // Disconnect
      updateBluetoothStatus(device, 'disconnecting');
      dispatchDesktopEvent('BluetoothDeviceDisconnect', { deviceName: device });

      const timeoutId = setTimeout(() => {
        updateBluetoothStatus(device, 'disconnected');
      }, 1000);
      if (timeoutsRef.current[device]) clearTimeout(timeoutsRef.current[device]);
      timeoutsRef.current[device] = timeoutId;
    } else if (currentStatus === 'disconnected') {
      // Connect
      updateBluetoothStatus(device, 'connecting');
      dispatchDesktopEvent('BluetoothDeviceConnect', { deviceName: device });

      const timeoutId = setTimeout(() => {
        updateBluetoothStatus(device, 'connected');
      }, 1000);
      if (timeoutsRef.current[device]) clearTimeout(timeoutsRef.current[device]);
      timeoutsRef.current[device] = timeoutId;
    }
  }, [bluetoothOn, bluetoothStatuses, updateBluetoothStatus]);

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

    // Wi‑Fi
    wifiStatuses, selectedWifi, setSelectedWifi, toggleWifiConnection,

    // Bluetooth
    bluetoothStatuses, toggleBluetoothConnection,
  };
};