import { NavLinks } from "../../../../constants/NavLinks";

import { Button } from "../../../UI/design-system/button/Button";
import { Container } from "../../../UI/design-system/container/Container";

import { AuthModalLogic } from "../../../logic/Main/Modal/AuthLoginModal-logic";

interface NavLinkProps {
    name: string;
    url: string;
}

interface NavigationBarProps {
    setOpenModal: (value: boolean) => void;
    setUserNeedLogin: (value: boolean) => void;
    setUserNeedSignup: (value: boolean) => void;
    openModal: boolean;
    userNeedLogin: boolean;
    userNeedSignup: boolean;
    userIsConnected: boolean;
    handleDisconnectUser: () => void;
}

// NavigationBar render component
export const NavigationBar = ({
    setOpenModal,
    setUserNeedLogin,
    setUserNeedSignup,
    openModal,
    userNeedLogin,
    userNeedSignup,
    userIsConnected,
    handleDisconnectUser,
}: NavigationBarProps) => {

    return (
        <nav className="bg-secondary text-white mb-8">
            <Container className="flex flex-col sm:flex-row justify-between items-center m-auto gap-4">
                <div>
                    <a className="text-2xl font-bold" href="/">
                        To-Do Go
                    </a>
                </div>

                <ul className="flex items-center gap-4 text-sm">
                    <li>
                        <a
                            className="p-2 rounded-lg hover:text-primary"
                            href={"/"}
                        >
                            Accueil
                        </a>
                    </li>
                    {userIsConnected ? (
                        <Button
                            ariaLabel="Ouvrir la modal d'inscription"
                            size="sm"
                            variant="danger"
                            onClick={handleDisconnectUser}
                        >
                            Déconnexion
                        </Button>
                    ) : (
                        NavLinks.map((link: NavLinkProps, index: number) => (
                            <li key={index}>
                                {link.name === "Connexion" ? (
                                    <Button
                                        ariaLabel="Ouvrir la modal de connexion"
                                        size="sm"
                                        onClick={() => {
                                            setOpenModal(true);
                                            setUserNeedLogin(true);
                                            setUserNeedSignup(false);
                                        }}
                                    >
                                        {link.name}
                                    </Button>
                                ) : (
                                    link.name === "Inscription" && (
                                        <Button
                                            ariaLabel="Ouvrir la modal d'inscription"
                                            size="sm"
                                            variant="tertiary"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setUserNeedLogin(false);
                                                setUserNeedSignup(true);
                                            }}
                                        >
                                            {link.name}
                                        </Button>
                                    )
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </Container>

            {openModal && userNeedLogin && <AuthModalLogic />}
            {openModal && userNeedSignup && <AuthModalLogic />}

        </nav>
    );
};
