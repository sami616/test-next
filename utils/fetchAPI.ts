type Args<Variables> = { variables: Variables }

export async function fetchAPI<Data, Variables = {}>(
  query: string,
  args?: Args<Variables>
): Promise<Data> {
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(process.env.GRAPH_URI!, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables: args?.variables }),
  })

  const { data, errors } = await res.json()
  if (errors) throw new Error(errors)

  return data
}
