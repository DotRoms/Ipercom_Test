import { CallToActionLogic } from "../../../logic/Main/Home/CallToAction-logic";
import { TitleAndSubtitle } from "./TitleAndSubtitle";

export const Index = () => {
  
    return (
        <main className="flex items-center justify-center m--auto min-h-[calc(100vh-200px)] ">
            <section className="">
            <TitleAndSubtitle />
            <CallToActionLogic />
            </section>
        </main>
    );
};
