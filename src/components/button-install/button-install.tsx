import { useEffect, useState } from "react";
import "./button-install.css";
import { Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

const ButtonInstall = () => {
     // declaramos un boolean para saber si se puede instalar la PWA
  const [isRealyforInstall, setIsRealyforInstall] = useState<boolean>(false);
  // declaramos un prompt para instalar la PWA
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    // funtion for install app
    const installApp = async () => {
        if(deferredPrompt){
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        console.log("user choice", result);
        setDeferredPrompt(null);
        setIsRealyforInstall(false);
        }
    };

    // creamos un Effect para detectar el evento beforeinstallprompt y mostrar el prompt de instalación
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsRealyforInstall(true);
        });
    }, []);

    return (
        <div className="container-btn-install-app">
        {/* si es posible instalar la app mostramos el boton */}
        {isRealyforInstall && (
          <Button
            variant="outlined" 
            startIcon={<GetAppIcon />}
            className="btn"
            onClick={() => installApp()}
          >
            Instalar App
          </Button>
        )}
      </div>
    );
}

export default ButtonInstall
