import { LayoutBase } from '@components'
// WIP
export default function ApiDoc() {
  return (
    <LayoutBase>
      <iframe
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 0,
          margin: 0,
          padding: 0
        }}
        src="/api-spec/dos.html"
      />
    </LayoutBase>
  )
}
