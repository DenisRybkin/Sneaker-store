export const chooseEmojis = (min,max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    const imgUrl = `/img/emojis/emojis-${Math.round(rand)}.png`;
    return imgUrl;
}