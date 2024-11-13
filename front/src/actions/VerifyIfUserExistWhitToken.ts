import { jwtDecode } from "jwt-decode";

// Fonction pour vérifier si l'utilisateur existe avec le token

type UserIdProps = string | null;

export const VerifyIfUserExistWithToken = async (): Promise<UserIdProps> => {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem("token");

    if (token) {
        try {
            // Décoder le token JWT
            const decodedToken = jwtDecode<{ User_id: string }>(token);
            if(decodedToken.User_id){
                return decodedToken.User_id;
                ;} else {
                return null;
            }
            // Vérifier si le decodedToken contient un userId
           
        } catch (error) {
            // Gestion des erreurs si le token est invalide ou expiré
            console.error("Erreur de décodage du token", error);
            return null;
        }
    } else {
        // Cas où le token n'existe pas dans le localStorage
        console.error("Aucun token trouvé dans le localStorage");
        return null;
    }
}
