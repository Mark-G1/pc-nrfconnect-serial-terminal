/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { connect } from 'react-redux';
import { DeviceTraits } from '@nordicsemiconductor/nrf-device-lib-js';
import {
    Device,
    DeviceSelector,
    DeviceSelectorProps,
    logger,
} from 'pc-nrfconnect-shared';

import {
    closeDevice,
    deviceConnected,
    deviceDisconnected,
    openDevice,
} from '../actions/deviceActions';
import { TDispatch } from '../thunk';
/**
 * Configures which device types to show in the device selector.
 * The config format is described on
 * https://github.com/NordicSemiconductor/nrf-device-lister-js.
 */
const deviceListing: DeviceTraits = {
    nordicUsb: true,
    serialPorts: true,
    jlink: true,
};

const mapState = () => ({
    deviceListing,
});

/*
 * In these callbacks you may react on events when users (de)selected a device.
 * Leave out callbacks you do not need.
 *
 * Note that the callbacks releaseCurrentDevice and onDeviceIsReady
 * are only invoked, if a deviceSetup is defined.
 */
const mapDispatch = (dispatch: TDispatch): Partial<DeviceSelectorProps> => ({
    onDeviceSelected: (device: Device) => {
        logger.info(`Selected device with s/n ${device.serialNumber}`);
        dispatch(openDevice(device));
    },
    onDeviceDeselected: () => {
        logger.info('Deselected device');
        dispatch(closeDevice());
    },

    onDeviceConnected(device) {
        dispatch(deviceConnected(device));
    },

    onDeviceDisconnected(device) {
        dispatch(deviceDisconnected(device));
    },
});

export default connect(mapState, mapDispatch)(DeviceSelector);
