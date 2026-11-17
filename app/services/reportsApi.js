import axios from 'axios';

// JSONPlaceholder demonstra GET/POST/PUT/DELETE; gravações são simuladas pela API.
const reportsApi = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 10000 });

export async function getReports() {
  const { data } = await reportsApi.get('/posts?_limit=5');
  return data.map((item, index) => ({
    id: item.id,
    station: ['Trianon-Masp', 'Paraíso', 'Consolação', 'Brás', 'Paulista'][index],
    line: ['Linha 2-Verde', 'Linha 1-Azul', 'Linha 2-Verde', 'Linha 3-Vermelha', 'Linha 4-Amarela'][index],
    time: ['07:40', '08:10', '09:20', '17:50', '18:15'][index],
    message: ['Trem passou muito cheio', 'Atraso de 8 minutos', 'Plataforma movimentada', 'Intervalo maior que o normal', 'Trem lotado'][index],
    createdAt: new Date(Date.now() - index * 3600000).toISOString(),
  }));
}

export async function createReport(report) {
  const { data } = await reportsApi.post('/posts', { title: report.message, body: JSON.stringify(report), userId: 1 });
  return { ...report, id: data.id || Date.now(), createdAt: new Date().toISOString() };
}

export async function updateReport(report) {
  await reportsApi.put(`/posts/${report.id}`, { title: report.message, body: JSON.stringify(report), userId: 1 });
  return report;
}

export async function deleteReport(id) {
  await reportsApi.delete(`/posts/${id}`);
  return id;
}
