/*
プロトタイプのフォルダで以下を実行して公開可能なhtmlファイル名一覧を取得する。
dir /s /b *.html

実行環境の設定
package.jsonのscriptsに、以下を追加する。
"copyPrototype": "node scripts/copyPrototype.js"

実行コマンド
npm run copyPrototype
*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const prototypeFilenames = [
    "月3\\24IM0034_桑原佳希.html",
    "月3\\24IM0044_齊藤優瞬.html",
    "月3\\24IM0075_恒成柾樹.html",
    "月3\\24IM0080_中尾絆.html",
    "月3\\24IM0108_武蔵原悠人.html",
    "月3\\24IM0116_山田采佳.html",
    "水2\\22IM0129_原田莉紗子.html",
    "水2\\24IM0013_入澤大輝.html",
    "水2\\24IM0017_大熊幹乃.html",
    "水2\\24IM0022_柏倉直明.html",
    "水2\\24IM0037_後藤麗奈.html",
    "水2\\24IM0041_近藤夏貴.html",
    "水2\\24IM0051_篠崎咲人.html",
    "水2\\24IM0058_鈴木孝介.html",
    "水2\\24IM0060_鈴木凌鹿.html",
    "水2\\24IM0076_東條カンナ.html",
    "水2\\24IM0109_森晴希.html",
    "水2\\24IM0123_リンダビド.html",
    "水2\\24IM0128_秋田海渡.html",
    "水2\\24IM0133_實松海翔.html",
    "水2\\24IM0148_栗原大河.html",
    "水3\\24IM0002_青木諒馬.html",
    "水3\\24IM0035_小池菜々美.html",
    "水3\\24IM0043_齋藤匠.html",
    "水3\\24IM0045_齊藤夕真.html",
    "水3\\24IM0065_関友希.html",
    "水3\\24IM0089_納富崇弘.html",
    "水3\\24IM0097_星美咲.html",
    "水3\\24IM0101_益富琉斗.html",
    "水3\\24IM0118_山春拓人.html",
    "金2\\23IM0160_青山和広.html",
    "金2\\24IM0012_井上颯太.html",
    "金2\\24IM0029_栗岩凛歌.html",
    "金2\\24IM0042_齋田陸杜.html",
    "金2\\24IM0050_澤田馴平.html",
    "金2\\24IM0077_徳永一樹.html",
    "金2\\24IM0083_中瀬巧基.html",
    "金2\\24IM0107_三和たまき.html",
    "金2\\24IM0137_永井来実.html",
    "金2\\24IM0146_松浦賢之.html",
    "金3\\24IM0007_石田祐雅.html",
    "金3\\24IM0049_佐藤優心.html",
    "金3\\24IM0062_鈴木琉偉.html",
    "金3\\24IM0088_沼田彪雅.html",
    "金3\\24IM0090_野田康生.html",
    "金3\\24IM0091_野村輝.html",
    "金3\\24IM0096_福留伶菜.html",
    "金3\\24IM0099_牧野智華.html",
    "金3\\24IM0104_水野匠.html",
    "金3\\24IM0110_森裕貴.html",
    "金3\\24IM0119_家守暖太.html",
    "金3\\24IM0126_渡邉壮太.html",
    "金3\\24IM0130_轡田将.html"
];

const inputDir = 'C:\\Users\\toyoh\\Desktop\\iU\\講義関連\\システム設計演習\\まとめレポート\\プロトタイプ\\'
const outputDir = 'public/htmls';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const mapping = [];

prototypeFilenames.forEach(file => {
    const fullPath = path.join(inputDir, file);

    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        return;
    }

    // 例: "金3\\24IM0130_轡田将"
    const originalPath = file.replace('.html', '');
    const hash = crypto.createHash('sha256').update(originalPath).digest('hex');
    const dest = path.join(outputDir, `${hash}.html`);

    // ファイルコピー
    fs.copyFileSync(fullPath, dest);

    // 対応表にデータを追加
    mapping.push({
        hash,
        original: originalPath.replace(/\\/g, '/')
    });
});

// プログラムに貼り付け可能な形式で出力
console.log("\n--- Copy and paste this into your Next.js component ---\n");
console.log("const fileMapping = " + JSON.stringify(mapping, null, 2) + ";");
console.log("\n------------------------------------------------------");


/*
2026.02.28に実行したときのマッピングの出力、総数 53ファイル
const fileMapping = [
  {
    "hash": "7223acaee257383dba5074cd36c40f1ed7de8b307c5fa27d70c5aca4afcda3ba",
    "original": "月3/24IM0034_桑原佳希"
  },
  {
    "hash": "216efe2b5bb2aa072884339241bbac628ef5365112e7035a5d04318d1d519c1d",
    "original": "月3/24IM0044_齊藤優瞬"
  },
  {
    "hash": "af6a6cb03fffc58503f2c20fd22a084ef26de8a25d28032298241d99405b9533",
    "original": "月3/24IM0075_恒成柾樹"
  },
  {
    "hash": "04a973254168c9f5d3fca1d8f665e8c88003eba1790ace70dd6f19073296f525",
    "original": "月3/24IM0080_中尾絆"
  },
  {
    "hash": "66c75f7b9f386ede0275c52a965ba554f23af330638fc441117c4afb066e05c8",
    "original": "月3/24IM0108_武蔵原悠人"
  },
  {
    "hash": "5c42a541dee20d9ef55813052c43ecc139d37c9d4dd8845523e01098ffe5b8e2",
    "original": "月3/24IM0116_山田采佳"
  },
  {
    "hash": "c3f7f270eeae5069d6e2f4f0b336488fa87ed1636b68f95fd092476d5248fd2f",
    "original": "水2/22IM0129_原田莉紗子"
  },
  {
    "hash": "121b5f686e3127808a023e387bcc45c35e382e9d5abf37139ef526c39778cd8e",
    "original": "水2/24IM0013_入澤大輝"
  },
  {
    "hash": "083c63b6591cc120d29c48bf2cbeeb56bc74cb2cc1146e416bfd23e0b3a15078",
    "original": "水2/24IM0017_大熊幹乃"
  },
  {
    "hash": "207bf8a858198b660615a6628ece6b6318debe0060170b5807c645ee6b72d211",
    "original": "水2/24IM0022_柏倉直明"
  },
  {
    "hash": "68a0aae85025bdbc2bed7d791f7f3cc98537cc847550aaebea5afbf9c647676b",
    "original": "水2/24IM0037_後藤麗奈"
  },
  {
    "hash": "852263603179e7c02d2e0c469509f8ab36260c174c327e1171ca06194934e417",
    "original": "水2/24IM0041_近藤夏貴"
  },
  {
    "hash": "3c6e863c8595b43e8314cd315b54528da38091802568d9db06c0219c84f5e82e",
    "original": "水2/24IM0051_篠崎咲人"
  },
  {
    "hash": "dafea42c2cf96961e65a9d619ab70433fa7cb9ea543ccc4cb16d006a9a22df17",
    "original": "水2/24IM0058_鈴木孝介"
  },
  {
    "hash": "1a58cf6833b56f76cf1d79906da3c044ff46651ec4a8e8d0e95e2bcab75aef81",
    "original": "水2/24IM0060_鈴木凌鹿"
  },
  {
    "hash": "bdd46375d3f6c8e9ad39a25f46f7688ddb9843ff4921a7d107bafed54b8a32ed",
    "original": "水2/24IM0076_東條カンナ"
  },
  {
    "hash": "7979d20bc425ce26f5323de5a6027c7bbb6bc30bb6a94086f3dd01fc0b2e2933",
    "original": "水2/24IM0109_森晴希"
  },
  {
    "hash": "ae3b636b57fd81157bbfdfc415a287a8abefb86e052148340b62f0695c365e37",
    "original": "水2/24IM0123_リンダビド"
  },
  {
    "hash": "a8a79b4c8c8f5abed36c4c7142a305814e3b26d3552f99a2d685d14a37ab6f71",
    "original": "水2/24IM0128_秋田海渡"
  },
  {
    "hash": "d81c0cb571f648c7766019a6941216c6de1083c7436cfa7e3ddae6b425ff5c43",
    "original": "水2/24IM0133_實松海翔"
  },
  {
    "hash": "2d085754841fb73972a8960d46e01b716d54b2846c2f08325dbbfd1be062161a",
    "original": "水2/24IM0148_栗原大河"
  },
  {
    "hash": "33ea5754a9395010adb3c993e05f4cde9bae40ec350c660d11a897404b894e0f",
    "original": "水3/24IM0002_青木諒馬"
  },
  {
    "hash": "6a17d39c5905766156e1241e21429330319475c51f7c96beae8b411181e3a94c",
    "original": "水3/24IM0035_小池菜々美"
  },
  {
    "hash": "6eaeea4614e3abbf0d59896add9d9c2cf6f342abf36414275d0142db2ac90a24",
    "original": "水3/24IM0043_齋藤匠"
  },
  {
    "hash": "ac07cc37d3fdbd78c8061a34fc16adc662f6047acd869a8a5f4934bf40b45212",
    "original": "水3/24IM0045_齊藤夕真"
  },
  {
    "hash": "d455f78ac35c7f9d6f140fae1d9db25470dc5432185323e9cf87e6a23d5cfc89",
    "original": "水3/24IM0065_関友希"
  },
  {
    "hash": "672658d33603cd8563e0cb8f87bb14513de1ffb3183b4a5b7496c759d8388ec2",
    "original": "水3/24IM0089_納富崇弘"
  },
  {
    "hash": "6a28fb537c98117aa1309a779cf0461940401a3fe8ab2866fc5d84ec3b32b801",
    "original": "水3/24IM0097_星美咲"
  },
  {
    "hash": "4144a975fc155e849924d57a67a553bf4de3878a8b7437665a71afe416f54970",
    "original": "水3/24IM0101_益富琉斗"
  },
  {
    "hash": "c9298fdf080da9d1f2326b3a5765d0c10e9ce0ef3472cf82700266c48a5ed164",
    "original": "水3/24IM0118_山春拓人"
  },
  {
    "hash": "da5d0edb09c29c3edbb9f5b0ae6edd3ec1e48741166723215c34b5747e78447e",
    "original": "金2/23IM0160_青山和広"
  },
  {
    "hash": "03f887682c937b95b81c9f102543f3af1adb5dc92b1346a725cb2ce35303984a",
    "original": "金2/24IM0012_井上颯太"
  },
  {
    "hash": "03fd0fa0df468af4e7315f9e6e9c2e28012d96ecf0e545e9aa17d29b0fabab65",
    "original": "金2/24IM0029_栗岩凛歌"
  },
  {
    "hash": "b122915caf04891526a36f5f33fee3d1d61f89a790ba241571818d5dc070686e",
    "original": "金2/24IM0042_齋田陸杜"
  },
  {
    "hash": "71f822c3e9221b9e81d8377a75dadac6f79256f8a1b2e287f899f5a78e78fd56",
    "original": "金2/24IM0050_澤田馴平"
  },
  {
    "hash": "c624468ff888e49bdca894f9b5f1e22693432e89dd8b612dfc2b9dc9bf111c27",
    "original": "金2/24IM0077_徳永一樹"
  },
  {
    "hash": "d7d281c9b1374d5b01adfbb7dbb87ba61770ec78ca999c080f222e34f13a9c1d",
    "original": "金2/24IM0083_中瀬巧基"
  },
  {
    "hash": "747f618a4eb5d985a4da85e8b14e33b0f75159128f06213076e24fee880782c9",
    "original": "金2/24IM0107_三和たまき"
  },
  {
    "hash": "c32d245d6c40bbbb99692b502bace8ba6709f76e72b2538791dcbf3fba438409",
    "original": "金2/24IM0137_永井来実"
  },
  {
    "hash": "f85e53d4921cd7a3d5a7716c8733f43bdea7417459d548fd54c35680fee8a50e",
    "original": "金2/24IM0146_松浦賢之"
  },
  {
    "hash": "96838730dd8ae7e84b64e31f7f80276cd72521bce04fb4b668b3f2df3535427e",
    "original": "金3/24IM0007_石田祐雅"
  },
  {
    "hash": "199aedc944f254bbb17476484f52ea0f8421343f6b67bf0def0d8b27d4f2040e",
    "original": "金3/24IM0049_佐藤優心"
  },
  {
    "hash": "6af608c3d66da452d37f3b43804e51c6b9a92c2cb552af8babf583f94662af89",
    "original": "金3/24IM0062_鈴木琉偉"
  },
  {
    "hash": "0eab7794f79a8ed3ace6e3c6e1571f1d7099cf4d58fa34a13fdba82c714857fa",
    "original": "金3/24IM0088_沼田彪雅"
  },
  {
    "hash": "61ae96697c2fc14b7409a6bc4f5e04b318baa472b289967ae53ba2642b3975ac",
    "original": "金3/24IM0090_野田康生"
  },
  {
    "hash": "f6e0bb09a4ea9ae2e7ba6dc012726ffe7096e8c51cc66fffdfe0bbcdfc6bf2d4",
    "original": "金3/24IM0091_野村輝"
  },
  {
    "hash": "1dfd4fc7a376e8b1c042ffadb389d64dfc5e8f4edae1c182d40b17b9ad347fe2",
    "original": "金3/24IM0096_福留伶菜"
  },
  {
    "hash": "56ededf69e2228dadb1cf0dd526e178d06d16841000cb0fc9754330eac937935",
    "original": "金3/24IM0099_牧野智華"
  },
  {
    "hash": "d28bdfaf3aed463d6f79eb147c01edc323da7c9a866561e649e7c097d144dda9",
    "original": "金3/24IM0104_水野匠"
  },
  {
    "hash": "d4e14b46d6758c9fdd23b4cb5486f40ce081b0d72e143895494978ed282fd76f",
    "original": "金3/24IM0110_森裕貴"
  },
  {
    "hash": "f4a82bee87b724fe32ef645fc224ddb21bea9568468488d8eccfe287a217d0aa",
    "original": "金3/24IM0119_家守暖太"
  },
  {
    "hash": "fe4a7c6eb85e3a7ea0155dd33c4240213e58f2607cb514b04646dc5079bed54c",
    "original": "金3/24IM0126_渡邉壮太"
  },
  {
    "hash": "31bc281dd8f040e11f28ebc2fad781fe0614b63a451f1103d5c9a3da2923c773",
    "original": "金3/24IM0130_轡田将"
  }
];
*/
