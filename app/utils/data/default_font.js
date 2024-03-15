export const defaultFontSettings = {
    "font-family": {
        "serif": "'游明朝',YuMincho,'ヒラギノ明朝 Pr6N','Hiragino Mincho Pr6N','ヒラギノ明朝 ProN','Hiragino Mincho ProN','ヒラギノ明朝 StdN','Hiragino Mincho StdN',HiraMinProN-W3,'HGS明朝B','HG明朝B',sans-serif",
        "gothic": `"メイリオ", "Meiryo", 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif`
    },
    "font-size": 100,
    "line-height": 180,
    "text-rendering": "optimizeLegibility"
}

export const defaultFont = {
    "custom-font-family": defaultFontSettings["font-family"].gothic,
    "font-family": "gothic",
    "font-size": 0,
    "line-height": 0,
    "text-rendering": defaultFontSettings["text-rendering"]
}