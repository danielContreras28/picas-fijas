import { Box, Button, ButtonGroup, Card, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import SchemaIcon from '@mui/icons-material/Schema';
import CodeIcon from '@mui/icons-material/Code';
import CloseIcon from '@mui/icons-material/Close';
import CodePseInt from './code-pseint';
import image from '../../assets/diagrama2.png';
import './rock-paper-scissors.css';
import FloatingButtonMenu, { Action } from '../floating-button/floating-button';

enum IEleccion {
    piedra = 'piedra',
    papel = 'papel',
    tijeras = 'tijeras'
}

const RockPaperScissors = () => {
    const [resultado, setResultado] = useState('');
    const [victorias, setVictorias] = useState(0);
    const [derrotas, setDerrotas] = useState(0);
    const [empates, setEmpates] = useState(0);
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
    const jugar = (eleccionUsuario: IEleccion) => {
        const opciones = ['piedra', 'papel', 'tijeras'];
        const eleccionComputadora = opciones[Math.floor(Math.random() * 3)];

        let mensaje;
        if (eleccionUsuario === eleccionComputadora) {
            mensaje = `Es un empate. Ambos eligieron ${eleccionUsuario}.`;
            setEmpates(empates + 1);
        } else if (
            (eleccionUsuario === IEleccion.piedra && eleccionComputadora === IEleccion.tijeras) ||
            (eleccionUsuario === IEleccion.papel && eleccionComputadora === IEleccion.piedra) ||
            (eleccionUsuario === IEleccion.tijeras && eleccionComputadora === IEleccion.papel)
        ) {
            mensaje = `¡Ganaste! ${eleccionUsuario} vence a ${eleccionComputadora}.`;
            setVictorias(victorias + 1);
        } else {
            mensaje = `Perdiste. ${eleccionComputadora} vence a ${eleccionUsuario}.`;
            setDerrotas(derrotas + 1);
        }

        setResultado(mensaje);
    };

    useEffect(() => {
        setActions([
          { icon: <SchemaIcon />, name: 'Diagrama de flujo', onClick: () => { setShowModal(true); setTypeModal('image') } },
          { icon: <CodeIcon />, name: 'Código PseInt', onClick: () => { setShowModal(true); setTypeModal('code') } },
        ])
    }, []);

    return (
        <>
        <Card style={{ width: '80vwx', textAlign: 'center' }}>
            <h1 >Piedra, Papel o Tijeras</h1>
            <p>Elige una opción:</p>
            <ButtonGroup variant="text" aria-label="Basic button group">
                <Button onClick={() => jugar(IEleccion.piedra)}>Piedra</Button>
                <Button onClick={() => jugar(IEleccion.papel)}>Papel</Button>
                <Button onClick={() => jugar(IEleccion.tijeras)}>Tijeras</Button>
            </ButtonGroup>
            <h2 >{resultado}</h2>
            <p>Victorias: {victorias} - Empates: {empates} - Derrotas: {derrotas}</p>
        </Card>
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
        </>
    );
}

export default RockPaperScissors;
