/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { useEffect } from 'react';
import { FitAddon } from 'xterm-addon-fit';

const fitAddon = new FitAddon();

const useFitAddon = (height = 0, width = 0, lineMode = false) => {
    useEffect(() => {
        if (width * height > 0) fitAddon.fit();
    }, [width, height, lineMode]);

    return fitAddon;
};

export default useFitAddon;
