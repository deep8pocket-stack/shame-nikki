'use client';

import { useState } from 'react';

const initialForm = {
  diaryType: 'today',
  mood: '甘えたい',
  audience: '初めての人',
  tension: 'やや高め',
  character: '癒し系',
  length: '短め',
  includeReservationCTA: true,
  memo: '',
area: '松山',
};

export default function HomePage() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState({ title: '', body: '', hashtags: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  async function generate() {
    setLoading(true);
    setMessage('生成中...');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '生成に失敗しました');
      setResult(data);
      setMessage('生成できました');
    } catch (error) {
      setMessage(error.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  }

  async function copyText(text, label) {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setMessage(`${label}をコピーしました`);
  }

  function resetForm() {
    setForm(initialForm);
    setResult({ title: '', body: '', hashtags: '' });
    setMessage('初期化しました');
  }

  return (
    <main className="page">
      <div className="shell">
        <header className="hero">
          <div className="badge">スマホでも使いやすいMVP</div>
          <h1>写メ日記メーカー</h1>
          <p>選ぶだけで、風俗向けの写メ日記をすぐ作れるWeb版</p>
        </header>

        <div className="grid">
          <section className="card">
            <h2 className="sectionTitle">1. 内容を選ぶ</h2>

            <div className="field">
              <label>日記タイプ</label>
              <select className="select" value={form.diaryType} onChange={(e) => update('diaryType', e.target.value)}>
                <option value="today">今日の出勤</option>
                <option value="thanks">お礼日記</option>
                <option value="empty">空き枠アピール</option>
                <option value="ero-light">エロ系（軽め）</option>
                <option value="repeat">リピート誘導</option>
              </select>
            </div>

            <div className="row">
              <div className="field">
                <label>気分</label>
                <select className="select" value={form.mood} onChange={(e) => update('mood', e.target.value)}>
                  <option>甘えたい</option>
                  <option>いちゃいちゃしたい</option>
                  <option>大人っぽく</option>
                  <option>元気に会いたい</option>
                  <option>しっとり落ち着いて</option>
                </select>
              </div>
    <div className="field">
  <label>出身地</label>
  <select className="select" value={form.area} onChange={(e) => update('area', e.target.value)}>
    <option>標準語</option>
    <option>松山</option>
    <option>関西</option>
    <option>博多</option>
    <option>広島</option>
  </select>
</div>
              <div className="field">
                <label>客層</label>
                <select className="select" value={form.audience} onChange={(e) => update('audience', e.target.value)}>
                  <option>初めての人</option>
                  <option>優しい人</option>
                  <option>常連さん</option>
                  <option>いちゃいちゃ好き</option>
                  <option>癒されたい人</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>テンション</label>
                <select className="select" value={form.tension} onChange={(e) => update('tension', e.target.value)}>
                  <option>高め</option>
                  <option>やや高め</option>
                  <option>普通</option>
                  <option>落ち着きめ</option>
                </select>
              </div>
              <div className="field">
                <label>キャラ</label>
                <select className="select" value={form.character} onChange={(e) => update('character', e.target.value)}>
                  <option>癒し系</option>
                  <option>清楚系</option>
                  <option>小悪魔系</option>
                  <option>ギャル系</option>
                  <option>お姉さん系</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>文量</label>
                <select className="select" value={form.length} onChange={(e) => update('length', e.target.value)}>
                  <option>短め</option>
                  <option>普通</option>
                  <option>少し長め</option>
                </select>
              </div>
              <div className="field">
                <label>予約導線</label>
                <div className="toggle">
                  <input
                    type="checkbox"
                    checked={form.includeReservationCTA}
                    onChange={(e) => update('includeReservationCTA', e.target.checked)}
                  />
                  <span>最後に予約したくなる一文を入れる</span>
                </div>
              </div>
            </div>

            <div className="field">
  <label>メモ（任意）</label>
  <textarea
    className="textarea"
    value={form.memo}
    onChange={(e) => update('memo', e.target.value)}
    placeholder="例：19時以降空いてます、やさしい人に会いたい、今日はピンクの下着です など"
  />
</div>
<div className="field">
  <label>写真</label>
  <textarea
    className="textarea"
    value={form.photo}
    onChange={(e) => update('photo', e.target.value)}
    placeholder={`【写真】
例：黒の下着で鏡越し`}
  />
</div>

<div className="field">
  <label>シチュ</label>
  <textarea
    className="textarea"
    value={form.situation}
    onChange={(e) => update('situation', e.target.value)}
    placeholder={`【シチュ】
例：20時から出勤しててちょっと寂しい気分`}
  />
</div>


            <div className="actions">
              <button className="btn btnPrimary" onClick={generate} disabled={loading}>
                {loading ? '生成中...' : '写メ日記を作る'}
              </button>
              <button className="btn btnGhost" onClick={resetForm}>リセット</button>
            </div>

            <div className="status">{message}</div>
          </section>

          <section className="card">
            <h2 className="sectionTitle">2. できあがり</h2>

            <div className="outputBlock">
              <h3>タイトル</h3>
              <div className="outputText">{result.title || 'ここにタイトルが表示されます'}</div>
              <div className="actions">
                <button className="btn btnGhost" onClick={() => copyText(result.title, 'タイトル')}>コピー</button>
              </div>
            </div>

            <div className="outputBlock">
              <h3>本文</h3>
              <div className="outputText">{result.body || 'ここに本文が表示されます'}</div>
              <div className="actions">
                <button className="btn btnGhost" onClick={() => copyText(result.body, '本文')}>コピー</button>
              </div>
            </div>

            <div className="outputBlock">
              <h3>ハッシュタグ</h3>
              <div className="outputText">{result.hashtags || 'ここにハッシュタグが表示されます'}</div>
              <div className="actions">
                <button className="btn btnGhost" onClick={() => copyText(result.hashtags, 'ハッシュタグ')}>コピー</button>
              </div>
            </div>

            <div className="tips">
              <strong>初心者向けメモ</strong>
              <ul>
                <li>Vercelにアップすると、URLを開くだけで使える</li>
                <li>OpenAIのAPIキーだけ設定すれば動く</li>
                <li>あとから「女の子ごとのキャラ保存」も追加しやすい</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="footerNote">まずはこれを公開して、実際に使ってもらって反応を見るのがおすすめ</div>
      </div>
    </main>
  );
}
