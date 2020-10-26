export function getList (value: any) {
  return fetch('/api/getList?value=' + value)
    .then(res => res.json())
    .catch(err => {
      console.log('err', err)
    })
}
