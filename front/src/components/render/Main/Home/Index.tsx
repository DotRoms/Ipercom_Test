import { CallToActionLogic } from "../../../logic/Main/Home/CallToAction-logic";
import { TodoContainerLogic } from "../../../logic/Main/Home/Toto/TodoContainer-logic";

import { TitleAndSubtitle } from "./TitleAndSubtitle";

interface IndexProps {
    userIsConnected: boolean;
}

// Index render component
// This component is the main component of the home page
export const Index = ({ userIsConnected }: IndexProps) => {
    return (
        <main className="flex flex-col items-center justify-center m--auto min-h-[calc(100vh-200px)] ">
            <section>
                <TitleAndSubtitle />
            </section>

            {userIsConnected ? (
                <section>
                    <TodoContainerLogic />
                </section>
            ) : (
                <section>
                    <CallToActionLogic />
                </section>
            )}
        </main>
    );
};
