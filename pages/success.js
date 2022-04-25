import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

export default function Success() {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push('/');
    }, [])

    return (
        <div>
            <h1>Sucesso!</h1>
            <p>Obrigado pela tua inscrição</p>
            <p>Dirige-te à sala do NEI para procederes ao pagamento.</p>
        </div>
    )
}
