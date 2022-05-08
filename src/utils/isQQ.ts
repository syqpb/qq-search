export function isQQ(qq:string):boolean {
    return /^[1-9]\d{4,9}$/.test(qq);
}