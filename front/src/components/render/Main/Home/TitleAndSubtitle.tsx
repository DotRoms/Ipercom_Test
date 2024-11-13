import { Container } from "../../../UI/design-system/container/Container";

// TitleAndSubtitle render component
// This component is used to display the title and subtitle of the application
export const TitleAndSubtitle = () => {
    
    return (
        <Container className="flex flex-col m-auto text-center mb-10">
            <h1 className="text-7xl font-bold">To-Do Go</h1>
            <h2>Gérez votre emploie du temps comme il se doit !</h2>
        </Container>
    );
};
