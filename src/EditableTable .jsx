import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box } from '@mui/material';

// Dados iniciais
const initialData = [
  { staff: 'Debora', status: 'OK', agency: 'Orelis Voyages', name: 'Gnamibi x 02', dataIn: '2024-08-12', dataOut: '2024-08-26', pax: 2, file: 5072024, itinerary: 'RIO/ILHA/PT/PTY/RIO', daysRemaining: 0 },
  { staff: 'Graciele', status: 'OK', agency: 'Richard Flechon', name: 'Famille Bravo x03', dataIn: '2024-08-16', dataOut: '2024-08-26', pax: 3, file: 176, itinerary: 'BEL/GUAR/UBEL/BEL', daysRemaining: 0 },
  // Adicione mais linhas conforme necessário
];

const EditableTable = () => {
  const [data, setData] = useState(initialData);

  // Função para calcular a diferença de dias entre a data atual e a data de chegada
  const calculateDaysRemaining = (dataIn) => {
    const today = new Date();
    const arrivalDate = new Date(dataIn);
    const timeDiff = arrivalDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Converter para dias
    return daysDiff > 0 ? daysDiff : 0; // Evitar dias negativos
  };

  // Atualizar os dias restantes dinamicamente ao carregar a tabela
  useEffect(() => {
    const updatedData = data.map((row) => ({
      ...row,
      daysRemaining: calculateDaysRemaining(row.dataIn),
    }));
    setData(updatedData);
  }, []);

  // Função para lidar com mudanças nos campos
  const handleInputChange = (e, rowIndex, field) => {
    const { value } = e.target;
    const updatedData = [...data];
    updatedData[rowIndex][field] = value;
    
    // Se o campo modificado for 'dataIn', recalcular os dias restantes
    if (field === 'dataIn') {
      updatedData[rowIndex].daysRemaining = calculateDaysRemaining(value);
    }
    
    setData(updatedData);
  };

  // Função para adicionar uma nova linha
  const addNewRow = () => {
    const newRow = {
      staff: '', 
      status: 'OK', 
      agency: '', 
      name: '', 
      dataIn: '', 
      dataOut: '', 
      pax: 1, 
      file: '', 
      itinerary: '', 
      daysRemaining: 0
    };
    setData([...data, newRow]);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Staff</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Agência</TableCell>
              <TableCell>Nome da Reserva</TableCell>
              <TableCell>Data In</TableCell>
              <TableCell>Data Out</TableCell>
              <TableCell>Pax</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Itinerário</TableCell>
              <TableCell>Dias Restantes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField value={row.staff} onChange={(e) => handleInputChange(e, index, 'staff')} />
                </TableCell>
                <TableCell>
                  <TextField value={row.status} onChange={(e) => handleInputChange(e, index, 'status')} />
                </TableCell>
                <TableCell>
                  <TextField value={row.agency} onChange={(e) => handleInputChange(e, index, 'agency')} />
                </TableCell>
                <TableCell>
                  <TextField value={row.name} onChange={(e) => handleInputChange(e, index, 'name')} />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={row.dataIn}
                    onChange={(e) => handleInputChange(e, index, 'dataIn')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={row.dataOut}
                    onChange={(e) => handleInputChange(e, index, 'dataOut')}
                  />
                </TableCell>
                <TableCell>
                  <TextField value={row.pax} onChange={(e) => handleInputChange(e, index, 'pax')} />
                </TableCell>
                <TableCell>
                  <TextField value={row.file} onChange={(e) => handleInputChange(e, index, 'file')} />
                </TableCell>
                <TableCell>
                  <TextField value={row.itinerary} onChange={(e) => handleInputChange(e, index, 'itinerary')} />
                </TableCell>
                <TableCell>
                  <TextField value={row.daysRemaining} disabled />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={addNewRow}>
          Adicionar Linha
        </Button>
      </Box>
    </Box>
  );
};

export default EditableTable;
