'use client';
import { useState } from 'react';
export default function DelayForm({ station, line, onSubmit, saving }) {
  const [message, setMessage] = useState(''); const [time, setTime] = useState(''); const [feedback, setFeedback] = useState('');
  async function submit(event) {
    event.preventDefault();
    const description = message.trim();
    if (!description || !time) { setFeedback('Informe o horário e escreva o que aconteceu.'); return; }
    const ok = await onSubmit({ station, line, time, message: description });
    if (ok) { setMessage(''); setTime(''); setFeedback('Valeu! Seu aviso ajuda quem vem depois de você.'); }
  }
  return <form className="delay-form" onSubmit={submit}>
    <div className="form-heading"><div><span className="eyebrow">COMPARTILHE COM A GENTE</span><h3>Como está a viagem?</h3></div><span className="form-icon" aria-hidden="true">↗</span></div>
    <div className="form-fields">
      <label className="field-label">HORÁRIO<input type="time" value={time} onChange={(event) => setTime(event.target.value)} required /></label>
      <label className="field-label grow">CONTE O QUE ACONTECEU<textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ex.: o trem atrasou cerca de 10 minutos…" maxLength={280} rows={3} required /></label>
      <button className="primary-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" disabled={saving}>{saving ? 'Enviando…' : 'Enviar aviso'} <span>↗</span></button>
    </div>
    <div className="form-feedback-row"><span>{message.length}/280</span>{feedback && <p className="feedback" role="status">{feedback}</p>}</div>
  </form>;
}
