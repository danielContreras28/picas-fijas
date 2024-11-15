import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SchemaIcon from '@mui/icons-material/Schema';
import CodeIcon from '@mui/icons-material/Code';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from "@mui/material";
import FloatingButtonMenu, { Action } from "../floating-button/floating-button";
import CodePseInt from "./code-pseint";
import image from "../../assets/diagrama.png";

import "react-toastify/dist/ReactToastify.css";
import "./picas-fijas.css";

interface IGuessNumber {
  picas: boolean;
  fijas: boolean;
  number: number;
}

const PicasFijas = () => {
  const [numberSeret, setNumberSeret] = useState<number>(0);
  const [attemptCounter, setAttemptCounter] = useState<number>(0);
  const [guess, setGuess] =
    useState<Array<Array<IGuessNumber | null> | null> | null>([]);
  const [NumberInput, setNumberInput] = useState<number | string>('');
  const [result, setResult] = useState<boolean>(false);
  const [initialGame, setInitialGame] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [typeModal, setTypeModal] = useState<string>('image');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  // Generar un número de 4 dígitos
  const numeroAleatorio4Digitos = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  // Generar un Array de tamaño 12 con datos en null
  const generarArray = (): Array<null> => {
    const array = [];
    for (let i = 0; i < 12; i++) {
      array.push(null);
    }
    return array;
  };

  // validar si el número es de 4 dígitos
  const validar = (number: Number): boolean => number.toString().length === 4;

  // Validar si el numero ingresado hay picas y fijas
  const validarPicasYFijas = (number: Number): Array<IGuessNumber> => {
    const searchNumber = number.toString().split("");
    const numberSeretString = numberSeret.toString().split("");

    const result: Array<IGuessNumber> = searchNumber.map((value, i) => {
      const character: IGuessNumber = {
        picas: false,
        fijas: false,
        number: Number(value),
      };
      if (numberSeretString.includes(value)) character.picas = true;
      if (searchNumber[i] === numberSeretString[i]) character.fijas = true;
      return character;
    });

    return result;
  };
  // Validar Input
  const ValidarInput = () => {
    setInitialGame(true);
    if (typeof NumberInput === "number" && validar(NumberInput)) {
      Search();
    } else {
      toast.warning("Ingresa un numero de 4 dígitos");
    }
  };

  //  Buscar numero secreto
  const Search = () => {
    const newGuess = guess;
    const result = typeof NumberInput === "number" ? validarPicasYFijas(NumberInput) : null;
    if (Array.isArray(newGuess)) {
      newGuess[attemptCounter] = result;
      setAttemptCounter(attemptCounter + 1);
      setGuess(newGuess);
    }
    setNumberInput('');

    if (numberSeret === NumberInput) setResult(true);
  };
  // resetear el juego
  const Reset = () => {
    setNumberSeret(numeroAleatorio4Digitos());
    setGuess(generarArray());
    setAttemptCounter(0);
    setResult(false);
    setNumberInput('');
    setInitialGame(false);
    setViewModal(false);
  }

  //  inicializar el juego
  useEffect(() => {
    setNumberSeret(numeroAleatorio4Digitos());
    setGuess(generarArray());
    setActions([
      { icon: <SchemaIcon />, name: 'Diagrama de flujo', onClick: () => { setShowModal(true); setTypeModal('image') } },
      { icon: <CodeIcon />, name: 'Código PseInt', onClick: () => { setShowModal(true); setTypeModal('code') } },
    ])
  }, []);

  useEffect(() => {
    if (result && initialGame && attemptCounter <= 2)
      toast.success(
        "Excelente, eres un maestro estas fuera del alcance de los demás", {
          onClose: () => setViewModal(true),
        }
      );
    if (result && initialGame && attemptCounter > 2 && attemptCounter <= 4)
      toast.success("Muy bueno, puedes ser un gran competidor", {
        onClose: () => setViewModal(true),
      });
    if (result && initialGame && attemptCounter > 4 && attemptCounter <= 8)
      toast.success("Bien, estas progresando debes buscar tus límites", {
        onClose: () => setViewModal(true),
      });
    if (result && initialGame && attemptCounter > 8 && attemptCounter <= 10)
      toast.success("Regular, Aún es largo el camino por recorrer", {
        onClose: () => setViewModal(true),
      });
    if (result && initialGame && attemptCounter === 12)
      toast.success("Mal, este juego no es para ti", {
        onClose: () => setViewModal(true),
      });
    if (!result && initialGame && attemptCounter === 12)
      toast.error("Mal, este juego no es para ti", {
        onClose: () => setViewModal(true),
      });
  }, [result, attemptCounter, initialGame]);

  return (
    <div className="components">
      <h1>Picas y Fijas</h1>
      <div className="group-input">
        <input
          type="text"
          value={NumberInput}
          onChange={(e) => setNumberInput(Number(e.target.value))}
        />
        <button className="button" onClick={ValidarInput}>Enviar</button>
      </div>
      <div className="box">
        {guess &&
          guess.map((value, i) => (
            <div className="container-boxes" key={i}>
              {value ? (
                value
                  .map((v, j) => (
                    <div key={j} className={`boxes ${v?.picas ? "picas" : ""} ${v?.fijas ? "fijas" : ""} `}>
                      {v?.number}
                    </div>
                  ))
              ) : (
                <>
                  <div className="boxes" />
                  <div className="boxes" />
                  <div className="boxes" />
                  <div className="boxes" />
                </>
              )}
            </div>
          ))}
      </div>
      <ToastContainer position="top-center" />
      { viewModal && <div className="container-modal">
        <div className={`modal ${result ? "success" : "error"}`}>
          <label>el numero secreto era {numberSeret}, quieres jugar de nuevo?</label>
          <button className="button" onClick={Reset}>Ok</button>
        </div>
      </div>}
      <FloatingButtonMenu actions={actions} />
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, width: typeModal === 'code' ? '80%' : 'auto'}}>
          <div className="close-icon"><CloseIcon onClick={() => setShowModal(false)} /></div>
          {typeModal === 'code' 
            ? <CodePseInt /> 
            : <div className="modal-image">
              <img src={image} alt="diagrama" style={{ height: "100%", width: "max-content" }} />
            </div>
          }
        </Box>
      </Modal>
    </div>
  );
};

export default PicasFijas;
