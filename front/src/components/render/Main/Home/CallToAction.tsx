import { Button } from "../../../UI/design-system/button/Button";
import { Container } from "../../../UI/design-system/container/Container";
import { AuthModalLogic } from "../../../logic/Main/Modal/AuthLoginModal-logic";

interface CallToActionProps {
    setUserNeedLogin: (value: boolean) => void;
    setUserNeedSignup: (value: boolean) => void;
    setOpenModal: (value: boolean) => void;
    openModal: boolean;
    userNeedLogin: boolean;
    userNeedSignup: boolean;
}

export const CallToAction = ({
    openModal,
    userNeedLogin,
    userNeedSignup,
    setUserNeedLogin,
    setUserNeedSignup,
    setOpenModal,
}: CallToActionProps) => {
    
    return (
        <>
            <Container className="flex">
                <div className="flex flex-col m-auto justify-center">
                    <p className="mb-10 text-center">
                        Pour utiliser les fonctionnalités liée a notre
                        applicaiton veuillez vous connecter.
                    </p>

                    <div className="flex flex-col gap-6 m-auto">
                        <Button
                            ariaLabel="Ouvrir la modal de connexion"
                            variant="primary"
                            size="lg"
                            onClick={() => (
                                setOpenModal(true),
                                setUserNeedLogin(true),
                                setUserNeedSignup(false)
                            )}
                        >
                            Connexion
                        </Button>
                        <Button
                            ariaLabel="Ouvrir la modal d'inscription"
                            variant="secondary"
                            size="lg"
                            onClick={() => (
                                setOpenModal(true),
                                setUserNeedLogin(false),
                                setUserNeedSignup(true)
                            )}
                        >
                            Inscription
                        </Button>
                    </div>
                </div>
            </Container>

            {openModal && userNeedLogin && <AuthModalLogic />}
            {openModal && userNeedSignup && <AuthModalLogic />}
        </>
    );
};
