
// useGlobalContext.js

import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './globalContext'; // Add the missing import

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}