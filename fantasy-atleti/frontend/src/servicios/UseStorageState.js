import { useEffect, useState } from "react";
import LocalStorageServicio from "./storage";

function UseStorageState(clave, valorInicial) {
    const [state, setState] = useState(() => {

        // Recupera el valor inicial si lo hay o si no usa el valor por defecto
        const valorGuardado = LocalStorageServicio.get(clave)
        return valorGuardado !== null ? valorGuardado : valorInicial

    })

    useEffect(() => {

        // Guarda el estado en localStorage cada vez que cambia
        LocalStorageServicio.set(clave, state)

    }, [state])
    return [state, setState]
}

export default UseStorageState;