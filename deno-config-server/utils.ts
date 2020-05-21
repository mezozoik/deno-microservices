
/**
 * returns value of param "-port" 
 * or "8080" if not found
 * 
 * @param args usually Deno.args
 */
export function getPort(args: string[]) : number {
  return Number.parseInt((args.map((e) => e.split("=", 2))  .find((e) => e[0]?.trim() == "-port")??[])[1]?.trim() ?? "8080");
}