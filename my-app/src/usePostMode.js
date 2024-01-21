import { useState } from 'react';

// usePostMode はカスタムフックで、アプリケーション内で「投稿モード」の状態を管理します。
export const usePostMode = () => {
    // postMode は boolean 型の状態で、投稿モードが有効かどうかを表します。
    // 初期状態は false です（投稿モードは無効）。
    const [postMode, setPostMode] = useState(false);

    // enablePostMode は関数で、呼び出されると postMode を true に設定します。
    // これにより、投稿モードが有効になります。
    const enablePostMode = () => setPostMode(true);

    // disablePostMode は関数で、呼び出されると postMode を false に設定します。
    // これにより、投稿モードが無効になります。
    const disablePostMode = () => setPostMode(false);

    // このフックは postMode 状態と、それを制御するための二つの関数を返します。
    return { postMode, enablePostMode, disablePostMode };
};