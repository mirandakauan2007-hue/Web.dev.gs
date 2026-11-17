'use client';
import { useMemo, useState } from 'react';

export const lines = {
  'Linha 1-Azul': ['Jabaquara', 'Conceição', 'São Judas', 'Saúde', 'Praça da Árvore', 'Santa Cruz', 'Vila Mariana', 'Ana Rosa', 'Paraíso', 'Vergueiro', 'São Joaquim', 'Liberdade', 'Sé', 'São Bento', 'Luz', 'Tiradentes', 'Armênia', 'Portuguesa-Tietê', 'Carandiru', 'Santana', 'Jd. São Paulo-Ayrton Senna', 'Parada Inglesa', 'Tucuruvi'],
  'Linha 2-Verde': ['Vila Madalena', 'Sumaré', 'Clínica', 'Consolação', 'Trianon-Masp', 'Brigadeiro', 'Paraíso', 'Ana Rosa', 'Chácara Klabin', 'Santos-Imigrantes', 'Alto do Ipiranga', 'Sacomã', 'Tamanduateí', 'Vila Prudente'],
  'Linha 3-Vermelha': ['Palmeiras-Barra Funda', 'Marechal Deodoro', 'Santa Cecília', 'República', 'Anhangabaú', 'Sé', 'Pedro II', 'Brás', 'Bresser-Mooca', 'Belém', 'Tatuapé', 'Carrão', 'Penha', 'Vila Matilde', 'Guilhermina-Esperança', 'Patriarca', 'Artur Alvim', 'Corinthians-Itaquera'],
  'Linha 4-Amarela': ['Luz', 'República', 'Higienópolis-Mackenzie', 'Paulista', 'Oscar Freire', 'Fradique Coutinho', 'Faria Lima', 'Pinheiros', 'Butantã', 'São Paulo-Morumbi', 'Vila Sônia'],
  'Linha 5-Lilás': ['Capão Redondo', 'Campo Limpo', 'Vila das Belezas', 'Giovanni Gronchi', 'Santo Amaro', 'Largo Treze', 'Adolfo Pinheiro', 'Alto da Boa Vista', 'Borba Gato', 'Brooklin', 'Campo Belo', 'Eucaliptos', 'Moema', 'AACD-Servidor', 'Hospital São Paulo', 'Santa Cruz', 'Chácara Klabin'],
  'Linha 15-Prata': ['Vila Prudente', 'Oratório', 'São Lucas', 'Camilo Haddad', 'Vila Tolstói', 'Vila União', 'Jardim Planalto', 'Sapopemba', 'Fazenda da Juta', 'São Mateus'],
};

export const periods = {
  Manhã: ['05:30', '06:30', '07:15', '07:40', '08:10', '09:00', '10:00', '11:00'],
  Tarde: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '17:30', '17:50'],
  Noite: ['18:00', '18:30', '19:00', '20:00', '21:00', '22:00', '23:00', '23:30'],
};

export function occupancyLabel(value) {
  if (value <= 40) return 'Vazio';
  if (value <= 75) return 'Moderado';
  return 'Lotado';
}

export default function useOccupancy() {
  const [line, setLine] = useState('');
  const [station, setStation] = useState('');
  const [period, setPeriod] = useState('Manhã');
  const [selectedTime, setSelectedTime] = useState('');
  const [wagon, setWagon] = useState(4);

  function chooseLine(value) {
    setLine(value);
    setStation('');
    setSelectedTime('');
  }

  function chooseStation(value) {
    setStation(value);
    setSelectedTime('');
  }

  function choosePeriod(value) {
    setPeriod(value);
    setSelectedTime('');
  }

  const slots = useMemo(() => {
    if (!line || !station) return [];
    const stationIndex = lines[line].indexOf(station);
    const lineIndex = Object.keys(lines).indexOf(line);
    return periods[period].map((time) => {
      const [hour, minute] = time.split(':').map(Number);
      const value = 25 + ((stationIndex * 13 + lineIndex * 17 + hour * 7 + minute) % 70);
      return { time, value };
    });
  }, [line, station, period]);

  const current = slots.find((slot) => slot.time === selectedTime);
  const best = useMemo(() => slots.length ? slots.reduce((a, b) => a.value < b.value ? a : b) : null, [slots]);

  return {
    line, chooseLine, station, chooseStation, stations: line ? lines[line] : [],
    period, choosePeriod, selectedTime, setSelectedTime, wagon, setWagon,
    slots, current, best, label: current ? occupancyLabel(current.value) : '',
  };
}
