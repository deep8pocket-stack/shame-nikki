import OpenAI from 'openai';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'OPENAI_API_KEY が設定されていません' }, { status: 500 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
あなたは、風俗向けの写メ日記を作る優秀なアシスタントです。
過激すぎず、上品さを残しつつ、予約につながりやすい文章を作ってください。

条件:
- 日本語で出力
- キャラに一貫性を持たせる
- 絵文字は少しだけ使う
- 本文は読みやすく、短文ベース
- 露骨すぎる表現は避ける
- 「また会いたい」「会ってみたい」と思わせる空気感にする
- 出力は必ずJSON形式

入力情報:
- 日記タイプ: ${body.diaryType}
- 気分: ${body.mood}
- 客層: ${body.audience}
- テンション: ${body.tension}
- キャラ: ${body.character}
- 文量: ${body.length}
- 予約導線: ${body.includeReservationCTA ? '入れる' : '入れない'}
- メモ: ${body.memo || 'なし'}

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
