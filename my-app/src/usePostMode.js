import { useState } from 'react';

export const usePostMode = () => {
    const [postMode, setPostMode] = useState(false);

    const enablePostMode = () => setPostMode(true);
    const disablePostMode = () => setPostMode(false);

    return { postMode, enablePostMode, disablePostMode };
};