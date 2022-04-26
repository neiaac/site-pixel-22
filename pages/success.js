import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

export default function Success() {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        router.push('/');
        /* if (!user) router.push('/'); */
    }, [])

    return (
        <div>
            <h1>Sucesso!</h1>
            <p>Obrigado pela tua inscrição</p>
            <p>Confirma o teu modo de pagamento neste formulário 👉 https://forms.gle/DFAw53RN9F92oJWF7</p>
        </div>
    )
}
