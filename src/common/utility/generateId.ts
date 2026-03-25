const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function encodeBase62(num: number): string {
    let str = "";
    const base = chars.length;
    while(num > 0){
        str = [num % base] + str;
        num = Math.floor(num / base)
    }

    return str || "a"
}