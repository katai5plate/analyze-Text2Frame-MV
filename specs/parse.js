const parse = require("../parse");

const place = ["城", "宿屋", "洞窟の前"][Math.floor(Math.random() * 3)];
const date = new Date().toLocaleString();
const text = `長老に会って挨拶は済ませてきたかい？
<ShowChoices>
<When: はい>
そうか。それならよかった。
早速長老の依頼のとおり、${place}に向かってくれないかい。
<When: いいえ>
それはいけない。
長老は君のような若者を探しているんだ。
挨拶に行って話を聞いてくれないかい。
<End>
<comment>
出力日時: ${date}
</comment>`;

const list = parse(text);

const result = list.map(({ indent, ...rest }) => ({
  ...rest,
  indent: indent + 2,
}));

console.log(result);
