export async function GET(_: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 500);
  });

  if (productId === '2') {
    return Response.json(
      { message: 'SQL exception while retrieving the availability of the product' },
      { status: 500 },
    );
  }

  return Response.json({ available: productId !== '1' });
}
