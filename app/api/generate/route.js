import OpenAI from 'openai';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'OPENAI_API_KEY が設定されていません' }, { status: 500 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
風俗嬢の写メ日記を作ってください。

条件:
- 少し甘えた感じ
- 男性に会いたくなるようにする
- リアルな人間っぽい文章
- ちょっとエロいニュアンスを入れる
- テンションは高すぎず自然
- 少しだけだらけた感じもOK
- 絵文字を少し使う（使いすぎない）
- 言葉遣いは出身地の選択に必ず従う
- 標準語を選んだ場合は、方言を一切混ぜず自然な標準語だけで書く
- 松山を選んだ場合のみ、ごく軽い伊予弁を自然な範囲で少しだけ混ぜる
- 関西を選んだ場合は、自然な関西寄りの言い回しを少しだけ混ぜる
- 博多を選んだ場合は、自然な博多寄りの言い回しを少しだけ混ぜる
- 広島を選んだ場合は、自然な広島寄りの言い回しを少しだけ混ぜる
- 出身地で選ばれていない他地方の方言は絶対に混ぜない
- 標準語を選んだときは、語尾・言い回し・単語を含めて方言を一切混ぜない
- 方言はキャラ付けの主役にせず、全体の雰囲気を壊さない程度に控えめに使う
- 女性らしく自然で柔らかい言葉遣いにする
- メモの内容は写真の内容として自然に文章に反映させる
- 写真を見ているような描写を少し入れる
- 写真の内容を自然に文章へ反映する
- シチュ（状況や気持ち）を違和感なく文章に反映する
- 出力は必ずJSON形式
NG:
- 機械っぽい文章
- 丁寧すぎる文章
- 男っぽい表現は禁止
- 説明っぽい文章
- 実際の女性が使わない不自然な言い回しは禁止
- 選択された出身地以外の方言を混ぜるのは禁止
- コテコテすぎる不自然な方言は禁止
- 実際の女性が使わない不自然な語尾は禁止
入力情報:
- 日記タイプ: ${body.diaryType}
- 気分: ${body.mood}
- 客層: ${body.audience}
- テンション: ${body.tension}
- キャラ: ${body.character}
- 文量: ${body.length}

- 予約導線: ${body.includeReservationCTA ? '入れる' : '入れない'}
- メモ: ${body.memo || 'なし'}
- 写真: ${body.photo || 'なし'}
- シチュ: ${body.situation || 'なし'}

JSON形式:
{
  "title": "20文字前後の短いタイトル",
  "body": "写メ日記本文",
  "hashtags": "ハッシュタグを3〜6個"
}
`;

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [{ type: 'input_text', text: prompt }],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'shame_diary_output',
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              title: { type: 'string' },
              body: { type: 'string' },
              hashtags: { type: 'string' },
            },
            required: ['title', 'body', 'hashtags'],
          },
        },
      },
    });

    const text = response.output_text;
    const json = JSON.parse(text);

    return Response.json(json);
  } catch (error) {
    return Response.json(
      { error: error?.message || '生成中にエラーが発生しました' },
      { status: 500 }
    );
  }
}
