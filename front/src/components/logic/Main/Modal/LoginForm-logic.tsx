import { LoginForm } from '../../../render/Main/Modal/LoginForm';

import { useLoginModal } from '../../../../hook/useLoginModal';

export const LoginFormLogic = () => {

    const { handleSubmit } = useLoginModal();

    return (
        <LoginForm handleSubmit={handleSubmit}/>
    )
}