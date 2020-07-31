export default async function asyncTimeout(timeout = 0): Promise<any> {
  return await new Promise((resolve: any) => setTimeout(resolve, timeout));
}
