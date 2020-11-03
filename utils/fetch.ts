type Args = { variables: { [key: string]: any } }

const API_URL = 'http://www.fl1digital.wpdev2.com/graphql/'

export async function fetchAPI<Data>(
  query: string,
  args?: Args
): Promise<Data> {
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables: args?.variables }),
  })

  const { data, errors } = await res.json()

  if (errors) {
    throw new Error(errors)
  }
  return data
}
